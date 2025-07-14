/*
  # Seed Demo Data

  This migration populates the database with demo data for testing and presentation.
  It creates demo schools, users, subjects, questions, and exams.
*/

-- Insert demo schools
INSERT INTO schools (id, name, address, phone, email, logo, website, established, motto, subscription, status) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Lagos State Model College', 'Ikeja, Lagos State', '+234 802 123 4567', 'info@lagosmodel.edu.ng', 'https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', 'www.lagosmodel.edu.ng', '1956', 'Excellence in Education', 'Premium', 'active'),
('550e8400-e29b-41d4-a716-446655440002', 'Federal Government College Warri', 'Warri, Delta State', '+234 803 234 5678', 'admin@fgcwarri.edu.ng', 'https://images.pexels.com/photos/5905494/pexels-photo-5905494.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', 'www.fgcwarri.edu.ng', '1965', 'Knowledge and Character', 'Standard', 'active'),
('550e8400-e29b-41d4-a716-446655440003', 'Kings College Lagos', 'Lagos Island, Lagos State', '+234 804 345 6789', 'contact@kingscollegelagos.edu.ng', 'https://images.pexels.com/photos/5905375/pexels-photo-5905375.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2', 'www.kingscollegelagos.edu.ng', '1909', 'Regis Fidelis', 'Premium', 'active');

-- Insert demo subjects
INSERT INTO subjects (id, name, code, description, color, duration, difficulty, school_id, status) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'Mathematics', 'MTH', 'Core Mathematics for WAEC preparation', '#3B82F6', 180, 'Medium', '550e8400-e29b-41d4-a716-446655440001', 'active'),
('660e8400-e29b-41d4-a716-446655440002', 'English Language', 'ENG', 'English Language comprehension and writing', '#10B981', 180, 'Medium', '550e8400-e29b-41d4-a716-446655440001', 'active'),
('660e8400-e29b-41d4-a716-446655440003', 'Physics', 'PHY', 'Physics for science students', '#8B5CF6', 180, 'Hard', '550e8400-e29b-41d4-a716-446655440001', 'active'),
('660e8400-e29b-41d4-a716-446655440004', 'Chemistry', 'CHM', 'Chemistry for science students', '#EF4444', 180, 'Hard', '550e8400-e29b-41d4-a716-446655440001', 'active'),
('660e8400-e29b-41d4-a716-446655440005', 'Biology', 'BIO', 'Biology for science students', '#F59E0B', 180, 'Medium', '550e8400-e29b-41d4-a716-446655440001', 'active');

