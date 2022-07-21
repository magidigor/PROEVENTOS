using System.Threading.Tasks;
using ProEventos.Application.Dtos;
using ProEventos.Persistence.Models;

namespace ProEventos.Application.Contratos
{
    public interface IEventoService
    {
        Task<EventoDto> AddEventos(int userId, EventoDto model);
        Task<EventoDto> UpdateEvento(int userId, int eventoId, EventoDto model);
        Task<bool> DeleteEvento(int userId, int eventoId);

        Task<PageList<EventoDto>> GetAllEventosByAsync(int userId, PageParams pageParams, bool incluirPalestrantes = false);
        Task<EventoDto> GetEventoByIdAsync(int userId, int eventoId, bool incluirPalestrantes = false); 
        
    }
}