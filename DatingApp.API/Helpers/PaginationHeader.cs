namespace DatingApp.API.Helpers
{
    public class PaginationHeader
    {
        public int CrunnetPage { get; set; }
        public int ItemsPerPage { get; set; }
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
        public PaginationHeader(int crunnetPage, int itemsPerPage, int totalItems, int totalPages)
        {
            this.CrunnetPage = crunnetPage;
            this.TotalItems = totalItems;
            this.TotalPages = totalPages;
            this.ItemsPerPage = itemsPerPage;
        }
    }
}