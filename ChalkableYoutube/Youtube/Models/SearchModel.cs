using System;
using System.Collections.Generic;

namespace Youtube.Models
{
    public class SearchModel
    {
        public string Query { get; set; }
        public IEnumerable<VideoModel> Videos { get; set; }
        public int AnnouncementApplicationId { get; set; }
        public Guid DistrictId { get; set; }
        public string StandardQuery { get; set; }
        public bool IsMyAppsView { get; set; }
    }
}