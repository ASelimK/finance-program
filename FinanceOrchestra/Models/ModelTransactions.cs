namespace FinanceOrchestra.Models
{
    public class ModelTransactions
    {
        public int TransactionId { get; set; }
        public int UserId { get; set; }
        public string? TransactionType { get; set; }
        public decimal TransactionAmount { get; set; }
        public DateTime TransactionDate { get; set; }
        public bool? IsActive { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
