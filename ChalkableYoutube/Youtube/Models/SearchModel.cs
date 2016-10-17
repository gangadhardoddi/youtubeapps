using System;
using System.Collections.Generic;

namespace Youtube.Models
{
    public class SearchModel
    {
        public IList<string> Query { get; set; }
        public IList<VideoModel> Videos { get; set; }
        public int AnnouncementApplicationId { get; set; }
        public Guid DistrictId { get; set; }
        public string StandardQuery { get; set; }
        public bool IsMyAppsView { get; set; }
    }
}