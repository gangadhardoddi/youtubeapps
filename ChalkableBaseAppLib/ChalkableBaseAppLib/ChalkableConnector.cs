using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using WindowsAzure.Acs.Oauth2.Client;
using ChalkableBaseAppLib.Models.Dto;
using Newtonsoft.Json;

namespace ChalkableBaseAppLib
{
    public class BaseChalkableConnector
    {
        public T Call<T>(string url)
        {
            try
            {
                Debug.WriteLine("Request on: " + url);
                if (oauthClient != null)
                {
                    Debug.WriteLine("Request on: " + url);
                    var webRequest = (HttpWebRequest) WebRequest.Create(url);
                    webRequest.Method = WebRequestMethods.Http.Get;
                    webRequest.Accept = "application/json";
                    oauthClient.AppendAccessTokenTo(webRequest);
                    var response = webRequest.GetResponse();
                    using (var stream = response.GetResponseStream())
                    {
                        var sr = new StreamReader(stream);
                        var str = sr.ReadToEnd();
                        Debug.WriteLine(str);
                        return JsonConvert.DeserializeObject<T>(str);
                    }
                }
            }
            catch (WebException e)
            {
                var strRe = new StreamReader(e.Response.GetResponseStream());
                var rsp = strRe.ReadToEnd();
                throw new Exception(string.Format("call to remote server failed: {0}\n{1}", e.Message, rsp), e);
            }
            throw new Exception("oauth client isn't initialized");
        }

        private SimpleOAuth2Client oauthClient;

        public BaseChalkableConnector(SimpleOAuth2Client oauthClient)
        {
            this.oauthClient = oauthClient;
        }

        public SchoolPersonDto GetMe()
        {
            return Call<SchoolPersonDto>(ChalkableConfig.Configuration.ChalkableRoot + "Person/Me.json");
        }

        public AnnouncementApplicationDto GetAnnouncementApplicationById(int announcementApplicationId)
        {
            var url = ChalkableConfig.Configuration.ChalkableRoot + "Application/GetAnnouncementApplication.json";
            url = string.Format("{0}?{1}={2}", url, "announcementApplicationId", announcementApplicationId);
            return Call<AnnouncementApplicationDto>(url);
        }

    }
}