import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';
import { CoursePage } from '../../model/course-page';
import { CoursesListComponent } from '../../components/courses-list/courses-list.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    NgIf,
    CoursesListComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule,
    AsyncPipe
  ]
})
export class CoursesComponent implements OnInit {
  courses$: Observable<CoursePage> | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageIndex = 0;
  pageSize = 10;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh(pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 }): void {
    this.courses$ = this.coursesService
      .list(pageEvent.pageIndex, pageEvent.pageSize)
      .pipe(
        tap(() => {
          this.pageIndex = pageEvent.pageIndex;
          this.pageSize = pageEvent.pageSize;
        }),
        catchError(() => {
          this.onError('Erro ao carregar cursos.');
          return of({ courses: [], totalElements: 0 } as CoursePage);
        })
      );
  }

  onError(errorMsg: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course): void {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  }

  onView(course: Course): void {
    this.router.navigate(['view', course._id], { relativeTo: this.route });
  }

  onRemove(course: Course): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse curso?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.coursesService.remove(course._id).subscribe({
          next: () => {
            this.refresh();
            this.snackBar.open('Curso removido com sucesso!', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error: () => this.onError('Erro ao tentar remover curso.')
        });
      }
    });
  }
}
