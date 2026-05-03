using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalHospAPI.Models
{
    public class Usuario
    {
        [Key]
        public int id { get; set; }

        [Required]
        [StringLength(100)]
        public string nome { get; set; }

        [Required]
        [StringLength(100)]
        public string email { get; set; }

        [Required]
        [StringLength(100)]
        public string senha{ get; set; }

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public ETipoPerfil perfil{ get; set; }
    }
}
