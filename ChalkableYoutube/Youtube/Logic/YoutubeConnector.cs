using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Xml;
using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Youtube.Models;

namespace Youtube.Logic
{
    public class YoutubeConnector
    {
        private string GooglePublicAPIKey
        {
            get
            {
                var value = ConfigurationManager.AppSettings["GooglePublicAPIkey"];

                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new Exception("Please configure GooglePublicAPIkey in Web.config/appSettings");
                }

                return value;
            }
        }

        public IEnumerable<VideoModel> Search(string videoQuery, int maxResult = 50)
        {
            var youtubeService = GetYoutubeService();

            var searchListRequest = youtubeService.Search.List("snippet");
            if(!string.IsNullOrWhiteSpace(videoQuery))
                searchListRequest.Q = videoQuery;
            searchListRequest.MaxResults = maxResult;
            searchListRequest.Type = "video";

            // Call the search.list method to retrieve results matching the specified query term.
            var searchListResponse = searchListRequest.Execute();          

            return GetVideoInfo(youtubeService, searchListResponse.Items.Select(x => x.Id.VideoId).ToArray(), maxResult);
        }

        private YouTubeService GetYoutubeService()
        {
            return new YouTubeService(new BaseClientService.Initializer()
            {
                ApiKey = GooglePublicAPIKey,
                ApplicationName = this.GetType().ToString()
            });
        }

        private static IEnumerable<VideoModel> GetVideoInfo(YouTubeService youtubeService, string[] videoIds, int maxResult = 50)
        {
            var videoListRequest = youtubeService.Videos.List("snippet,contentDetails,statistics");
            videoListRequest.Id = string.Join(",", videoIds);
            videoListRequest.MaxResults = maxResult;

            var videoListResponse = videoListRequest.Execute();

            var videos = new List<VideoModel>();

            // Add each result to the appropriate list, and then display the lists of
            // matching videos, channels, and playlists.
            foreach (var videoResult in videoListResponse.Items)
            {
                switch (videoResult.Kind)
                {
                    case "youtube#video":
                        videos.Add(new VideoModel
                        {
                            Id = videoResult.Id,
                            Title = videoResult.Snippet.Title,
                            Description = videoResult.Snippet.Description,
                            Views = videoResult.Statistics.ViewCount ?? 0,
                            UploadedBy = videoResult.Snippet.ChannelTitle,
                            Duration = XmlConvert.ToTimeSpan(videoResult.ContentDetails.Duration).ToString(),
                            Author = videoResult.Snippet.ChannelTitle
                        });
                        break;
                }
            }

            return videos;
        }

        public VideoModel GetById(string id)
        {
            var youtubeService = GetYoutubeService();
            return GetVideoInfo(youtubeService, new[] {id}).FirstOrDefault();
        }
    }
}