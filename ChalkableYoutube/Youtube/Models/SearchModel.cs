using System;
using System.Collections.Generic;
using Google.YouTube;

namespace Youtube.Models
{
    public class SearchModel
    {
        public string Query { get; set; }
        public IEnumerable<VideoModel> Videos { get; set; }
        public int AnnouncementApplicationId { get; set; }
        public Guid DistrictId { get; set; }
        public string StandardQuery { get; set; }
    }

    public class VideoModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string ShortTitle { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public int AnnouncementApplicationId { get; set; }
        public Guid DistrictId { get; set; }
        public const int MAX_DESCRIPTION = 800;
        public const int MAX_SHORT_TITLE = 30;
        public const int MAX_SHORT_DESCRIPTION = 70;
        public string Duration { get; set; }
        public string UploadedBy { get; set; }
        public int Views { get; set; }

        public static VideoModel Create(Video video, int announcementApplicationId)
        {
            var desc = video.Description ?? "";
            var shortDesc = video.Description ?? "";
            var title = video.Title ?? "";
            if (desc.Length > MAX_DESCRIPTION)
                desc = desc.Substring(0, MAX_DESCRIPTION) + "....";
            if (shortDesc.Length > MAX_SHORT_DESCRIPTION)
                shortDesc = shortDesc.Substring(0, MAX_SHORT_DESCRIPTION) + "...";
            if (title.Length > MAX_SHORT_TITLE)
                title = title.Substring(0, MAX_SHORT_TITLE) + "...";
            var res = new VideoModel
            {
                Id = video.VideoId,
                Title = video.Title,
                Views = video.ViewCount,
                UploadedBy = video.Uploader,
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
        }
    }
}