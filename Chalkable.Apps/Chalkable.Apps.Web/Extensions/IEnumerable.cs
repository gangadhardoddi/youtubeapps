using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Chalkable.Apps.Web.Extensions {
    public static class IEnumerable {
        public static bool IsNullOrEmpty<T>(this IEnumerable<T> enumerable) {
            return enumerable == null || !enumerable.Any();
        }
    }
}