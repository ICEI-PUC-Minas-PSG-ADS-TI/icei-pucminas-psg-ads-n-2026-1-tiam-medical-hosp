using System.ComponentModel.DataAnnotations;

namespace MedicalHospAPI.Models
{
    public class Fornecedor
    {
        [Key]
        public int id { get; set; }

        [Required]
        [StringLength(200)]
        public string razaoSocial { get; set; }

        [Required]
        [StringLength(18)]
        public string cnpj { get; set; }

        [StringLength(255)]
        public string linkPortal { get; set; }

        [Required]
        [StringLength(100)]
        public string nomeFornecedor { get; set; }

        [Required]
        [StringLength(100)]
        public string responsavel { get; set; }

        public long telefone { get; set; }

        [Required]
        [StringLength(100)]
        public string email { get; set; }
    }
}