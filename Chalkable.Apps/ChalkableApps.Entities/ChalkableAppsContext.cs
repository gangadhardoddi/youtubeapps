using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using Chalkable.Apps.Entities.Models;

namespace Chalkable.Apps.Entities {
    public class ChalkableAppsContext : DbContext {
        public ChalkableAppsContext() : base("name=ChalkableAppsContext") { }

        public DbSet<SimpleApplication> SimpleApplications { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder) {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Properties<string>().Configure(c => c.IsUnicode(false));
        }

    }
}
