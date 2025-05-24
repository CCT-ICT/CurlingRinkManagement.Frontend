export abstract class BasePaginationPageComponent {
  // Pagination properties
  public currentPage: number = 1;
  public pageSize: number = 3 * 6;
  public totalAmount: number = 0;

  abstract loadEntities(): void

  // Pagination methods

  getStartIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  getEndIndex(): number {
    const endIndex = this.currentPage * this.pageSize;
    return Math.min(endIndex, this.totalAmount);
  }
}
