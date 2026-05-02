using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalHospAPI.Models
{
    public class Padroes
    {
        [Key]
        public int id { get; set; }

        [StringLength(255), Required]
        public string nome { get; set; }

        [StringLength(255), Required]
        public string modelo { get; set; }

        [StringLength(255), Required]
        public string tag { get; set; }

        [StringLength(255), Required]
        public string numSerie{ get; set; }

        [Required]
        public bool ativo { get; set; }

        [StringLength(255), Required]
        public string patrimonio { get; set; }

        [StringLength(255), Required]
        public string setor{ get; set; }

        [Required, ForeignKey("Calibracao")]
        public int ultimaCalibracaoId { get; set; }
        public Calibracao ultimaCalibracao { get; set; }
    }
}
