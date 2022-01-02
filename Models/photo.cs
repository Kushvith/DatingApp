using System.ComponentModel.DataAnnotations.Schema;

namespace Dating.Models
{
    [Table("Photos")]
    public class photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool Ismain { get; set; }
        public string PublicId { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}