namespace Budgety.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class extendedmodel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Customers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Email = c.String(),
                        FirstName = c.String(),
                        LastName = c.String(),
                        ItemsExp = c.String(),
                        ItemsInc = c.String(),
                        TotalExp = c.String(),
                        TotalInc = c.String(),
                        Budget = c.String(),
                        Percent = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Customers");
        }
    }
}
