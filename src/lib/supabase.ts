import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface School {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  logo?: string;
  website?: string;
  established?: string;
  motto?: string;
  subscription: string;
  expiry_date?: string;
  status: string;
  settings?: any;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'super_admin' | 'school_admin' | 'teacher' | 'student';
  school_id?: string;
  avatar?: string;
  phone?: string;
  address?: string;
  date_of_birth?: string;
  gender?: string;
  employee_id?: string;
  student_id?: string;
  class?: string;
  department?: string;
  qualification?: string;
  experience?: string;
  guardian_name?: string;
  guardian_phone?: string;
  subjects?: string[];
  classes_assigned?: string[];
  permissions?: string[];
  metadata?: any;
  status: string;
  created_at: string;
  updated_at: string;
  school?: School;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  color: string;
  duration: number;
  difficulty: string;
  school_id?: string;
  status: string;
  created_at: string;
  updated_at: string;
  questions_count?: number;
}

export interface Question {
  id: string;
  subject_id: string;
  school_id?: string;
  question: string;
  type: 'multiple_choice' | 'essay' | 'true_false' | 'fill_blank';
  options?: string[];
  correct_answer?: string;
  explanation?: string;
  difficulty: string;
  topic?: string;
  marks: number;
  time_allocation: number;
  tags?: string[];
  created_by?: string;
  created_at: string;
  updated_at: string;
  subject?: Subject;
}

export interface Exam {
  id: string;
  title: string;
  subject_id: string;
  school_id?: string;
  class?: string;
  duration: number;
  total_questions: number;
  total_marks: number;
  exam_type: string;
  scheduled_date?: string;
  scheduled_time?: string;
  status: string;
  instructions?: string;
  passing_score: number;
  randomize_questions: boolean;
  allow_review: boolean;
  auto_submit: boolean;
  created_by?: string;
  settings?: any;
  created_at: string;
  updated_at: string;
  subject?: Subject;
  questions?: Question[];
  students_registered?: number;
  students_completed?: number;
  average_score?: number;
}

export interface ExamAttempt {
  id: string;
  exam_id: string;
  student_id: string;
  started_at: string;
  submitted_at?: string;
  time_spent: number;
  status: string;
  score: number;
  percentage: number;
  grade?: string;
  questions_attempted: number;
  correct_answers: number;
  wrong_answers: number;
  flagged_questions: number[];
  metadata?: any;
  created_at: string;
  updated_at: string;
  exam?: Exam;
  student?: User;
}

export interface ExamAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  answer?: string;
  is_correct: boolean;
  time_spent: number;
  flagged: boolean;
  created_at: string;
  updated_at: string;
  question?: Question;
}

export interface Result {
  id: string;
  attempt_id: string;
  exam_id: string;
  student_id: string;
  subject_id: string;
  school_id?: string;
  score: number;
  total_marks: number;
  percentage: number;
  grade?: string;
  time_spent: number;
  submitted_at: string;
  remarks?: string;
  analytics?: any;
  created_at: string;
  exam?: Exam;
  student?: User;
  subject?: Subject;
}