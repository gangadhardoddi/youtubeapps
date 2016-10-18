using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Youtube.Models
{
    public class SearchResult
    {
        public string Id { get; set; }
        public string ThumbUrl => "https://i4.ytimg.com/vi/" + Id + "/mqdefault.jpg";
        public string Duration { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public static SearchResult Create(Google.Apis.YouTube.v3.Data.SearchResult model)
        {
            return new SearchResult
            {
                Id = model.Id.VideoId,
                Description = model.Snippet.Description,
                Title = model.Snippet.Title,
                Duration = model.Snippet.ChannelId
            };
        }
    }
}