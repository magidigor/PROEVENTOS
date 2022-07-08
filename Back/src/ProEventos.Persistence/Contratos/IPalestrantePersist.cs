using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface IPalestrantePersist
    {
        Task<Palestrante[]> GetAllPalestrantesByTemaAsync(string nome, bool incluirEventos = false);
        Task<Palestrante[]> GetAllPalestrantesByAsync(bool incluirEventos = false);
        Task<Palestrante> GetPalestranteByIdAsync(int palestranteId, bool incluirEventos = false);        
    }
}