using System;

namespace Youtube.Models
{
    public class VideoModel
    {
        public const int MAX_DESCRIPTION = 800;
        public const int MAX_SHORT_TITLE = 30;
        public const int MAX_SHORT_DESCRIPTION = 70;

        public string Id { get; set; }
        public string Title { get; set; }
        public string ShortTitle
        {
            get
            {
                var title = Title ?? "";
                return title.Length > MAX_SHORT_TITLE ? title.Substring(0, MAX_SHORT_TITLE) + "..." : title;
            }
        }
        public string ShortDescription
        {
            get
            {
                var shortDesc = Description ?? "";
                return shortDesc.Length > MAX_SHORT_DESCRIPTION
                    ? shortDesc.Substring(0, MAX_SHORT_DESCRIPTION) + "..."
                    : shortDesc;
            }
        }
        public string Description
        {
            get
            {
                return _desc;
            }
            set {
                _desc = value != null && value.Length > MAX_DESCRIPTION
                    ? value.Substring(0, MAX_DESCRIPTION) + "...."
                    : value;
            }
        }       
        public int AnnouncementApplicationId { get; set; }
        public Guid DistrictId { get; set; }   
        public string Duration { get; set; }
        public string UploadedBy { get; set; }
        public ulong Views { get; set; }
        public string ThumbUrl => "https://i4.ytimg.com/vi/" + Id + "/mqdefault.jpg";
        public string Url => "https://www.youtube.com/embed/" + Id;

        private string _desc;
    }
}