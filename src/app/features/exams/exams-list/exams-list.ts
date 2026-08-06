import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ChevronLeft, HelpCircle, Clock, ArrowRight, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { ExamItem } from './exams-list.model';

@Component({
  selector: 'app-exams-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ ChevronLeft, HelpCircle, Clock, ArrowRight }),
    },
  ],
  templateUrl: './exams-list.html',
})
export class ExamsListComponent {
  private router = inject(Router);

  exams: ExamItem[] = [
    {
      id: 'html-exam',
      title: 'HTML Exam',
      description:
        'Build the backbone of the web with HTML – the fundamental markup language behind every website and web application. Learn how to structure content with semantic elements, create accessible and SEO-friendly pages, work with forms and media, and lay the groundwork for styling and interactivity. Whether you\'re just starting out or solidifying your foundations, HTML is where every...',
      questionsCount: 25,
      durationMinutes: 20,
      iconType: 'html',
    },
    {
      id: 'css-exam',
      title: 'CSS Exam',
      description:
        'Unlock the power of Cascading Style Sheets and learn how to transform plain HTML into visually stunning web experiences. From selectors and the box model to Flexbox, Grid, animations, and responsive design – build a solid foundation in CSS and gain the skills to craft polished accessible, and mobile-friendly interfaces for the modern web.',
      questionsCount: 25,
      durationMinutes: 20,
      iconType: 'css',
      isStartActive: true,
    },
    {
      id: 'js-exam',
      title: 'JavaScript Exam',
      description:
        'Bring your web pages to life with JavaScript – the world\'s most widely used programming language and the engine behind modern web interactivity. From DOM manipulation and event handling to asynchronous programming, APIs, and ES6+ features, master the skills that power everything from simple animations to complex, data-driven web applications.',
      questionsCount: 25,
      durationMinutes: 20,
      iconType: 'js',
    },
    {
      id: 'react-exam',
      title: 'React Exam',
      description:
        'Dive into React, the industry-leading JavaScript library for building dynamic, component-based user interfaces. Learn how to think in components, manage state and props, harness the power of hooks, and connect to real-world APIs – all while following best practices used by top engineering teams at companies like Meta, Airbnb, and Netflix.',
      questionsCount: 25,
      durationMinutes: 20,
      iconType: 'react',
    },
    {
      id: 'angular-exam',
      title: 'Angular Exam',
      description:
        'Master Angular, Google\'s comprehensive and opinionated framework for building enterprise-grade web applications. Explore TypeScript-first development, two-way data binding, dependency injection, RxJS, and Angular\'s powerful CLI – and learn how to architect scalable, high-performance single-page applications that meet the demands of large teams and complex projects.',
      questionsCount: 25,
      durationMinutes: 20,
      iconType: 'angular',
    },
    {
      id: 'vue-exam',
      title: 'Vue Exam',
      description:
        'Discover Vue.js – the progressive JavaScript framework loved by developers for its simplicity, flexibility, and gentle learning curve. Learn how to build reactive, component-driven user interfaces with Vue\'s intuitive template syntax, powerful Composition API, and robust ecosystem including Vue Router and Pinia. Whether you\'re building a lightweight interactive widg...',
      questionsCount: 25,
      durationMinutes: 20,
      iconType: 'vue',
    },
  ];

  goBack() {
    this.router.navigate(['/diplomas']);
  }

  startExam(exam: ExamItem) {
    console.log('Start exam:', exam);
  }
}
