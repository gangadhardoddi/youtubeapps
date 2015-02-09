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
        protected SimpleOAuth2Client OauthClient;
        protected string Mode { private set; get; }
        protected int AnnouncementApplicationId { private set; get; }
        protected int StudentId { private set; get; }
        protected string StandardSearchQuery { private set; get; }

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
            ViewData["chalkableurl"] = Settings.Configuration.ChalkableRoot;
            base.OnActionExecuting(filterContext);
        }

        private void AuthenticateByChalkable()
        {
            var urlParams = Request.Params;
            RetrieveParams(urlParams);

            var authUri = new Uri(Settings.Configuration.AuthUri);
            var acsUri = new Uri(Settings.Configuration.AcsUri);
            var redirectUri = new Uri(Settings.Configuration.RedirectUri);
            var appSecret = Settings.Configuration.AppSecret;
            var appName = Settings.Configuration.ApplicationName;
            var chlkRoot = Settings.Configuration.ChalkableRoot;

            var code = urlParams["code"];
            var error = urlParams["error"];

            if (Session[OAUTH_CLIENT] == null || code != null || error != null)
            {
                OauthClient = new SimpleOAuth2Client(authUri, acsUri, appName, appSecret, chlkRoot, redirectUri);
                if (!string.IsNullOrEmpty(error))
                {
                    throw new Exception(string.Format("OAuth error {0}. {1}", error, Request.Params["error_description"]));
                }
                if (!string.IsNullOrEmpty(code))
                {
                    OauthClient.Authorize(code);
                    Session[OAUTH_CLIENT] = OauthClient;
                }
            }
            else
                OauthClient = Session[OAUTH_CLIENT] as SimpleOAuth2Client;
        }

        private void RetrieveParams(NameValueCollection urlParams)
        {
            Mode = urlParams[Settings.PAGE_MODE_PARAM] ?? Settings.MY_VIEW_MODE;
            if (!string.IsNullOrEmpty(urlParams[Settings.ANNOUNCEMENT_APPLICATION_ID]))
                AnnouncementApplicationId = int.Parse(urlParams[Settings.ANNOUNCEMENT_APPLICATION_ID]);
            else
                AnnouncementApplicationId = -1;

            if (!string.IsNullOrEmpty(urlParams[ChalkableConfig.STUDENT_ID_PARAM]))
                StudentId = int.Parse(urlParams[ChalkableConfig.STUDENT_ID_PARAM]);
            else
                StudentId = -1;
            StandardSearchQuery = BuildStandardSearchQuery(urlParams);
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

            return string.Join("+", p);
        }
    }

}
