using System;
using System.Linq;
using Youtube.Logic.Data;

namespace Youtube.Logic
{
    public class Storage
    {

        private readonly string connectionString;

        public Storage(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public string Get(Guid districtId, int announcementAppId)
        {
            using (var context = new DataModelDataContext(connectionString))
            {
                var res = context.AnnouncementAssignments.FirstOrDefault(
                    x => x.DistrictId == districtId && x.AnnouncementApplicationId == announcementAppId);
                return res?.YoutubeId;
            }
        }

        public void Set(Guid districtId, int announcementAppId, string value)
        {
            using (var context = new DataModelDataContext(connectionString))
            {
                var assignment = context.AnnouncementAssignments.FirstOrDefault(
                    x => x.AnnouncementApplicationId == announcementAppId && x.DistrictId == districtId);
                if (assignment == null)
                {
                    assignment = new AnnouncementAssignment
                    {
                        AnnouncementApplicationId = announcementAppId,
                        DistrictId = districtId
                    };
                    context.AnnouncementAssignments.InsertOnSubmit(assignment);
                }
                assignment.YoutubeId = value;
                context.SubmitChanges();
            }
        }
    }
}