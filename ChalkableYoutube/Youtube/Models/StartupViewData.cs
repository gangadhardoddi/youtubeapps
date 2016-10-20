using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Youtube.Models
{
    public class BaseViewData
    {
        public int? AnnouncementApplicationId { get; set; }
    }
    public class StartupViewData : BaseViewData
    {
        public string Mode { get; set; }
        public string Role { get; set; }
        public string StandardVideosJson { get; set; }
        public string VideoId { get; set; }
    }
}