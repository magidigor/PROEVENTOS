
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get ; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatorio."),
         //MinLength(3, ErrorMessage = "{0} deve ter no mínimo 4 caracteres."),
         //MaxLength(50, ErrorMessage = "{0} deve ter no máximo 50 caracteres.")]
         StringLength(50, MinimumLength = 3,ErrorMessage = "{0} deve ter mínimo de 4 e máximo de 50 caracteres.")]
        public string Tema { get; set; }

        [Display(Name = "Qtd Pessoas"),
        Range(1,120000, ErrorMessage = "{0} não pode ser menor que 1 e maior que 120000")]
        public int QtdPessoas { get; set; }

        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage = "Não é uma imagem válida. (gif, jpg, jpeg, bmp ou png)")]
        public string ImagemURL { get; set; }

        [Display(Name = "Telefone"),
        Required(ErrorMessage = "O campo {0} é obrigatorio"),
        Phone(ErrorMessage = "{0} está em um formato inválido")]
        public string Telefone { get; set; }  
        
        [Display(Name = "e-mail"),
        Required(ErrorMessage = "O campo {0} é obrigatorio"),
        EmailAddress(ErrorMessage = "É necessário ser um {0} válido")]
        public string Email { get; set; } 
        public IEnumerable<LoteDto> Lotes { get; set; }   
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; } 
        public IEnumerable<PalestranteDto> PalestrantesEventos { get; set; }         
    }
}