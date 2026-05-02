using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicalHospAPI.Models
{
    public enum ETipoAlteracao
    {
        Inclusao,
        Edicao,
        Exclusao,
        Desativacao
    }

    public class Alteracao
    {
        [Key]
        public int id { get; set; }

        [Required]
        public DateTime data { get; set; }

        [Required]
        public ETipoAlteracao tipoAlteracao { get; set; }

        [Required]
        public int autorId { get; set; }
        [ForeignKey("autorId")]
        public Usuarios autor { get; set; }

        public int? padraoId { get; set; }
        [ForeignKey("padraoId")]
        public Padroes padrao { get; set; }

        public int? calibracaoId { get; set; }
        [ForeignKey("calibracaoId")]
        public Calibracao calibracao { get; set; }

        public int? fornecedorId { get; set; }
        [ForeignKey("fornecedorId")]
        public Fornecedor fornecedor { get; set; }
    }
}