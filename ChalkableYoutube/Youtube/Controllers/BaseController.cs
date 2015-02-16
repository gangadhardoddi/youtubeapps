using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using WindowsAzure.Acs.Oauth2.Client;
using ChalkableBaseAppLib;
using Youtube.Logic;

namespace Youtube.Controllers
{
    public class BaseController : Controller
    {

        private const string OAUTH_CLIENT = "OAUTH_CLIENT";
        private const string API_ROOT = "API_ROOT";
        protected SimpleOAuth2Client OauthClient { get { return Session[OAUTH_CLIENT] as SimpleOAuth2Client; } }
        protected string Mode { private set; get; }
        protected int AnnouncementApplicationId { private set; get; }
        protected int StudentId { private set; get; }
        protected string StandardSearchQuery { private set; get; }

        protected string ApiRoot { get { return Session[API_ROOT] as string; } }
        protected ApplicationEnvironment Configuration
        {
            get { return Settings.GetConfiguration(ApiRoot); }
        }

        protected override void Initialize(RequestContext requestContext)
        {
            AcceptAllCerts();//TODO: just for testing
            base.Initialize(requestContext);
        }

        private static void AcceptAllCerts()
        {
            ServicePointManager.ServerCertificateValidationCallback = ((sender, certificate, chain, sslPolicyErrors) => true);
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            AuthenticateByChalkable();
            ViewBag.ApiRoot = ApiRoot;
            base.OnActionExecuting(filterContext);
        }

        private void AuthenticateByChalkable()
        {
            var urlParams = Request.Params;
            Mode = urlParams[Settings.PAGE_MODE_PARAM] ?? Settings.MY_VIEW_MODE;
            if (!string.IsNullOrEmpty(urlParams[Settings.ANNOUNCEMENT_APPLICATION_ID]))
                AnnouncementApplicationId = int.Parse(urlParams[Settings.ANNOUNCEMENT_APPLICATION_ID]);
            else
                AnnouncementApplicationId = -1;

            if (!string.IsNullOrEmpty(urlParams[Settings.STUDENT_ID_PARAM]))
                StudentId = int.Parse(urlParams[Settings.STUDENT_ID_PARAM]);
            else
                StudentId = -1;
            StandardSearchQuery = BuildStandardSearchQuery(urlParams);

            var code = urlParams[Settings.CODE_PARAM];
            var error = urlParams[Settings.ERROR_PARAM];
            var apiRoot = urlParams[Settings.API_ROOT_PARAM];

            if (!string.IsNullOrEmpty(error))
            {
                throw new Exception(string.Format("OAuth error {0}. {1}", error,
                    Request.Params["error_description"]));
            }

            if (apiRoot == null) return;

            Session[API_ROOT] = apiRoot;

            var acsUri = new Uri(Configuration.AcsUri);
            var redirectUri = new Uri(Configuration.RedirectUri);
            var appSecret = Configuration.AppSecret;
            var appName = Configuration.ClientId;
            var chlkRoot = Configuration.Scope;

            if (string.IsNullOrEmpty(code)) return;

            var oauthClient = new SimpleOAuth2Client(new Uri(apiRoot + "/authorize/index"), acsUri, appName, appSecret,
                chlkRoot, redirectUri);
                
            oauthClient.Authorize(code);
            Session[OAUTH_CLIENT] = oauthClient;
        }

        private static string BuildStandardSearchQuery(NameValueCollection urlParams)
        {
            var p = new List<string>();

            const int MAX_STANDARDS = 1000;
            for (var id = 0; id < MAX_STANDARDS; ++id)
            {
                var standardNameParam = urlParams[string.Format(Settings.STANDARD_NAME_PARAM + "[{0}]", id)];
                var ccstandardCodeParam = urlParams[string.Format(Settings.CC_STANDARD_CODE_PARAM+ "[{0}]", id)];

                if (string.IsNullOrWhiteSpace(standardNameParam) && string.IsNullOrWhiteSpace(ccstandardCodeParam))
                    break;

                if (!string.IsNullOrWhiteSpace(standardNameParam))
                    p.Add(standardNameParam);

                if (!string.IsNullOrWhiteSpace(ccstandardCodeParam))
                    p.Add(standardNameParam);
            }

            return string.Join(" ", p);
        }
    }

}
