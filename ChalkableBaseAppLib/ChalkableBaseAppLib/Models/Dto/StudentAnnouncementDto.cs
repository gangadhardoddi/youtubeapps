using System.Collections.Generic;

namespace ChalkableBaseAppLib.Models.Dto
{

    public class StudentAnnouncementData
    {
        public string extracredits { get; set; }
        public int id { get; set; }
        public int announcementid { get; set; }
        public SchoolPersonData studentinfo { get; set; }
        public int? gradevalue { get; set; }
        public bool dropped { get; set; }
        public int number { get; set; }
        public string comment { get; set; }
    }

    public class StudentAnnouncementDto
    {
        public StudentAnnouncementData data { get; set; }
    }

    public class StudentAnnouncementsData
    {
        public IList<StudentAnnouncementData> items { get; set; }
    }
    public class StudentAnnouncementsDto
    {
        public StudentAnnouncementsData data { get; set; }
    }

}