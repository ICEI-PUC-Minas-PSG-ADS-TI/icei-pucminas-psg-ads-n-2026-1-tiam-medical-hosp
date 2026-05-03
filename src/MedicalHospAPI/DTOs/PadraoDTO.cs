using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalHospAPI.DTOs
{
    public class PadraoDTO
    {
        [StringLength(255), Required]
        public string Nome { get; set; } = string.Empty;

        [StringLength(255), Required]
        public string Modelo { get; set; } = string.Empty;

        [StringLength(255), Required]
        public string Tag { get; set; } = string.Empty;

        [StringLength(255), Required]
        public string NumSerie { get; set; } = string.Empty;

        [StringLength(255), Required]
        public string Patrimonio { get; set; } = string.Empty;

        [StringLength(255), Required]
        public string Setor { get; set; } = string.Empty;
    }
}