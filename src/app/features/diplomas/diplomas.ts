import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DiplomaCardComponent } from '../../../shared/components/ui/diploma-card/diploma-card';
import { Diploma } from '../../../shared/components/ui/diploma-card/diploma-card.model';
import { ChevronDown, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';

@Component({
  selector: 'app-diplomas',
  standalone: true,
  imports: [CommonModule, DiplomaCardComponent, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ ChevronDown }),
    },
  ],
  templateUrl: './diplomas.html',
})
export class DiplomasComponent {
  private router = inject(Router);

  diplomas: Diploma[] = [
    {
      id: 'flutter',
      title: 'Flutter Development',
      description: 'Discover Flutter, the game-changing framework that lets you build high-performance, cross-platform apps for mobile, web, and desktop from a single codebase.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      path: '/exams',
    },
    {
      id: 'ai-ml',
      title: 'AI & ML Development',
      description:
        'Explore the foundations and frontiers of Artificial Intelligence – from machine learning and neural networks to computer vision. Gain practical insight into how AI systems are built, trained, and deployed across industries, and understand the ethical implications shaping the future of intelligent technology.',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop',
      badge: 'A',
      path: '/exams',
    },
    {
      id: 'backend',
      title: 'Back-End Web Development',
      description: 'Become a professional Backend Developer. Master server-side programming, database architectures, microservices, and modern cloud deployment standards.',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      path: '/exams',
    },
    {
      id: 'data-analysis',
      title: 'Data Analysis',
      description: 'Become a professional Data Scientist. Learn advanced statistical techniques, data visualization, predictive analytics, and big data tools.',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop',
      path: '/exams',
    },
    {
      id: 'software-testing',
      title: 'Software Testing',
      description: 'Become a professional Software Tester. Gain hands-on expertise in automated QA, integration testing, performance metrics, and end-to-end security audits.',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
      path: '/exams',
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security',
      description: 'Become a professional Cyber Security Engineer. Protect critical software infrastructure, master ethical hacking, network defence, and threat prevention.',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
      path: '/exams',
    },
    {
      id: 'flutter',
      title: 'Flutter Development',
      description: 'Discover Flutter, the game-changing framework that lets you build high-performance, cross-platform apps for mobile, web, and desktop from a single codebase.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      path: '/exams',
    },
    {
      id: 'ai-ml',
      title: 'AI & ML Development',
      description:
        'Explore the foundations and frontiers of Artificial Intelligence – from machine learning and neural networks to computer vision. Gain practical insight into how AI systems are built, trained, and deployed across industries, and understand the ethical implications shaping the future of intelligent technology.',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop',
      badge: 'A',
      path: '/exams',
    },
    {
      id: 'backend',
      title: 'Back-End Web Development',
      description: 'Become a professional Backend Developer. Master server-side programming, database architectures, microservices, and modern cloud deployment standards.',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      path: '/exams',
    },
    {
      id: 'data-analysis',
      title: 'Data Analysis',
      description: 'Become a professional Data Scientist. Learn advanced statistical techniques, data visualization, predictive analytics, and big data tools.',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop',
      path: '/exams',
    },
    {
      id: 'software-testing',
      title: 'Software Testing',
      description: 'Become a professional Software Tester. Gain hands-on expertise in automated QA, integration testing, performance metrics, and end-to-end security audits.',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
      path: '/exams',
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security',
      description: 'Become a professional Cyber Security Engineer. Protect critical software infrastructure, master ethical hacking, network defence, and threat prevention.',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
      path: '/exams',
    },
    {
      id: 'flutter',
      title: 'Flutter Development',
      description: 'Discover Flutter, the game-changing framework that lets you build high-performance, cross-platform apps for mobile, web, and desktop from a single codebase.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      path: '/exams',
    },
    {
      id: 'ai-ml',
      title: 'AI & ML Development',
      description:
        'Explore the foundations and frontiers of Artificial Intelligence – from machine learning and neural networks to computer vision. Gain practical insight into how AI systems are built, trained, and deployed across industries, and understand the ethical implications shaping the future of intelligent technology.',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop',
      badge: 'A',
      path: '/exams',
    },
    {
      id: 'backend',
      title: 'Back-End Web Development',
      description: 'Become a professional Backend Developer. Master server-side programming, database architectures, microservices, and modern cloud deployment standards.',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      path: '/exams',
    },
    {
      id: 'data-analysis',
      title: 'Data Analysis',
      description: 'Become a professional Data Scientist. Learn advanced statistical techniques, data visualization, predictive analytics, and big data tools.',
      imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop',
      path: '/exams',
    },
    {
      id: 'software-testing',
      title: 'Software Testing',
      description: 'Become a professional Software Tester. Gain hands-on expertise in automated QA, integration testing, performance metrics, and end-to-end security audits.',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop',
      path: '/exams',
    },
    {
      id: 'cyber-security',
      title: 'Cyber Security',
      description: 'Become a professional Cyber Security Engineer. Protect critical software infrastructure, master ethical hacking, network defence, and threat prevention.',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop',
      path: '/exams',
    },
  ];

  onSelectDiploma(diploma: Diploma) {
    if (diploma.path) {
      this.router.navigate([diploma.path]);
    }
  }
}
