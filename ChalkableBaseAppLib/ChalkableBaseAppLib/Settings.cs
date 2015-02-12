﻿using System.Configuration;
using System.Linq;

namespace ChalkableBaseAppLib
{
    public class Settings
    {
        public const string APPLICATION_CONFIG = "applicationconfigs";

        public const string SCHOOL_PERSON_ID_PARM = "schoolpersonid";
        public const string USER_TOKEN = "usertoken";
        public const string ANNOUNCEMENT_APPLICATION_ID = "announcementapplicationid";
        public const string ANNOUNCEMENT_OWNER_ID_PARAM = "announcementownerid";
        public const string APPLICATION_INSTALL_ID = "applicationinstallid";
        public const string REMOTE_HOST_NAME = "remotehostname";

        public const string USER_ROLE_PARAM = "userroleparam";
        public const string TEACHER_ROLE_NAME = "teacher";
        public const string STUDENT_ROLE_NAME = "student";


        public const string API_ROOT_PARAM = "apiRoot";
        public const string CODE_PARAM = "code";
        public const string ERROR_PARAM = "error";
        public const string PAGE_MODE_PARAM = "mode";
        public const string EDIT_MODE = "edit";
        public const string VIEW_MODE = "view";
        public const string MY_VIEW_MODE = "myview";
        public const string SUMMARY_VIEW_MODE = "summaryview";
        public const string GRADING_VIEW_MODE = "gradingview";

        public const string CALL_ID_PARAM = "callid";

        public const string STANDARD_NAME_PARAM = "standardName";
        public const string STANDARD_ID_PARAM = "standardId";
        public const string CC_STANDARD_CODE_PARAM = "ccStandardCode";

        public const string STUDENT_ID_PARAM = "studentId";

        public static ApplicationEnvironment GetConfiguration(string environment)
        {
            var items = (ConfigurationManager.GetSection(APPLICATION_CONFIG) as ApplicationConfigurations).Environments;

            for (var i = 0; i < items.Count; ++i)
            {
                if (items[i].Environment == environment)
                    return items[i];
            }

            return null;
        }
    }
}