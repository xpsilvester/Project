namespace TPLINK.Task.PPTService.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("PPTClass")]
    public partial class PPTClass
    {
        public PPTClass()
        {
            PPTItems = new List<PPTItem>();
        }

        [Key]
        public int id { get; set; }

        [Required]
        [StringLength(50)]
        public string className { get; set; }

        [Required]
        [StringLength(50)]
        public string classTip { get; set; }

        public short classLevel { get; set; }

        public bool isLastLevel { get; set; }

        public int parentClassId { get; set; }

        public virtual ICollection<PPTItem> PPTItems { get; set; }
    }
}
