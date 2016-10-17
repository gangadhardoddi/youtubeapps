using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;
using Chalkable.Apps.Entities.Models;

namespace Chalkable.Apps.Web.Models {
    public class AppInstance {
      
        public string ApiRoot { get; set; }      
        public SimpleApplication App { get; set; }
        public IEnumerable<Standard> Standards { get; set; }
        public string FullUrl { get { return string.Concat(App.Url, GetStandardsQueryString()); } }        

        public string GetStandardsQueryString() {
            if (App.DefaultSearchOption == SearchOption.StandardCode) {
                return string.Join(" ", Standards.Select(s => !string.IsNullOrEmpty(s.CommonCoreCode) ? s.CommonCoreCode : (!string.IsNullOrEmpty(s.Name) ? s.Name : "")).ToArray());
            }
            else {
                return string.Join(" ", Standards.Select(s => !string.IsNullOrEmpty(s.Name) ? s.Name : (!string.IsNullOrEmpty(s.CommonCoreCode) ? s.CommonCoreCode : "")).ToArray());
            }
        }
    }

    public class Standard {
        public int? StandardId { get; set; }
        public string CommonCoreCode { get; set; }
        public string Name { get; set; }

    }
}