import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CourseViewComponent } from './course-view.component';
import { coursesMock } from '../../services/courses.mock';

describe('CourseViewComponent', () => {
  let component: CourseViewComponent;
  let fixture: ComponentFixture<CourseViewComponent>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let activatedRouteMock: any;

  beforeEach(async () => {
    activatedRouteMock = {
      snapshot: {
        data: {
          course: coursesMock[0]
        }
      }
    };
    TestBed.configureTestingModule({
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteMock }],
      imports: [
        CourseViewComponent,
        NoopAnimationsModule,
        MatSidenavModule,
        MatButtonModule,
        MatListModule,
        YouTubePlayerModule
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
