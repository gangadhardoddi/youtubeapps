using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Chalkable.Apps.Entities;
using Chalkable.Apps.Entities.Models;

namespace Chalkable.Apps.Web.Models {
    public class ApplicationList {

        private static readonly Lazy<IEnumerable<SimpleApplication>> _applications = new Lazy<IEnumerable<SimpleApplication>>(() => {
            var dbContext = new Chalkable.Apps.Entities.ChalkableAppsContext();
            return dbContext.SimpleApplications.ToList();
            
        });

        public static IEnumerable<SimpleApplication> Applications {
            get { return _applications.Value; }
        }
    }
}