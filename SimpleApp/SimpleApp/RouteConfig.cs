using System.Web.Mvc;
using System.Web.Routing;

namespace Wrapper
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "NewRout",
                "Wrapper/{*url}",
                new
                    {
                        controller = "Home",
                        action = "Index",
                    }
                
           );
            routes.MapRoute(
               
                name: "Default",
                url: "{controller}/{action}/{url}",
                defaults: new { controller = "Home", action = "Index", url = UrlParameter.Optional }
            );
        }
    }

}