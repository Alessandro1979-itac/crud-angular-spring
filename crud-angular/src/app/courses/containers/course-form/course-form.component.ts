import { Location, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormArray,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { CoursesService } from '../../services/courses.service';
import { FormUtilsService } from '../../../shared/services/form-utils.service';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    NgFor
  ]
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ) {}

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];

    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [
        course.name,
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.retrieveLessons(course), Validators.required)
    });
  }

  private retrieveLessons(course: Course) {
    const lessons = [];

    if (course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }

    return lessons;
  }

  private createLesson(lesson: Lesson = { _id: '', name: '', youtubeUrl: '' }) {
    return this.formBuilder.group({
      _id: [lesson._id],
      name: [
        lesson.name,
        [Validators.required, Validators.minLength(5), Validators.maxLength(100)]
      ],
      youtubeUrl: [
        lesson.youtubeUrl,
        [Validators.required, Validators.minLength(10), Validators.maxLength(11)]
      ]
    });
  }

  getLessonFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  getErrorMessage(fieldName: string): string {
    return this.formUtils.getFieldErrorMessage(this.form, fieldName);
  }

  getLessonErrorMessage(fielName: string, index: number) {
    return this.formUtils.getFieldFormArrayErrorMessage(
      this.form,
      'lessons',
      fielName,
      index
    );
  }

  addLesson(): void {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson(index: number): void {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.service.save(this.form.value as Course).subscribe({
        next: () => this.onSuccess(),
        error: () => this.onError()
      });
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
  }

  onCancel(): void {
    this.location.back();
  }

  private onSuccess(): void {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 5000 });
    this.onCancel();
  }

  private onError(): void {
    this.dialog.open(ErrorDialogComponent, { data: 'Erro ao salvar curso.' });
  }
}
