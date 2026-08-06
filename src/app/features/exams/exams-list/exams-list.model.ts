export interface ExamItem {
  id: string;
  title: string;
  description: string;
  questionsCount: number;
  durationMinutes: number;
  iconType: 'html' | 'css' | 'js' | 'react' | 'angular' | 'vue';
  isStartActive?: boolean;
}
