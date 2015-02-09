using System;

namespace ChalkableBaseAppLib.Models.Dto
{

    public class RoleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string NameLowered { get; set; }
    }

    public class SchoolPersonData
    {
        public Guid districtid { get; set; }
        public int id { get; set; }
        public string displayname { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string gender { get; set; }
        public RoleData role{ get; set; }

        public int currentschoolyearid { get; set; }
        public int schoollocalid { get; set; }
        
    }
    public class SchoolPersonDto
    {
        public SchoolPersonData data { get; set; }
    }
}