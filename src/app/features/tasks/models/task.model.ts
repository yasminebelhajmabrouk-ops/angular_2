export interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string; // ISO date string
  completed: boolean;
  tags: string[];
}
