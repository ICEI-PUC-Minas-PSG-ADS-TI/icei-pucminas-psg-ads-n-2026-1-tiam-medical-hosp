using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MedicalHospAPI.DTOs;
using MedicalHospAPI.Models;

namespace MedicalHospAPI.Services {
    public class PadraoService : IPadraoService {
        private readonly PadraoRepository _padraoRepository;
    
        public PadraoService(PadraoRepository padraoRepository) {
            _padraoRepository = padraoRepository;
        }

        public async Task<List<Padrao>> GetAllPadroesAsync() {
            return await _padraoRepository.Padrao.ToListAsync();
        }

        public async Task<Padrao> GetPadraoByIdAsync(int id) {
            Padrao padrao = await _padraoRepository.Padrao.FindAsync(id);
            
            if (padrao == null) {
                throw new KeyNotFoundException("Padrão não encontrado.");
            }

            return padrao;
        }

        public async Task<Padrao> AddPadraoAsync(PadraoDTO novoPadrao) {
            Padrao padrao = new Padrao();
            padrao.Nome = novoPadrao.Nome;
            padrao.Modelo = novoPadrao.Modelo;
            padrao.Tag = novoPadrao.Tag;
            padrao.NumSerie = novoPadrao.NumSerie;
            padrao.Patrimonio = novoPadrao.Patrimonio;
            padrao.Setor = novoPadrao.Setor;
            padrao.Ativo = true;

            _padraoRepository.Padrao.Add(padrao);
            await _padraoRepository.SaveChangesAsync();
            return padrao;
        }

        public async Task<Padrao> UpdatePadraoAsync(int id, PadraoDTO padraoAtualizado) {
            Padrao padrao = await _padraoRepository.Padrao.FindAsync(id);
            if (padrao == null) {
                throw new KeyNotFoundException("Padrão não encontrado.");
            }

            padrao.Nome = padraoAtualizado.Nome;
            padrao.Modelo = padraoAtualizado.Modelo;
            padrao.Tag = padraoAtualizado.Tag;
            padrao.NumSerie = padraoAtualizado.NumSerie;
            padrao.Patrimonio = padraoAtualizado.Patrimonio;
            padrao.Setor = padraoAtualizado.Setor;

            await _padraoRepository.SaveChangesAsync();
            return padrao;
        }

        public async Task<Padrao> DeletePadraoAsync(int id) {
            Padrao padrao = await _padraoRepository.Padrao.FindAsync(id);
            if (padrao == null) {
                throw new KeyNotFoundException("Padrão não encontrado.");
            }

            _padraoRepository.Padrao.Remove(padrao);
            await _padraoRepository.SaveChangesAsync();
            return padrao;
        }
    
    }
}