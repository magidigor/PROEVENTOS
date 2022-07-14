using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProEventos.Domain
{
    //[Table("EventosDetalhes")]
    public class Evento
    {
        //[Key] *** indica chave primaria
        //[NotMapped] *** Indica que o campo não vai para o banco de dados
        //[ForeignKey] *** Indica chave estrangueira 
        //public int EnventoCodigo { get; set}
        public int Id { get; set; }
        public string Local { get; set; }
        public DateTime? DataEvento { get; set; }

        [Required]
        [MaxLength(50)]
        public string Tema { get; set; }
        public int QtdPessoas { get; set; }
        public string ImagemURL { get; set; }
        public string Telefone { get; set; }  
        public string Email { get; set; } 
        public IEnumerable<Lote> Lotes { get; set; }   
        public IEnumerable<RedeSocial> RedesSociais { get; set; } 
        public IEnumerable<PalestranteEvento> PalestrantesEventos { get; set; } 
        
    }
}