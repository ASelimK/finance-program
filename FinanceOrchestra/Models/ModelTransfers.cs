namespace FinanceOrchestra.Models
{
    public class ModelTransfers
    {
        public int TransferId { get; set; }
        public int UserSender { get; set; }
        public int UserReceiver { get; set; }
        public bool? IsActive { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}
