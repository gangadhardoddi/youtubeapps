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
        public async Task<ActionResult> Index(string standardIds, int announcementApplicationId)
        {
            var standardVideos = await GetRecommended(standardIds);
            standardVideos = standardVideos.Where(x => x.Videos != null && x.Videos.Count > 0).ToList();
            var res = new StartupViewData
            {
                AnnouncementApplicationId = announcementApplicationId,
                StandardIdsJson = JsonConvert.SerializeObject(standardVideos.Select(x => x.StandardName)),
                StandardVideosJson = JsonConvert.SerializeObject(standardVideos)
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
                    video.ShortTitle, video.Url, video.ShortDescription);

            var storage = new Storage(ChalkableAuthorization.Configuration.ConnectionString);
            storage.Set(CurrentUser.DistrictId, announcementApplicationId, video.Id);

            return ChlkJson(true);
        }

        private async Task<StandardVideos> GetVideosForStandardAsync(string code)
        {
            await Task.Delay(0);
            var res = new StandardVideos
            {
                StandardName = code
            };

            res.Videos = YoutubeConnector.Search(code, 20).ToList();
            return res;
        }

        private static IList<string> GetStandardCodes(string standardIds, ChalkableConnector chlkConnector)
        {
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

        private async Task<IList<StandardVideos>> GetRecommended(string standardIds)
        {
            var codes = GetStandardCodes(standardIds, ChalkableConnector);
            var tasks = codes.Select(async x => await GetVideosForStandardAsync(x));
            var standardVideos = await Task.WhenAll(tasks);

            return standardVideos;
        }
    }
}