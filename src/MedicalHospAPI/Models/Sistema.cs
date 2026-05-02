using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MedicalHospAPI.Models
{
    public class Sistema
    {
        [Key]
        public int id { get; set; }

        public List<Padroes> padroesDesativados { get; set; }
        public List<Alteracao> alteracoes { get; set; }
        public List<Fornecedor> fornecedores { get; set; }
        public List<Calibracao> listaNotificacoes { get; set; }
    }
}