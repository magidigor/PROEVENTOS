using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface ILotePersist
    {

        /// <summary>
        /// Método get que retornará uma lista de lotes do Evento
        /// </summary>
        /// <param name="eventoId">Código chave da tabela Evento</param>
        /// <returns>Lista de lotes</returns>
        Task<Lote[]> GetLotesByEventoByIdAsync(int eventoId);

        /// <summary>
        /// Método get que retornará apenas 1 lote
        /// </summary>
        /// <param name="eventoId">Código chave da tabela Evento</param>
        /// <param name="id">Código chave da tabela Lote</param>
        /// <returns>Apenas um listo</returns>
        Task<Lote> GetLoteByIdsAsync(int eventoId, int id);        
    }
}