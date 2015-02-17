using System;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;
using ChalkableBaseAppLib;
using Youtube.Logic;
using Youtube.Models;

namespace Youtube.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            if (!string.IsNullOrEmpty(Mode))
            {
                var chalkableConnector = new ChalkableConnector(OauthClient, ApiRoot);
                var me = chalkableConnector.GetMe();

                var query = StandardSearchQuery;

                if (Mode == Settings.EDIT_MODE && string.IsNullOrWhiteSpace(query))
                {
                    var announcementApplication = chalkableConnector.GetAnnouncementApplicationById(AnnouncementApplicationId);
                    var announcement = chalkableConnector.GetAnnouncementById(announcementApplication.data.announcementid);
                    query = announcement.data.classname;
                }

                var actionParams = new RouteValueDictionary
                {
                    {"announcementApplicationId", AnnouncementApplicationId},
                    {"districtId", me.data.districtid},
                    {"query", query}
                };

                if (Mode == Settings.EDIT_MODE || Mode == Settings.MY_VIEW_MODE)     
                    return RedirectToAction("Edit", actionParams);

                if (Mode == Settings.VIEW_MODE || Mode == Settings.SUMMARY_VIEW_MODE || Mode == Settings.GRADING_VIEW_MODE)
                    return RedirectToAction("Video", actionParams);
            }

            return View();
        }

        public ActionResult Edit(string query, int announcementApplicationId, Guid districtId, string standardQuery, int? count = 9)
        {
            query = query ?? "";
            var searchModel = new SearchModel
            {
                Query = query.Trim(),
                AnnouncementApplicationId = announcementApplicationId,
                DistrictId = districtId
            };
            var connector = new YoutubeConnector();
            var videos = connector.Search(query.Trim());
            searchModel.Videos = videos.Select(VideoModel.Create);
            return View("Edit", searchModel);
        }

        public ActionResult Preview(string id, int announcementApplicationId, Guid districtId)
        {
            var storage = new Storage(Configuration.ConnectionString);
            storage.Set(districtId, announcementApplicationId, id);
            var connector = new YoutubeConnector();
            var video = connector.GetById(id);
            var model = VideoModel.Create(video, announcementApplicationId);
            model.AnnouncementApplicationId = announcementApplicationId;
            model.DistrictId = districtId;
            ViewData["ReadyToAttach"] = true;
            return View("Preview", model);
        }

        public ActionResult Video(int announcementApplicationId, Guid districtId)
        {
            var storage = new Storage(Configuration.ConnectionString);
            var videoId = storage.Get(districtId, announcementApplicationId);
            var video = (new YoutubeConnector()).GetById(videoId);
            ViewData["ReadyToAttach"] = true;
            var model = VideoModel.Create(video, announcementApplicationId);
            model.AnnouncementApplicationId = announcementApplicationId;
            return View("Video", model);
        }
    }
}
