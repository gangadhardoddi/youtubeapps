using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Routing;
using Chalkable.API;
using Chalkable.API.Helpers;
using Chalkable.API.Models;
using Youtube.Logic;
using Youtube.Models;

namespace Youtube.Controllers
{
    public class HomeController : Chalkable.API.Controllers.HomeController
    {
        protected override async Task<ActionResult> ResolveAction(string mode, int? announcementApplicationId, int? studentId, 
            int? announcementId, int? announcementType, int? attributeId, IEnumerable<StandardInfo> standards, string contentId)
        {
            await Task.Delay(0);

            if (string.IsNullOrEmpty(mode))
                return new EmptyResult();

            var actionParams = new RouteValueDictionary {
                ["announcementApplicationId"] = announcementApplicationId,
            };

            switch (mode)
            {
                case Settings.EDIT_MODE:

                    if (!string.IsNullOrEmpty(contentId))
                    {
                        actionParams.Add("id", contentId);
                        return RedirectToAction("ViewVideo", "Youtube", actionParams);
                    }

                    actionParams.Add("standardIds", standards.Select(x => x.StandardId).JoinString(","));
                    return RedirectToAction("RecommendedVideos", "Youtube", actionParams);

                case Settings.MY_VIEW_MODE:
                    if(standards?.ToList().Count > 0)
                    {
                        actionParams.Add("standardIds", standards.Select(x => x.StandardId).JoinString(","));
                        return RedirectToAction("RecommendedVideos", "Youtube", actionParams);
                    }
                    else
                        return RedirectToAction("AllVideos", "Youtube");

                case Settings.VIEW_MODE:
                    actionParams.Add("id", contentId);
                    return RedirectToAction("ViewVideo", "Youtube", actionParams);

                case Settings.GRADING_VIEW_MODE:
                    actionParams.Add("id", (string) null);
                    return RedirectToAction("ViewVideo", "Youtube", actionParams);

                default:
                    return View("NotSupported");
            }       
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var chalkableAuthorization = ChalkableAuthorization;
            if (chalkableAuthorization != null)         
                ViewBag.ApiRoot = chalkableAuthorization.ApiRoot;
           
            ViewBag.IsProduction = true;
#if DEBUG
            ViewBag.IsProduction = false;
#endif
            base.OnActionExecuting(filterContext);
        }

        protected override PaginatedList<ApplicationContent> GetApplicationContents(IList<StandardInfo> standardInfos, int? start, int? count)
        {
            count = count ?? 5;
            start = start ?? 0;

            var ids = standardInfos.Select(x => x.StandardId).JoinString(",");
            var chlkConnector = new ChalkableConnector(ChalkableAuthorization);
            var youtubeConnector = new YoutubeConnector();

            var standards = YoutubeController.GetStandardCodes(ids, chlkConnector);
            var videos = standards.SelectMany(x => youtubeConnector.Search(x, 5))
                .Select( x => new ApplicationContent
                {
                    ContentId = x.Id,
                    Description = x.ShortDescription,
                    ImageUrl = x.ThumbUrl,
                    Text = x.ShortTitle
                }).ToList();

            return new PaginatedList<ApplicationContent>(videos.Take(count.Value), videos.Count);
        }
    }

}
