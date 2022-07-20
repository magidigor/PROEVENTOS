using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProEventos.Domain;

namespace ProEventos.Persistence.Contratos
{
    public interface IEventoPersist
    {
        Task<Evento[]> GetAllEventosByAsync(int userId, bool incluirPalestrantes = false);
        Task<Evento[]> GetAllEventosByTemaAsync(int userId, string tema, bool incluirPalestrantes = false);
        Task<Evento> GetEventoByIdAsync(int userId, int eventoId, bool incluirPalestrantes = false);        
    }
}