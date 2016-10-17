namespace Chalkable.Apps.Entities.Migrations {
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Models;

    internal sealed class Configuration : DbMigrationsConfiguration<Chalkable.Apps.Entities.ChalkableAppsContext> {
        public Configuration() {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(Chalkable.Apps.Entities.ChalkableAppsContext context) {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            context.SimpleApplications.AddOrUpdate(
              p => p.Name,
                new SimpleApplication() {
                    Name = "blendspace",
                    Url = "https://www.blendspace.com/search?q=",
                    DefaultSearchOption = SearchOption.StandardCode
                },
                new SimpleApplication() {
                    Name = "neok",
                    Url = "http://www.neok12.com/php/search.php?qry=",
                    DefaultSearchOption = SearchOption.StandardCode
                },
                new SimpleApplication() {
                    Name = "pbs",
                    Url = "https://www.pbslearningmedia.org/search/?q=",
                    DefaultSearchOption = SearchOption.StandardCode
                },
                new SimpleApplication() {
                    Name = "sharemylesson",
                    Url = "https://www.sharemylesson.com/TaxonomySearchResults.aspx?area=resources&keywords=",
                    DefaultSearchOption = SearchOption.StandardCode
                }
            );

        }
    }
}
