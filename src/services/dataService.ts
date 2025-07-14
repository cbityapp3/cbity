import { supabase } from '../lib/supabase';
import type { School, User, Subject, Question, Exam, ExamAttempt, Result } from '../lib/supabase';
import { mockSchools, mockStudents, mockTeachers, mockSubjects, mockQuestions, mockExams, mockResults } from '../data/mockData';

class DataService {
  private useDatabase: boolean = false;

  setUseDatabase(value: boolean) {
    this.useDatabase = value;
  }

  // Schools
  async getSchools(): Promise<School[]> {
    if (!this.useDatabase) {
      return mockSchools.map(school => ({
        ...school,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
    }

    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async createSchool(school: Partial<School>): Promise<School> {
    if (!this.useDatabase) {
      throw new Error('Database mode required for creating schools');
    }

    const { data, error } = await supabase
      .from('schools')
      .insert([school])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Users
  async getUsers(role?: string, schoolId?: string): Promise<User[]> {
    if (!this.useDatabase) {
      let users = [...mockStudents, ...mockTeachers].map(user => ({
        ...user,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        school_id: '550e8400-e29b-41d4-a716-446655440001'
      }));

      if (role) {
        users = users.filter(user => user.role === role);
      }
      return users;
    }

    let query = supabase
      .from('users')
      .select(`
        *,
        school:schools(*)
      `)
      .order('created_at', { ascending: false });

    if (role) {
      query = query.eq('role', role);
    }

    if (schoolId) {
      query = query.eq('school_id', schoolId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }

  async createUser(user: Partial<User>): Promise<User> {
    if (!this.useDatabase) {
      throw new Error('Database mode required for creating users');
    }

    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Subjects
  async getSubjects(schoolId?: string): Promise<Subject[]> {
    if (!this.useDatabase) {
      return mockSubjects.map(subject => ({
        ...subject,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        school_id: '550e8400-e29b-41d4-a716-446655440001',
        questions_count: Math.floor(Math.random() * 100) + 50
      }));
    }

    let query = supabase
      .from('subjects')
      .select(`
        *,
        questions_count:questions(count)
      `)
      .order('created_at', { ascending: false });

    if (schoolId) {
      query = query.eq('school_id', schoolId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }

  async createSubject(subject: Partial<Subject>): Promise<Subject> {
    if (!this.useDatabase) {
      throw new Error('Database mode required for creating subjects');
    }

    const { data, error } = await supabase
      .from('subjects')
      .insert([subject])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Questions
  async getQuestions(subjectId?: string, schoolId?: string): Promise<Question[]> {
    if (!this.useDatabase) {
      let questions = mockQuestions.map(question => ({
        ...question,
        subject_id: '660e8400-e29b-41d4-a716-446655440001',
        school_id: '550e8400-e29b-41d4-a716-446655440001',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));

      if (subjectId) {
        questions = questions.filter(q => q.subject_id === subjectId);
      }
      return questions;
    }

    let query = supabase
      .from('questions')
      .select(`
        *,
        subject:subjects(*)
      `)
      .order('created_at', { ascending: false });

    if (subjectId) {
      query = query.eq('subject_id', subjectId);
    }

    if (schoolId) {
      query = query.eq('school_id', schoolId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }

  async createQuestion(question: Partial<Question>): Promise<Question> {
    if (!this.useDatabase) {
      throw new Error('Database mode required for creating questions');
    }

    const { data, error } = await supabase
      .from('questions')
      .insert([question])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Exams
  async getExams(schoolId?: string, studentId?: string): Promise<Exam[]> {
    if (!this.useDatabase) {
      return mockExams.map(exam => ({
        ...exam,
        subject_id: '660e8400-e29b-41d4-a716-446655440001',
        school_id: '550e8400-e29b-41d4-a716-446655440001',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
    }

    let query = supabase
      .from('exams')
      .select(`
        *,
        subject:subjects(*)
      `)
      .order('created_at', { ascending: false });

    if (schoolId) {
      query = query.eq('school_id', schoolId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }

  async getExamWithQuestions(examId: string): Promise<Exam | null> {
    if (!this.useDatabase) {
      const exam = mockExams.find(e => e.id === examId);
      if (!exam) return null;

      return {
        ...exam,
        subject_id: '660e8400-e29b-41d4-a716-446655440001',
        school_id: '550e8400-e29b-41d4-a716-446655440001',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        questions: mockQuestions.slice(0, 15).map(q => ({
          ...q,
          subject_id: '660e8400-e29b-41d4-a716-446655440001',
          school_id: '550e8400-e29b-41d4-a716-446655440001',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }))
      };
    }

    const { data, error } = await supabase
      .from('exams')
      .select(`
        *,
        subject:subjects(*),
        exam_questions(
          *,
          question:questions(*)
        )
      `)
      .eq('id', examId)
      .single();

    if (error) throw error;
    
    if (data) {
      // Transform the data to include questions array
      const questions = data.exam_questions?.map((eq: any) => eq.question) || [];
      return {
        ...data,
        questions
      };
    }

    return null;
  }

  async createExam(exam: Partial<Exam>): Promise<Exam> {
    if (!this.useDatabase) {
      throw new Error('Database mode required for creating exams');
    }

    const { data, error } = await supabase
      .from('exams')
      .insert([exam])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Exam Attempts
  async createExamAttempt(attempt: Partial<ExamAttempt>): Promise<ExamAttempt> {
    if (!this.useDatabase) {
      throw new Error('Database mode required for exam attempts');
    }

    const { data, error } = await supabase
      .from('exam_attempts')
      .insert([attempt])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateExamAttempt(attemptId: string, updates: Partial<ExamAttempt>): Promise<ExamAttempt> {
    if (!this.useDatabase) {
      throw new Error('Database mode required for exam attempts');
    }

    const { data, error } = await supabase
      .from('exam_attempts')
      .update(updates)
      .eq('id', attemptId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Results
  async getResults(studentId?: string, schoolId?: string): Promise<Result[]> {
    if (!this.useDatabase) {
      return mockResults.map(result => ({
        ...result,
        exam_id: 'exam_1',
        subject_id: '660e8400-e29b-41d4-a716-446655440001',
        school_id: '550e8400-e29b-41d4-a716-446655440001',
        attempt_id: 'attempt_1',
        created_at: new Date().toISOString()
      }));
    }

    let query = supabase
      .from('results')
      .select(`
        *,
        exam:exams(*),
        student:users(*),
        subject:subjects(*)
      `)
      .order('created_at', { ascending: false });

    if (studentId) {
      query = query.eq('student_id', studentId);
    }

    if (schoolId) {
      query = query.eq('school_id', schoolId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }

  async createResult(result: Partial<Result>): Promise<Result> {
    if (!this.useDatabase) {
      throw new Error('Database mode required for creating results');
    }

    const { data, error } = await supabase
      .from('results')
      .insert([result])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export const dataService = new DataService();