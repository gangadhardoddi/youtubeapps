using System.Net;
using System.Web.Mvc;
using System.Web.Routing;
using Youtube.Logic;
using ChalkableConnector = Chalkable.API.ChalkableConnector;

namespace Youtube.Controllers
{
    public class BaseController : Chalkable.API.Controllers.BaseController
    {
      
        protected ChalkableConnector ChalkableConnector {private set; get; }
        protected YoutubeConnector YoutubeConnector => new YoutubeConnector();

#if DEBUG
    protected override void Initialize(RequestContext requestContext)
        {
            ServicePointManager.ServerCertificateValidationCallback = ((sender, certificate, chain, sslPolicyErrors) => true);
            base.Initialize(requestContext);
        }
#endif

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var chalkableAuthorization = ChalkableAuthorization;
            if (chalkableAuthorization != null)
            {
                ViewBag.ApiRoot = chalkableAuthorization.ApiRoot;
                ChalkableConnector = new ChalkableConnector(chalkableAuthorization);
            }

            ViewBag.IsProduction = true;
#if DEBUG
            ViewBag.IsProduction = false;
#endif

            base.OnActionExecuting(filterContext);
        }

        protected ActionResult ChlkJson(object data)
        {
            var res = new JsonResult
            {
                Data = new
                {
                    Success = true,
                    Data = data
                },
                JsonRequestBehavior = JsonRequestBehavior.AllowGet
            };
            return res;
        }
    }

}
