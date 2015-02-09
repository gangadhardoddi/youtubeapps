﻿using System.Configuration;

namespace ChalkableBaseAppLib
{
    public class ApplicationConfiguration : ConfigurationSection
    {
        [ConfigurationProperty("appSecret")]
        public string AppSecret
        {
            get { return (string)this["appSecret"]; }
        }

        [ConfigurationProperty("authUri")]
        public string AuthUri
        {
            get { return (string)this["authUri"]; }
        }

        [ConfigurationProperty("acsUri")]
        public string AcsUri
        {
            get { return (string)this["acsUri"]; }
        }

        [ConfigurationProperty("redirectUri")]
        public string RedirectUri
        {
            get { return (string)this["redirectUri"]; }
        }

        [ConfigurationProperty("applicationName")]
        public string ApplicationName
        {
            get { return (string)this["applicationName"]; }
        }

        [ConfigurationProperty("chalkableRoot")]
        public string ChalkableRoot
        {
            get { return (string)this["chalkableRoot"]; }
        }

        public string ApplicationRoot
        {
            get { return RedirectUri; }
        }
    }
}