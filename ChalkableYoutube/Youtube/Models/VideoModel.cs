using System;

namespace Youtube.Models
{
    public class VideoModel
    {
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

        private string _desc;
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

        public int AnnouncementApplicationId { get; set; }
        public Guid DistrictId { get; set; }
        public const int MAX_DESCRIPTION = 800;
        public const int MAX_SHORT_TITLE = 30;
        public const int MAX_SHORT_DESCRIPTION = 70;
        public string Duration { get; set; }
        public string UploadedBy { get; set; }
        public ulong Views { get; set; }

        /*public static VideoModel Create(Video video, int announcementApplicationId)
        {
            var res = new VideoModel
            {
                Id = video.Id,
                Title = video.Snippet.Title,
                Views = video.Snippet.ViewCount,
                UploadedBy = video.Snippet.Uploader,
                Description = desc,
                ShortDescription = shortDesc,
                ShortTitle = title,
                AnnouncementApplicationId = announcementApplicationId
            };
            int duration;
            if (int.TryParse(video.Media.Duration.Seconds, out duration))
            {
                res.Duration = TimeSpan.FromSeconds(duration).ToString();
            }
            return res;
        }*/
    }
}