-- Insert demo questions for Mathematics
INSERT INTO questions (id, subject_id, school_id, question, type, options, correct_answer, explanation, difficulty, topic, marks, time_allocation, tags) VALUES
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'If 2x + 3 = 11, what is the value of x?', 'multiple_choice', '["A) 3", "B) 4", "C) 5", "D) 6"]', 'B) 4', 'Solving: 2x + 3 = 11, 2x = 8, x = 4', 'Easy', 'Algebra', 2, 2, '["algebra", "linear equations"]'),
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'What is the area of a circle with radius 7 cm? (Use π = 22/7)', 'multiple_choice', '["A) 154 cm²", "B) 144 cm²", "C) 164 cm²", "D) 174 cm²"]', 'A) 154 cm²', 'Area = πr² = (22/7) × 7² = (22/7) × 49 = 154 cm²', 'Medium', 'Geometry', 3, 3, '["geometry", "circle", "area"]'),
('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Solve for y: 3y - 7 = 2y + 5', 'multiple_choice', '["A) 10", "B) 12", "C) 14", "D) 16"]', 'B) 12', 'Solving: 3y - 7 = 2y + 5, 3y - 2y = 5 + 7, y = 12', 'Easy', 'Algebra', 2, 2, '["algebra", "linear equations"]'),
('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'What is the value of √144?', 'multiple_choice', '["A) 10", "B) 11", "C) 12", "D) 13"]', 'C) 12', 'The square root of 144 is 12 because 12² = 144', 'Easy', 'Numbers', 2, 1, '["square root", "numbers"]'),
('770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'If a triangle has angles 60°, 60°, and 60°, what type of triangle is it?', 'multiple_choice', '["A) Scalene", "B) Isosceles", "C) Equilateral", "D) Right-angled"]', 'C) Equilateral', 'A triangle with all angles equal (60°) is an equilateral triangle', 'Medium', 'Geometry', 2, 2, '["geometry", "triangles"]'),
('770e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'What is 15% of 200?', 'multiple_choice', '["A) 25", "B) 30", "C) 35", "D) 40"]', 'B) 30', '15% of 200 = (15/100) × 200 = 30', 'Easy', 'Percentage', 2, 2, '["percentage", "calculation"]'),
('770e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Simplify: 2³ × 2²', 'multiple_choice', '["A) 2⁵", "B) 2⁶", "C) 4⁵", "D) 4⁶"]', 'A) 2⁵', 'Using the law of indices: 2³ × 2² = 2^(3+2) = 2⁵', 'Medium', 'Indices', 3, 3, '["indices", "powers"]'),
('770e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'What is the perimeter of a rectangle with length 8 cm and width 5 cm?', 'multiple_choice', '["A) 24 cm", "B) 26 cm", "C) 28 cm", "D) 30 cm"]', 'B) 26 cm', 'Perimeter = 2(length + width) = 2(8 + 5) = 2(13) = 26 cm', 'Easy', 'Geometry', 2, 2, '["geometry", "perimeter", "rectangle"]'),
('770e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'If 5x = 25, what is x?', 'multiple_choice', '["A) 4", "B) 5", "C) 6", "D) 7"]', 'B) 5', 'Dividing both sides by 5: x = 25/5 = 5', 'Easy', 'Algebra', 1, 1, '["algebra", "simple equations"]'),
('770e8400-e29b-41d4-a716-446655440010', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'What is the sum of the first 5 natural numbers?', 'multiple_choice', '["A) 10", "B) 12", "C) 15", "D) 18"]', 'C) 15', '1 + 2 + 3 + 4 + 5 = 15', 'Easy', 'Numbers', 2, 2, '["numbers", "addition"]'),
('770e8400-e29b-41d4-a716-446655440011', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Convert 0.75 to a fraction in its simplest form.', 'multiple_choice', '["A) 3/4", "B) 7/10", "C) 15/20", "D) 75/100"]', 'A) 3/4', '0.75 = 75/100 = 3/4 (dividing by 25)', 'Medium', 'Fractions', 3, 3, '["fractions", "decimals"]'),
('770e8400-e29b-41d4-a716-446655440012', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'If the ratio of boys to girls in a class is 3:2 and there are 15 boys, how many girls are there?', 'multiple_choice', '["A) 8", "B) 10", "C) 12", "D) 14"]', 'B) 10', 'If boys:girls = 3:2 and boys = 15, then girls = (2/3) × 15 = 10', 'Medium', 'Ratio', 3, 3, '["ratio", "proportion"]'),
('770e8400-e29b-41d4-a716-446655440013', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'What is 25% of 80?', 'multiple_choice', '["A) 15", "B) 20", "C) 25", "D) 30"]', 'B) 20', '25% of 80 = (25/100) × 80 = 20', 'Easy', 'Percentage', 2, 2, '["percentage"]'),
('770e8400-e29b-41d4-a716-446655440014', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Solve: 4x - 8 = 12', 'multiple_choice', '["A) 3", "B) 4", "C) 5", "D) 6"]', 'C) 5', 'Solving: 4x - 8 = 12, 4x = 20, x = 5', 'Easy', 'Algebra', 2, 2, '["algebra", "linear equations"]'),
('770e8400-e29b-41d4-a716-446655440015', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'What is the volume of a cube with side length 3 cm?', 'multiple_choice', '["A) 9 cm³", "B) 18 cm³", "C) 27 cm³", "D) 36 cm³"]', 'C) 27 cm³', 'Volume of cube = side³ = 3³ = 27 cm³', 'Medium', 'Geometry', 3, 3, '["geometry", "volume", "cube"]');

-- Note: We'll create demo users through the application since they need to be created via Supabase Auth
-- The application will handle creating the corresponding user records in our users table