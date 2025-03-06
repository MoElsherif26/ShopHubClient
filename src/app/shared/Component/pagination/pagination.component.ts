import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() totalCount!: number;
  @Input() pageSize!: number;
  @Output() pageChanged = new EventEmitter();

  onChangePage(event: any) {
    this.pageChanged.emit(event);
  }

}
