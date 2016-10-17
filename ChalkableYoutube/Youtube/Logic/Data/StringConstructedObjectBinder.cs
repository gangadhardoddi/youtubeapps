using System;
using System.Globalization;
using System.Web.Mvc;

namespace Youtube.Logic.Data
{
    public class StringConstructedObjectBinder<TResult> : IModelBinder
    {
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            try
            {
                string val = GetAttemptedValue(bindingContext);

                if (string.IsNullOrEmpty(val))
                {
                    return null;
                }
                return typeof (TResult).GetConstructor(new[] {typeof (string)}).Invoke(new object[] {val});
            }
            catch (Exception ex)
            {
                string message =
                    $"Unable to locate a valid value for query string parameter '{bindingContext.ModelName}'";
                throw new ApplicationException(message, ex);
            }
        }

        private static string GetAttemptedValue(ModelBindingContext bindingContext)
        {
            ValueProviderResult value = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
            return value == null ? string.Empty : value.AttemptedValue;
        }
    }

    public class DateTimeBinder : IModelBinder
    {
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            try
            {
                string val = GetAttemptedValue(bindingContext);
                if (string.IsNullOrEmpty(val))
                {
                    return null;
                }
                var res = DateTime.Parse(val, CultureInfo.InvariantCulture);
                return res;
            }
            catch (Exception ex)
            {
                string message = string.Format("Unable to locate a valid value for query string parameter '{0}'",
                                               bindingContext.ModelName);
                throw new ApplicationException(message, ex);
            }
        }

        private static string GetAttemptedValue(ModelBindingContext bindingContext)
        {
            ValueProviderResult value = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
            return value == null ? string.Empty : value.AttemptedValue;
        }
    }

}
