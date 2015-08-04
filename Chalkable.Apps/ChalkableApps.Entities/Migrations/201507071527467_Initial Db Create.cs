namespace Chalkable.Apps.Entities.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialDbCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SimpleApplication",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DefaultSearchOption = c.Int(nullable: false),
                        Name = c.String(maxLength: 50, unicode: false),
                        Url = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.SimpleApplication", new[] { "Name" });
            DropTable("dbo.SimpleApplication");
        }
    }
}
