using System.ComponentModel.DataAnnotations;

namespace MedicalHospAPI.Models
{
    public class Calibracao
    {
        [Key]
        public int id { get; set; }

        [Required]
        public int periodicidade { get; set; }

        [Required]
        public bool status { get; set; }

        [StringLength(255), Required]
        public string certificadoPdf { get; set; }
    }
}
