using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Chalkable.Apps.Entities.Models {

    public class SimpleApplication {

        public SearchOption DefaultSearchOption { get; set; }

        public int Id { get; set; }

        [Index(IsUnique = true)]
        [MaxLength(50)]
        public string Name { get; set; }

        public string Url { get; set; }

    }

}
