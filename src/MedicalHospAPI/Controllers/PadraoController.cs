using System;
using Microsoft.AspNetCore.Mvc;
using MedicalHospAPI.DTOs;
using MedicalHospAPI.Models;
using MedicalHospAPI.Services;

namespace MedicalHospAPI.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class PadraoController : ControllerBase {
        private readonly IPadraoService _padraoService;
    
        public PadraoController(IPadraoService padraoService) {
            _padraoService = padraoService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPadroesAsync() {
            List<Padrao> padroes = await _padraoService.GetAllPadroesAsync();

            return Ok(padroes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPadraoByIdAsync(int id) {
            try {
                Padrao padrao = await _padraoService.GetPadraoByIdAsync(id);

                return Ok(padrao);
             } catch (Exception ex) {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddPadraoAsync(PadraoDTO novoPadrao) {
            Padrao padrao = await _padraoService.AddPadraoAsync(novoPadrao);

            return CreatedAtAction(nameof(GetPadraoByIdAsync), new { id = padrao.Id }, padrao);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePadraoAsync(int id, PadraoDTO padraoAtualizado) {
            try {
                Padrao padrao = await _padraoService.UpdatePadraoAsync(id, padraoAtualizado);
                return Ok(padrao);
            } catch (Exception ex) {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePadraoAsync(int id) {
            try {
                Padrao padrao = await _padraoService.DeletePadraoAsync(id);
                return Ok(padrao);
            } catch (Exception ex) {
                return NotFound(ex.Message);
            }
        }

    }
}