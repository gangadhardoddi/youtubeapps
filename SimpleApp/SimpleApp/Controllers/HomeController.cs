using System.Collections.Generic;
using System.Collections.Specialized;
using System.Configuration;
using System.Web.Mvc;
using SimpleApp.lib;

namespace SimpleApp.Controllers
{
    public class HomeController : Controller
    {
        [ValidateInput(false)]
        public ActionResult Index(string url, string mode, int? announcementapplicationid, string apiRoot)
        {
            var searchQuery = BuildStandardSearchQuery(Request.Params);
            ViewData[Settings.APP_URL] = ConfigurationManager.AppSettings[Settings.SITE_QUERY_URL] + searchQuery;
            ViewData[Settings.API_ROOT_PARAM] = apiRoot;
            return View();
        }

        private static string BuildStandardSearchQuery(NameValueCollection urlParams)
        {
            var p = new List<string>();

            const int MAX_STANDARDS = 1000;
            for (var id = 0; id < MAX_STANDARDS; ++id)
            {
                var standardNameParam = urlParams[string.Format(Settings.STANDARD_NAME_PARAM + "[{0}]", id)];
                var ccstandardCodeParam = urlParams[string.Format(Settings.CC_STANDARD_CODE_PARAM + "[{0}]", id)];

                if (string.IsNullOrWhiteSpace(standardNameParam) && string.IsNullOrWhiteSpace(ccstandardCodeParam))
                    break;

                if (!string.IsNullOrWhiteSpace(standardNameParam))
                    p.Add(standardNameParam);
                else if (!string.IsNullOrWhiteSpace(ccstandardCodeParam))
                    p.Add(ccstandardCodeParam);
            }

            return string.Join(" ", p);
        }
    
    }
}
