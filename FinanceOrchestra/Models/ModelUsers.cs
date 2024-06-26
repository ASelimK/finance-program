namespace FinanceOrchestra.Models
{
    public class ModelUsers
    {
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public char? Gender { get; set; }
        public DateTime? BirthDate { get; set; }
        public decimal? TlBalance { get; set; }
        public decimal? GoldBalance { get; set; }
        public int? IBAN { get; set; }
        public bool IsActive { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }

    }
}
