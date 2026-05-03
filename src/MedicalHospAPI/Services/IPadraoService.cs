using System;

namespace MedicalHospAPI.Services {
    public interface IPadraoService {
        Task<List<Padrao>> GetAllPadroesAsync();
        Task<Padrao> GetPadraoByIdAsync(int id);
        Task<Padrao> AddPadraoAsync(PadraoDTO padrao);
        Task<Padrao> UpdatePadraoAsync(int id, PadraoDTO padrao);
        Task<Padrao> DeletePadraoAsync(int id);
    }
}