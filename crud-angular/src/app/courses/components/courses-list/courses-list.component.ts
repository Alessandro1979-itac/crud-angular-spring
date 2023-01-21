import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export default class CoursesListComponent {
  @Input() courses: Course[] = [];
  @Output() details: EventEmitter<Course> = new EventEmitter(false);
  @Output() edit: EventEmitter<Course> = new EventEmitter(false);
  @Output() remove: EventEmitter<Course> = new EventEmitter(false);
  @Output() add: EventEmitter<boolean> = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  onDetails(record: Course) {
    this.details.emit(record);
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(record: Course) {
    this.edit.emit(record);
  }

  onRemove(record: Course) {
    this.remove.emit(record);
  }
}
