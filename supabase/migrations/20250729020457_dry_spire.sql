/*
  # Complete CBT System Database Schema

  1. New Tables
    - `schools` - School information with subdomain support
    - `users` - User profiles with role-based access
    - `subjects` - Subject definitions
    - `questions` - Question bank
    - `exams` - Exam definitions
    - `exam_questions` - Junction table for exam-question relationships
    - `exam_attempts` - Student exam attempts
    - `exam_answers` - Individual question answers
    - `results` - Final exam results

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies for role-based access
    - Ensure data isolation between schools

  3. Features
    - Multi-tenant architecture with subdomains
    - Complete user management system
    - Exam creation and management
    - Results tracking and analytics
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Schools table
CREATE TABLE IF NOT EXISTS schools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subdomain text UNIQUE NOT NULL,
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  address text,
  phone text,
  email text,
  logo text,
  website text,
  established text,
  motto text,
  subscription text NOT NULL DEFAULT 'starter',
  expiry_date timestamptz,
  status text NOT NULL DEFAULT 'pending_verification',
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('super_admin', 'school_admin', 'teacher', 'student')),
  school_id uuid REFERENCES schools(id) ON DELETE CASCADE,
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
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Subjects table
CREATE TABLE IF NOT EXISTS subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  code text NOT NULL,
  description text,
  color text NOT NULL DEFAULT '#3B82F6',
  duration integer NOT NULL DEFAULT 180,
  difficulty text NOT NULL DEFAULT 'Medium',
  school_id uuid REFERENCES schools(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  school_id uuid REFERENCES schools(id) ON DELETE CASCADE,
  question text NOT NULL,
  type text NOT NULL CHECK (type IN ('multiple_choice', 'essay', 'true_false', 'fill_blank')),
  options text[],
  correct_answer text,
  explanation text,
  difficulty text NOT NULL DEFAULT 'Medium',
  topic text,
  marks integer NOT NULL DEFAULT 1,
  time_allocation integer NOT NULL DEFAULT 2,
  tags text[],
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Exams table
CREATE TABLE IF NOT EXISTS exams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subject_id uuid NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  school_id uuid REFERENCES schools(id) ON DELETE CASCADE,
  class text,
  duration integer NOT NULL DEFAULT 180,
  total_questions integer NOT NULL DEFAULT 0,
  total_marks integer NOT NULL DEFAULT 0,
  exam_type text NOT NULL DEFAULT 'practice',
  scheduled_date date,
  scheduled_time time,
  status text NOT NULL DEFAULT 'draft',
  instructions text,
  passing_score integer NOT NULL DEFAULT 50,
  randomize_questions boolean DEFAULT true,
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
  exam_id uuid NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  question_order integer,
  marks integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  UNIQUE(exam_id, question_id)
);

-- Exam Attempts table
CREATE TABLE IF NOT EXISTS exam_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id uuid NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  started_at timestamptz DEFAULT now(),
  submitted_at timestamptz,
  time_spent integer DEFAULT 0,
  status text NOT NULL DEFAULT 'in_progress',
  score integer DEFAULT 0,
  percentage numeric(5,2) DEFAULT 0,
  grade text,
  questions_attempted integer DEFAULT 0,
  correct_answers integer DEFAULT 0,
  wrong_answers integer DEFAULT 0,
  flagged_questions integer[],
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Exam Answers table
CREATE TABLE IF NOT EXISTS exam_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid NOT NULL REFERENCES exam_attempts(id) ON DELETE CASCADE,
  question_id uuid NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  answer text,
  is_correct boolean DEFAULT false,
  time_spent integer DEFAULT 0,
  flagged boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(attempt_id, question_id)
);

-- Results table
CREATE TABLE IF NOT EXISTS results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid NOT NULL REFERENCES exam_attempts(id) ON DELETE CASCADE,
  exam_id uuid NOT NULL REFERENCES exams(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject_id uuid NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  school_id uuid REFERENCES schools(id) ON DELETE CASCADE,
  score integer NOT NULL,
  total_marks integer NOT NULL,
  percentage numeric(5,2) NOT NULL,
  grade text,
  time_spent integer NOT NULL,
  submitted_at timestamptz NOT NULL,
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

-- Schools policies
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

CREATE POLICY "School owners can manage their schools"
  ON schools FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "School members can view their school"
  ON schools FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid()
    )
  );

-- Users policies
CREATE POLICY "Super admins can manage all users"
  ON users FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users u
      WHERE u.id = auth.uid() 
      AND u.role = 'super_admin'
    )
  );

CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

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
    role = 'student' AND
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'teacher'
    )
  );

-- Subjects policies
CREATE POLICY "Super admins can manage all subjects"
  ON subjects FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

CREATE POLICY "School members can view subjects in their school"
  ON subjects FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid()
    ) OR school_id IS NULL
  );

CREATE POLICY "School admins can manage subjects in their school"
  ON subjects FOR ALL
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('school_admin', 'teacher')
    )
  );

-- Questions policies
CREATE POLICY "Super admins can manage all questions"
  ON questions FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

CREATE POLICY "School members can view questions in their school"
  ON questions FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid()
    ) OR school_id IS NULL
  );

CREATE POLICY "Teachers can manage questions in their school"
  ON questions FOR ALL
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('school_admin', 'teacher')
    )
  );

-- Exams policies
CREATE POLICY "Super admins can manage all exams"
  ON exams FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'super_admin'
    )
  );

CREATE POLICY "School members can view exams in their school"
  ON exams FOR SELECT
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid()
    ) OR school_id IS NULL
  );

CREATE POLICY "Teachers can manage exams in their school"
  ON exams FOR ALL
  TO authenticated
  USING (
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('school_admin', 'teacher')
    )
  );

-- Exam questions policies
CREATE POLICY "Users can view exam questions for accessible exams"
  ON exam_questions FOR SELECT
  TO authenticated
  USING (
    exam_id IN (
      SELECT id FROM exams 
      WHERE school_id IN (
        SELECT school_id FROM users 
        WHERE users.id = auth.uid()
      ) OR school_id IS NULL
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
  );

-- Exam attempts policies
CREATE POLICY "Students can manage their own attempts"
  ON exam_attempts FOR ALL
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
  );

-- Exam answers policies
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
  );

-- Results policies
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
  );

CREATE POLICY "Teachers can create results"
  ON results FOR INSERT
  TO authenticated
  WITH CHECK (
    school_id IN (
      SELECT school_id FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('school_admin', 'teacher')
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_schools_subdomain ON schools(subdomain);
CREATE INDEX IF NOT EXISTS idx_schools_owner_id ON schools(owner_id);
CREATE INDEX IF NOT EXISTS idx_users_school_id ON users(school_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_subjects_school_id ON subjects(school_id);
CREATE INDEX IF NOT EXISTS idx_questions_subject_id ON questions(subject_id);
CREATE INDEX IF NOT EXISTS idx_questions_school_id ON questions(school_id);
CREATE INDEX IF NOT EXISTS idx_exams_school_id ON exams(school_id);
CREATE INDEX IF NOT EXISTS idx_exams_subject_id ON exams(subject_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_student_id ON exam_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_exam_attempts_exam_id ON exam_attempts(exam_id);
CREATE INDEX IF NOT EXISTS idx_results_student_id ON results(student_id);
CREATE INDEX IF NOT EXISTS idx_results_school_id ON results(school_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_questions_updated_at BEFORE UPDATE ON questions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exams_updated_at BEFORE UPDATE ON exams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exam_attempts_updated_at BEFORE UPDATE ON exam_attempts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_exam_answers_updated_at BEFORE UPDATE ON exam_answers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();