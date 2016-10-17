using System.Configuration;

namespace ChalkableBaseAppLib
{
    public class ApplicationConfigurations : ConfigurationSection
    {
        [ConfigurationProperty("environments")]
        public ApplicationEnvironments Environments
        {
            get { return base["environments"] as ApplicationEnvironments; }
        }
    }
}