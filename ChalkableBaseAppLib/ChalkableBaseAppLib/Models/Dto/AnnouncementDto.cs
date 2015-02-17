using System;

namespace ChalkableBaseAppLib.Models.Dto
{
    public class ClassData
    {
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string cursetitle { get; set; }
    }

    public class AnnouncementData
    {
        public int id { get; set; }
        public string announcementtypename { get; set; }
        public int personid { get; set; }
        public string personname { get; set; }
        public string title { get; set; }
        public string subject { get; set; }
        public string content { get; set; }
        public int? classid { get; set; }
        public string classname { get; set; }
    }

    public class AnnouncementDto
    {
        public AnnouncementData data { get; set; }
    }

    public class MeData
    {
        public Guid districtid { get; set; }
        public int currentschoolyearid { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public int schoollocalid { get; set; }
        public int id { get; set; }
    }

    public class MeDto
    {
        public MeData data;
    }
}
/*
  "currentschoolyearid": 1,
  "schoollocalid": 1,
  "districtid": "21d87c28-4b03-44c7-81e4-7356e423c4c0",
  "birthdate": null,
  "salutation": null,
  "active": true,
  "id": 1195,
  "displayname": "Mr. Stein",
  "fullname": "Rocky Stein",
  "firstname": "Rocky",
  "lastname": "Stein",
  "gender": "M",
  "role": {
    "id": 2,
    "name": "Teacher",
    "description": "Teacher",
    "namelowered": "teacher"
  },
  "hasmedicalalert": false,
  "isallowedinetaccess": false,
  "specialinstructions": null,
  "spedstatus": null,
  "iswithdrawn": null
*/