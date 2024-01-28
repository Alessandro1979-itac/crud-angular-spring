import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { Course } from '../../model/course';
import { CategoryPipe } from '../../../shared/pipes/category.pipe';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, CategoryPipe]
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Output() details: EventEmitter<Course> = new EventEmitter(false);
  @Output() edit: EventEmitter<Course> = new EventEmitter(false);
  @Output() remove: EventEmitter<Course> = new EventEmitter(false);
  @Output() add: EventEmitter<boolean> = new EventEmitter(false);
  @Output() view: EventEmitter<Course> = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  onDetails(record: Course): void {
    this.details.emit(record);
  }

  onAdd(): void {
    this.add.emit(true);
  }

  onEdit(record: Course): void {
    this.edit.emit(record);
  }

  onRemove(record: Course): void {
    this.remove.emit(record);
  }

  onView(record: Course): void {
    this.view.emit(record);
  }
}
