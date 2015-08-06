using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Collections.Specialized;
using System.Configuration;
using Chalkable.Apps.Web.Extensions;

namespace Chalkable.Apps.Web.Controllers {
    public class AppsController : Controller {


        [Route("apps/{appName}")]
        [ValidateInput(false)]
        public ActionResult Index(string appName, string mode, int? announcementapplicationid, string apiRoot, List<int?> standardId, List<string> ccStandardCode, List<string> standardName) {

            var standards = BuildStandardsList(standardId, ccStandardCode, standardName);
            var app = Models.ApplicationList.Applications.FirstOrDefault(a => string.Equals(a.Name, appName, StringComparison.OrdinalIgnoreCase));
            if (app == null) {
                return new HttpNotFoundResult("App not found");
            }

            var model = new Chalkable.Apps.Web.Models.AppInstance() {
                App = app,                
                ApiRoot = apiRoot,
                Standards = standards
            };

            return View(model);
        }

        private static List<Models.Standard> BuildStandardsList(List<int?> ids, List<string> codes, List<string> names) {
            var standards = new List<Models.Standard>();

            var idCount = 0;
            var codeCount = 0;
            var nameCount = 0;

            if (!ids.IsNullOrEmpty()) {
                idCount = ids.Count;
            }
            if (!codes.IsNullOrEmpty()) {
                codeCount = codes.Count;
            }
            if (!names.IsNullOrEmpty()) {
                nameCount = names.Count;
            }

            if (idCount > 0 || codeCount > 0 || nameCount > 0) {
                
                var itemCount = new[] { idCount, codeCount, nameCount }.Max();
                for (int i = 0; i < itemCount; i++) {
                    var standard = new Models.Standard();

                    if (!codes.IsNullOrEmpty()) {
                        standard.CommonCoreCode = codes[i];
                    }

                    if (!names.IsNullOrEmpty()) {
                        standard.Name = names[i];
                    }

                    if (!ids.IsNullOrEmpty()) {
                        standard.StandardId = ids[i];
                    }
                    standards.Add(standard);
                }
            }
            return standards;

        }
    }
}
