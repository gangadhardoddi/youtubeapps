using System.Configuration;

namespace ChalkableBaseAppLib
{
    public static class ChalkableConfig
    {
        public const string APPLICATION_CONFIG = "applicationconfig";
        public const string APPLICATION_INSTALL_ID = "applicationinstallid";
        public const string REMOTE_HOST_NAME = "remotehostname";

        public const string PAGE_MODE_PARAM = "mode";
        public const string EDIT_MODE = "edit";
        public const string VIEW_MODE ="view";
        public const string SUMMARY_MODE = "summaryview";
        public const string GRADE_VIEW = "gradingview";

        public const string STUDENT_ID_PARAM = "studentid";
        public const string ANNOUNCEMENT_APPLICATION_ID = "announcementapplicationid";
        public const string USER_TOKEN = "usertoken";

        
        public const string CALL_ID_PARAM = "callid";

        public const string TEACHER_ROLE_NAME = "teacher";
        public const string STUDENT_ROLE_NAME = "student";

        static ChalkableConfig()
        {
            configuration = ConfigurationManager.GetSection(APPLICATION_CONFIG) as ApplicationConfiguration;
        }

        private static ApplicationConfiguration configuration;
        public static ApplicationConfiguration Configuration
        {
            get { return configuration; }
        }
    }
}