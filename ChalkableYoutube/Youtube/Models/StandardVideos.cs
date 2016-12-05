using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Youtube.Models
{
    public class StandardVideos
    {
        public string StandardName { get; set; }
        public IList<VideoModel> Videos { get; set; }


        public static StandardVideos Create(string standardName, IList<VideoModel> videos)
        {
            return new StandardVideos
            {
                StandardName = standardName, 
                Videos = videos
            };
        }
    }
}