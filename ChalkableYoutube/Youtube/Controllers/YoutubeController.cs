using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Chalkable.API;
using Newtonsoft.Json;
using Youtube.Logic;
using Youtube.Models;

namespace Youtube.Controllers
{
    public class YoutubeController : BaseController
    {
        public ActionResult Edit(string standardIds, int announcementApplicationId)
        {
            var standardVideos = GetRecommended(standardIds);
            standardVideos = standardVideos.Where(x => x.Videos != null && x.Videos.Count > 0).ToList();
            var res = new StartupViewData
            {
                AnnouncementApplicationId = announcementApplicationId,
                StandardVideosJson = JsonConvert.SerializeObject(standardVideos),
                Mode = Settings.EDIT_MODE,
                Role = CurrentUser.Role.LoweredName
            };
            return View("Index", res);
        }

        public ActionResult SearchVideos(string searchQuery)
        {
            var videos = YoutubeConnector.Search(searchQuery);
            return ChlkJson(videos);
        }

        public ActionResult Video(string id)
        {
            var video = YoutubeConnector.GetById(id);
            return ChlkJson(video);
        }

        public async Task<ActionResult> Attach(string id, int announcementApplicationId)
        {
            var video = YoutubeConnector.GetById(id);

            await ChalkableConnector.Announcement.UpdateAnnouncementApplicationMeta(announcementApplicationId,
                    video.ShortTitle, video.ThumbUrl, video.ShortDescription);

            var storage = new Storage(ChalkableAuthorization.Configuration.ConnectionString);
            storage.Set(CurrentUser.DistrictId, announcementApplicationId, video.Id);

            return ChlkJson(true);
        }

        public ActionResult View(string id, int announcementApplicationId)
        {
            if (string.IsNullOrEmpty(id))
                id = new Storage(ChalkableAuthorization.Configuration.ConnectionString).Get(CurrentUser.DistrictId, announcementApplicationId);

            if(string.IsNullOrEmpty(id))
                return View("Error");

            var res = new StartupViewData
            {
                AnnouncementApplicationId = announcementApplicationId,
                StandardVideosJson = "[]",
                Mode = Settings.VIEW_MODE,
                Role = CurrentUser.Role.LoweredName,
                VideoId = id
            };

            return View("Index", res);
        }

        private StandardVideos GetVideosForStandard(string code)
        {
            var res = new StandardVideos
            {
                StandardName = code,
                Videos = YoutubeConnector.Search(code, 20).ToList()
            };

            return res;
        }

        public static IList<string> GetStandardCodes(string standardIds, ChalkableConnector chlkConnector)
        {
            if(string.IsNullOrEmpty(standardIds))
                return new List<string>();

            Guid parsed;
            IList<Guid> standardsGuids = new List<Guid>();

            foreach (var standardId in standardIds.Split(new[] {','}, StringSplitOptions.RemoveEmptyEntries))
                if (Guid.TryParse(standardId, out parsed))
                    standardsGuids.Add(parsed);

            if (standardsGuids.Count == 0)
                return new List<string>();

            var codes = new List<string>();
            var standardsRelations = Task.Run(() => chlkConnector.Standards.GetListOfStandardRelations(standardsGuids)).Result;

            codes.AddRange(standardsRelations.Where(x => !string.IsNullOrEmpty(x.CurrentStandard.Code)).Select(x => x.CurrentStandard.Code));

            foreach (var standardsRelation in standardsRelations)
            {
                if (standardsRelation.Derivatives != null)
                    codes.AddRange(standardsRelation.Derivatives.Where(x => !string.IsNullOrEmpty(x.Code)).Select(x => x.Code));
                if (standardsRelation.Origins != null)
                    codes.AddRange(standardsRelation.Origins.Where(x => !string.IsNullOrEmpty(x.Code)).Select(x => x.Code));
                if (standardsRelation.RelatedDerivatives != null)
                    codes.AddRange(standardsRelation.RelatedDerivatives.Where(x => !string.IsNullOrEmpty(x.Code)).Select(x => x.Code));
            }

            return codes.Take(20).ToList();
        }

        private IList<StandardVideos> GetRecommended(string standardIds)
        {
            var codes = GetStandardCodes(standardIds, ChalkableConnector);
            var standardVideos = codes.Select(GetVideosForStandard);

            return standardVideos.ToList();
        }
    }
}