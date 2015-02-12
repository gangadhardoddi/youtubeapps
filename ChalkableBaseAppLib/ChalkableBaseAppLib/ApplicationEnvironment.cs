using System.Configuration;

namespace ChalkableBaseAppLib
{
    public class ApplicationEnvironment : ConfigurationSection
    {
        [ConfigurationProperty("env")]
        public string Environment
        {
            get { return (string)this["env"]; }
        }

        [ConfigurationProperty("appSecret")]
        public string AppSecret
        {
            get { return (string)this["appSecret"]; }
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

        [ConfigurationProperty("client_id")]
        public string ClientId
        {
            get { return (string)this["client_id"]; }
        }

        [ConfigurationProperty("scope")]
        public string Scope
        {
            get { return (string)this["scope"]; }
        }

        public string ApplicationRoot
        {
            get { return RedirectUri; }
        }
    }
}