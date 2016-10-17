using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Web.Mvc;


namespace Chalkable.Apps.Web.Controllers {
    public class HomeController : Controller {
        [ValidateInput(false)]
        public ActionResult Index(string url, string mode, int? announcementapplicationid, string apiRoot) {
            return View();
        }


    }
}
