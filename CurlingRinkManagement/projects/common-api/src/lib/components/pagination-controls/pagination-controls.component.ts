import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'lib-pagination-controls',
  imports: [],
  templateUrl: './pagination-controls.component.html',
  styleUrl: './pagination-controls.component.css'
})
export class PaginationControlsComponent {
  @Input()
  public currentPage: number = 1;
  @Input()
  public pageSize: number = 3 * 6;
  @Input()
  public totalAmount: number = 0;

  @Output()
  public currentPageChange: EventEmitter<number> = new EventEmitter();

  

  getTotalPages(): number {
    return Math.ceil(this.totalAmount / this.pageSize);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.currentPageChange.emit(page);
    }
  }

  onPageSizeChange(): void {
    this.currentPage = 1; // Reset to first page when changing page size
  }

  getVisiblePages(): number[] {
    const totalPages = this.getTotalPages();
    const current = this.currentPage;
    const pages: number[] = [];

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      const start = Math.max(1, current - 2);
      const end = Math.min(totalPages, current + 2);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  }
}
