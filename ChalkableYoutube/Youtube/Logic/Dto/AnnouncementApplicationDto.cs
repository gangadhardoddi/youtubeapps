using System;

namespace Youtube.Logic.Dto
{
    public class AnnouncementApplicationData
    {
        public int announcementapplicationid { get; set; }
        public Guid id { get; set; }
        public int announcementid { get; set; }
        public int? currentpersonid { get; set; }
        public bool active { get; set; }
        public string name { get; set; }
        public Guid applicationid => id;
    }

    public class AnnouncementApplicationDto
    {
        public AnnouncementApplicationData data { get; set; }
    }
}