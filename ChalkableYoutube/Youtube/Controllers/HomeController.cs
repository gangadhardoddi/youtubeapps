using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Routing;
using Chalkable.API;
using Chalkable.API.Helpers;
using DotNetOpenAuth.Messaging;
using Youtube.Logic;
using Youtube.Models;
using ChalkableConnector = Chalkable.API.ChalkableConnector;

namespace Youtube.Controllers
{
    public class HomeController : Chalkable.API.Controllers.HomeController
    {
        protected override async Task<ActionResult> ResolveAction(string mode, int? announcementApplicationId, int? studentId, int? announcementId,
            int? announcementType, int? attributeId, IEnumerable<StandardInfo> standards, string contentId)
        {
            await Task.Delay(0);

            if (string.IsNullOrEmpty(mode))
                return new EmptyResult();

            var actionParams = new RouteValueDictionary
                {
                    {"announcementApplicationId", announcementApplicationId},
                    {"districtId",CurrentUser.DistrictId},
                };

            switch (mode)
            {
                case Settings.EDIT_MODE:
                    var queries = (await BuildSearchQuery(standards, announcementApplicationId)).JoinString(",");
                    actionParams.Add("query", queries);
                    actionParams.Add("myAppsView", false);
                    return RedirectToAction("Edit", actionParams);
                case Settings.MY_VIEW_MODE:
                    actionParams.Add("myAppsView", true);
                    return RedirectToAction("Edit", actionParams);
                case Settings.VIEW_MODE:
                    return RedirectToAction("Video", actionParams);
                case Settings.GRADING_VIEW_MODE:
                    return RedirectToAction("Video", actionParams);
            }
            return View("NotSupported");
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var chalkableAuthorization = ChalkableAuthorization;
            if (chalkableAuthorization != null)
            {
                ViewBag.ApiRoot = chalkableAuthorization.ApiRoot;
            }
            ViewBag.IsProduction = true;
#if DEBUG
            ViewBag.IsProduction = false;
#endif
            base.OnActionExecuting(filterContext);
        }


        public async Task<ActionResult> Edit(string query, int? announcementApplicationId, Guid districtId, bool myAppsView = false, int? count = 9)
        {
            var q = string.IsNullOrWhiteSpace(query) 
                ? new List<string> { "" } 
                : query.Split(new[] {','}, StringSplitOptions.RemoveEmptyEntries).ToList();

            var searchModel = new SearchModel
            {
                Query = q.Select(x => x.Trim()).ToList(),
                AnnouncementApplicationId = announcementApplicationId ?? 0,
                DistrictId = districtId,
                IsMyAppsView = myAppsView
            };
            var connector = new YoutubeConnector();
            searchModel.Videos = new List<VideoModel>();

            var videosTasks = q.Select(x => Task.Factory.StartNew(() => connector.Search(x).ToList())).ToList();
            foreach(var videos in videosTasks)
                searchModel.Videos.AddRange(await videos);

            return View("Edit", searchModel);
        }

        public ActionResult ViewVideo(string id)
        {
            var connector = new YoutubeConnector();
            var model = connector.GetById(id);
            model.AnnouncementApplicationId = 0;
            model.DistrictId = Guid.Empty;
            return View("Preview", model);
        }

        public ActionResult Preview(string id, int announcementApplicationId, Guid districtId)
        {
            var storage = new Storage(ChalkableAuthorization.Configuration.ConnectionString);
            storage.Set(districtId, announcementApplicationId, id);
            var connector = new YoutubeConnector();
            var model = connector.GetById(id);
            model.AnnouncementApplicationId = announcementApplicationId;
            model.DistrictId = districtId;
            ViewBag.ReadyToAttach = true;
            return View("Preview", model);
        }

        public ActionResult Video(int announcementApplicationId, Guid districtId)
        {
            var storage = new Storage(ChalkableAuthorization.Configuration.ConnectionString);
            var videoId = storage.Get(districtId, announcementApplicationId);
            var model = (new YoutubeConnector()).GetById(videoId);
            ViewBag.ReadyToAttach = true;
            model.AnnouncementApplicationId = announcementApplicationId;
            return View("Video", model);
        }

        private async Task<IList<string>> BuildSearchQuery(IEnumerable<StandardInfo> standardInfos, int? announcementApplicationId)
        {
            var chalkableConnector = new ChalkableConnector(ChalkableAuthorization);
            var query = await BuildStandardSearchQuery(standardInfos?.ToList(), chalkableConnector);

            if (query.Count == 0 && announcementApplicationId.HasValue)
                query.Add(await GetClassName(announcementApplicationId.Value, chalkableConnector));

            return query;
        }

        private async Task<string> GetClassName(int announcementApplicationId, ChalkableConnector chalkableConnector)
        {
            var aa = await chalkableConnector.Announcement.GetAnnouncementApplicationById(announcementApplicationId);
            var announcement = await chalkableConnector.Announcement.GetRead(aa.AnnouncementId, aa.AnnouncementType);
            return announcement?.ClassName;
        }

        private async Task<IList<string>> BuildStandardSearchQuery(IEnumerable<StandardInfo> standardInfos, ChalkableConnector chalkableConnector)
        {
            if (standardInfos != null)
            {
                var standardsGuids = new List<Guid>();
                foreach (var standardInfo in standardInfos)
                {
                    Guid parsedGuidTmp;
                    if (Guid.TryParse(standardInfo.StandardId, out parsedGuidTmp))
                        standardsGuids.Add(parsedGuidTmp);
                }
                if (standardsGuids.Count > 0)
                {
                    var codes = new List<string>();
                    var standardsRelations = await chalkableConnector.Standards.GetListOfStandardRelations(standardsGuids);
                    codes.AddRange(standardsRelations.Where(x=>!string.IsNullOrEmpty(x.CurrentStandard.Code)).Select(x=>x.CurrentStandard.Code));
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
            }
            return new List<string>();
        }

    }
}
