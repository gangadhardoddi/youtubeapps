using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Chalkable.API;
using Chalkable.API.Models;
using Newtonsoft.Json;

namespace Youtube.Models
{
    public class BaseViewData
    {
        public int? AnnouncementApplicationId { get; set; }
    }
    public class StartupViewData : BaseViewData
    {
        public string StandardVideosJson { get; set; }
        public string VideoId { get; set; }
        public bool IsRecommendedEnabled { get; set; }
        public bool OnlyViewVideo { get; set; }

        public static StartupViewData Create(IList<StandardVideos> standardVideos, string videoId, int? annAppId, CoreRole role)
        {
            return new StartupViewData()
            {
                AnnouncementApplicationId = annAppId,
                StandardVideosJson = standardVideos == null ? null : JsonConvert.SerializeObject(standardVideos),
                VideoId = videoId,
                IsRecommendedEnabled = ShowRecommended(role, standardVideos),
                OnlyViewVideo = IsOnlyVideoView(videoId)
            };
        }

        private static bool ShowRecommended(CoreRole role, IList<StandardVideos> standardVideos)
        {
            if (role == CoreRoles.DISTRICT_ADMIN_ROLE)
                return false;

            if (standardVideos == null || standardVideos.Count == 0)
                return false;

            return true;
        }

        private static bool IsOnlyVideoView(string videoId)
        {
            return !string.IsNullOrEmpty(videoId);
        }
    }
}