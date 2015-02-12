using WindowsAzure.Acs.Oauth2.Client;
using ChalkableBaseAppLib;
using ChalkableBaseAppLib.Models.Dto;
using Youtube.Logic.Dto;

namespace Youtube.Logic
{
    public class ChalkableConnector: BaseChalkableConnector
    {
        public ChalkableConnector(SimpleOAuth2Client oauthClient, string apiRoot)
            : base(oauthClient, apiRoot)
        {
        }
       
        public AnnouncementDto GetAnnouncementById(int announcementId)
        {
            var url = ApiRoot + "/announcement/read.json";
            url = string.Format("{0}?{1}={2}", url, "announcementId", announcementId);
            return Call<AnnouncementDto>(url);
        }
    }
}