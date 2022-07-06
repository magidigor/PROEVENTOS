using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        public IEnumerable<Evento> _evento =  new Evento [] {
            new Evento () {
                EventoId = 1,
                Tema = "Angular 11 e .NET 5",
                Local = "Belo Horizonte",
                Lote = "1º Lote",
                QtdPessoas = 250,
                DataEvento = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy"),
                ImagemURL = "foto.png"
            },
            new Evento () {
                EventoId = 2,
                Tema = "Visual Studio 2019",
                Local = "Belo Horizonte",
                Lote = "1º Lote",
                QtdPessoas = 150,
                DataEvento = DateTime.Now.AddDays(10).ToString("dd/MM/yyyy"),
                ImagemURL = "foto2.png"
            }
        };

        public EventoController()
        {
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _evento;
        }

        [HttpGet("{id}")]
        public IEnumerable<Evento> GetById(int id)
        {
            return _evento.Where(Evento => Evento.EventoId == id);
        }

        [HttpPost]
        public string Post()
        {
            return "Post value";
        }
    }
}
