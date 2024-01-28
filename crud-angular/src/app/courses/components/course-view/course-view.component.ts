import { NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NO_ERRORS_SCHEMA,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrl: './course-view.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    YouTubePlayerModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CourseViewComponent implements OnInit, AfterViewInit {
  course!: Course;
  selectedLesson!: Lesson;
  videoHight!: number;
  videoWidth!: number;

  @ViewChild('youTubePlayer') youTubePlayer!: ElementRef<HTMLDivElement>;

  constructor(
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.course = this.route.snapshot.data['course'];
    if (this.course.lessons) {
      this.selectedLesson = this.course.lessons[0];
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener('resize', this.onResize.bind(this));
  }
  onResize(): void {
    this.videoWidth = this.youTubePlayer.nativeElement.clientWidth * 0.9;
    this.videoHight = this.videoWidth * 0.6;
    this.changeDetectorRef.detectChanges();
  }

  display(lesson: Lesson): void {
    this.selectedLesson = lesson;
  }

  displaySelectedLesson(lesson: Lesson) {
    return this.selectedLesson === lesson;
  }
}
