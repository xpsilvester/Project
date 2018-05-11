namespace TPLINK.Task.PPTService.Model
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("PPTItem")]
    public partial class PPTItem
    {
        public int id { get; set; }

        public int classId { get; set; }

        [Required]
        [StringLength(255)]
        public string title { get; set; }

        [Required]
        [StringLength(40)]
        public string author { get; set; }

        public DateTime validDate { get; set; }

        [Required]
        [StringLength(200)]
        public string description { get; set; }

        [Required]
        [StringLength(50)]
        public string pptSrc { get; set; }

        [Required]
        [StringLength(60)]
        public string thumbnailSrc { get; set; }

        public bool visible { get; set; }

        public DateTime updateDate { get; set; }

        [Required]
        [StringLength(40)]
        public string updateUser { get; set; }

        public virtual PPTClass PPTClass { get; set; }
    }
}
