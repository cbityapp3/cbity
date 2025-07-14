/*
  # Initial CBT System Schema

  1. New Tables
    - `schools` - School information and settings
    - `users` - All users (admins, teachers, students) with role-based access
    - `subjects` - Subject definitions
    - `questions` - Question bank with metadata
    - `exams` - Exam configurations and schedules
    - `exam_questions` - Junction table for exam-question relationships
    - `exam_attempts` - Student exam attempts and submissions
    - `exam_answers` - Individual question answers within attempts
    - `results` - Calculated exam results and analytics

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Ensure users can only access their own data or data they're authorized to see

  3. Authentication
    - Uses Supabase Auth with email/password
    - Custom user metadata for roles and school associations
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Schools table
CREATE TABLE IF NOT EXISTS schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text,
  phone text,
  email text,
  logo text,
  website text,
  established text,
  motto text,
  subscription text DEFAULT 'Basic',
  expiry_date date,
  status text DEFAULT 'active',
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('super_admin', 'school_admin', 'teacher', 'student')),
  school_id uuid REFERENCES schools(id),
  avatar text,
  phone text,
  address text,
  date_of_birth date,
  gender text,
  employee_id text,
  student_id text,
  class text,
  department text,
  qualification text,
  experience text,
  guardian_name text,
  guardian_phone text,
  subjects text[],
  classes_assigned text[],
  permissions text[],
  metadata jsonb DEFAULT '{}',
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL,
  description text,
  color text DEFAULT '#3B82F6',
  duration integer DEFAULT 180,
  difficulty text DEFAULT 'Medium',
  school_id uuid REFERENCES schools(id),
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES subjects(id) ON DELETE CASCADE,
  school_id uuid REFERENCES schools(id),
  question text NOT NULL,
  type text DEFAULT 'multiple_choice' CHECK (type IN ('multiple_choice', 'essay', 'true_false', 'fill_blank')),
  options jsonb,
  correct_answer text,
  explanation text,
  difficulty text DEFAULT 'Medium',
  topic text,
  marks integer DEFAULT 1,
  time_allocation integer DEFAULT 2,
  tags text[],
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Exams table
CREATE TABLE IF NOT EXISTS exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject_id uuid REFERENCES subjects(id),
  school_id uuid REFERENCES schools(id),
  class text,
  duration integer DEFAULT 180,
  total_questions integer DEFAULT 0,
  total_marks integer DEFAULT 0,
  exam_type text DEFAULT 'practice',
  scheduled_date date,
  scheduled_time time,
  status text DEFAULT 'draft',
  instructions text,
  passing_score integer DEFAULT 50,
  randomize_questions boolean DEFAULT false,
  allow_review boolean DEFAULT true,
  auto_submit boolean DEFAULT true,
  created_by uuid REFERENCES users(id),
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Exam Questions junction table
CREATE TABLE IF NOT EXISTS exam_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid REFERENCES exams(id) ON DELETE CASCADE,
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  question_order integer,
  marks integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- Exam Attempts table
CREATE TABLE IF NOT EXISTS exam_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid REFERENCES exams(id),
  student_id uuid REFERENCES users(id),
  started_at timestamptz DEFAULT now(),
  submitted_at timestamptz,
  time_spent integer DEFAULT 0,
  status text DEFAULT 'in_progress',
  score integer DEFAULT 0,
  percentage numeric DEFAULT 0,
  grade text,
  questions_attempted integer DEFAULT 0,
  correct_answers integer DEFAULT 0,
  wrong_answers integer DEFAULT 0,
  flagged_questions integer[] DEFAULT '{}',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Exam Answers table
CREATE TABLE IF NOT EXISTS exam_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid REFERENCES exam_attempts(id) ON DELETE CASCADE,
  question_id uuid REFERENCES questions(id),
  answer text,
  is_correct boolean DEFAULT false,
  time_spent integer DEFAULT 0,
  flagged boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Results table (for analytics and reporting)
CREATE TABLE IF NOT EXISTS results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid REFERENCES exam_attempts(id),
  exam_id uuid REFERENCES exams(id),
  student_id uuid REFERENCES users(id),
  subject_id uuid REFERENCES subjects(id),
  school_id uuid REFERENCES schools(id),
  score integer,
  total_marks integer,
  percentage numeric,
  grade text,
  time_spent integer,
  submitted_at timestamptz,
  remarks text,
  analytics jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Schools
CREATE POLICY "Super admins can manage all schools"
  ON schools FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

CREATE POLICY "School admins can view their school"
  ON schools FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid()
    )
  );

-- RLS Policies for Users
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Super admins can manage all users"
  ON users FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

CREATE POLICY "School admins can manage users in their school"
  ON users FOR ALL
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'school_admin'
    )
  );

CREATE POLICY "Teachers can view students in their school"
  ON users FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'teacher'
    )
    AND role = 'student'
  );

-- RLS Policies for Subjects
CREATE POLICY "Users can view subjects in their school"
  ON subjects FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

CREATE POLICY "Admins and teachers can manage subjects"
  ON subjects FOR ALL
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('school_admin', 'teacher')
    )
    OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

-- RLS Policies for Questions
CREATE POLICY "Users can view questions in their school"
  ON questions FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

CREATE POLICY "Teachers can manage questions"
  ON questions FOR ALL
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('school_admin', 'teacher')
    )
    OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

-- RLS Policies for Exams
CREATE POLICY "Users can view exams in their school"
  ON exams FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid()
    )
    OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

CREATE POLICY "Teachers can manage exams"
  ON exams FOR ALL
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('school_admin', 'teacher')
    )
    OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

-- RLS Policies for Exam Questions
CREATE POLICY "Users can view exam questions for accessible exams"
  ON exam_questions FOR SELECT
  TO authenticated
  USING (
    exam_id IN (
      SELECT id FROM exams 
      WHERE school_id IN (
        SELECT school_id FROM users 
        WHERE users.id = auth.uid()
      )
    )
    OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

CREATE POLICY "Teachers can manage exam questions"
  ON exam_questions FOR ALL
  TO authenticated
  USING (
    exam_id IN (
      SELECT id FROM exams 
      WHERE school_id IN (
        SELECT school_id FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('school_admin', 'teacher')
      )
    )
    OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

-- RLS Policies for Exam Attempts
CREATE POLICY "Students can view their own attempts"
  ON exam_attempts FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Students can create their own attempts"
  ON exam_attempts FOR INSERT
  TO authenticated
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update their own attempts"
  ON exam_attempts FOR UPDATE
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Teachers can view attempts in their school"
  ON exam_attempts FOR SELECT
  TO authenticated
  USING (
    exam_id IN (
      SELECT id FROM exams 
      WHERE school_id IN (
        SELECT school_id FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('school_admin', 'teacher')
      )
    )
    OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

-- RLS Policies for Exam Answers
CREATE POLICY "Students can manage their own answers"
  ON exam_answers FOR ALL
  TO authenticated
  USING (
    attempt_id IN (
      SELECT id FROM exam_attempts 
      WHERE student_id = auth.uid()
    )
  );

CREATE POLICY "Teachers can view answers in their school"
  ON exam_answers FOR SELECT
  TO authenticated
  USING (
    attempt_id IN (
      SELECT ea.id FROM exam_attempts ea
      JOIN exams e ON ea.exam_id = e.id
      WHERE e.school_id IN (
        SELECT school_id FROM users 
        WHERE users.id = auth.uid() 
        AND users.role IN ('school_admin', 'teacher')
      )
    )
    OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

-- RLS Policies for Results
CREATE POLICY "Students can view their own results"
  ON results FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Teachers can view results in their school"
  ON results FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('school_admin', 'teacher')
    )
    OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

CREATE POLICY "System can create results"
  ON results FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_school_id ON users(school_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_subjects_school_id ON subjects(school_id);
CREATE INDEX IF NOT EXISTS idx_questions_subject_id ON questions(subject_id);
CREATE INDEX IF NOT EXISTS idx_questions_school_id ON questions(school_id);
CREATE INDEX IF NOT EXISTS idx_exams_school_id ON exams(school_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_student_id ON exam_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_exam_id ON exam_attempts(exam_id);
CREATE INDEX IF NOT EXISTS idx_exam_answers_attempt_id ON exam_answers(attempt_id);
CREATE INDEX IF NOT EXISTS idx_results_student_id ON results(student_id);
CREATE INDEX IF NOT EXISTS idx_results_school_id ON results(school_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exams_updated_at BEFORE UPDATE ON exams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exam_attempts_updated_at BEFORE UPDATE ON exam_attempts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exam_answers_updated_at BEFORE UPDATE ON exam_answers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();