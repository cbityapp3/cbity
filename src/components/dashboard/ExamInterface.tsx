import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  AlertTriangle,
  BookOpen,
  User
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  type: 'multiple_choice' | 'essay';
}

interface ExamData {
  id: string;
  title: string;
  subject: string;
  duration: number;
  questions: Question[];
  instructions: string;
}

const ExamInterface: React.FC = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

  // Mock exam data
  const examData: ExamData = {
    id: examId || '1',
    title: 'Mathematics Mock Exam 2024',
    subject: 'Mathematics',
    duration: 20, // 20 minutes for demo
    instructions: 'Answer all questions. Use of calculator is allowed. Read each question carefully before answering.',
    questions: [
      {
        id: '1',
        question: 'If 2x + 3 = 11, what is the value of x?',
        options: ['A) 3', 'B) 4', 'C) 5', 'D) 6'],
        correctAnswer: 'B) 4',
        type: 'multiple_choice'
      },
      {
        id: '2',
        question: 'What is the area of a circle with radius 7 cm? (Use π = 22/7)',
        options: ['A) 154 cm²', 'B) 144 cm²', 'C) 164 cm²', 'D) 174 cm²'],
        correctAnswer: 'A) 154 cm²',
        type: 'multiple_choice'
      },
      {
        id: '3',
        question: 'Solve for y: 3y - 7 = 2y + 5',
        options: ['A) 10', 'B) 12', 'C) 14', 'D) 16'],
        correctAnswer: 'B) 12',
        type: 'multiple_choice'
      },
      {
        id: '4',
        question: 'What is the value of √144?',
        options: ['A) 10', 'B) 11', 'C) 12', 'D) 13'],
        correctAnswer: 'C) 12',
        type: 'multiple_choice'
      },
      {
        id: '5',
        question: 'If a triangle has angles 60°, 60°, and 60°, what type of triangle is it?',
        options: ['A) Scalene', 'B) Isosceles', 'C) Equilateral', 'D) Right-angled'],
        correctAnswer: 'C) Equilateral',
        type: 'multiple_choice'
      },
      {
        id: '6',
        question: 'What is 15% of 200?',
        options: ['A) 25', 'B) 30', 'C) 35', 'D) 40'],
        correctAnswer: 'B) 30',
        type: 'multiple_choice'
      },
      {
        id: '7',
        question: 'Simplify: 2³ × 2²',
        options: ['A) 2⁵', 'B) 2⁶', 'C) 4⁵', 'D) 4⁶'],
        correctAnswer: 'A) 2⁵',
        type: 'multiple_choice'
      },
      {
        id: '8',
        question: 'What is the perimeter of a rectangle with length 8 cm and width 5 cm?',
        options: ['A) 24 cm', 'B) 26 cm', 'C) 28 cm', 'D) 30 cm'],
        correctAnswer: 'B) 26 cm',
        type: 'multiple_choice'
      },
      {
        id: '9',
        question: 'If 5x = 25, what is x?',
        options: ['A) 4', 'B) 5', 'C) 6', 'D) 7'],
        correctAnswer: 'B) 5',
        type: 'multiple_choice'
      },
      {
        id: '10',
        question: 'What is the sum of the first 5 natural numbers?',
        options: ['A) 10', 'B) 12', 'C) 15', 'D) 18'],
        correctAnswer: 'C) 15',
        type: 'multiple_choice'
      },
      {
        id: '11',
        question: 'Convert 0.75 to a fraction in its simplest form.',
        options: ['A) 3/4', 'B) 7/10', 'C) 15/20', 'D) 75/100'],
        correctAnswer: 'A) 3/4',
        type: 'multiple_choice'
      },
      {
        id: '12',
        question: 'If the ratio of boys to girls in a class is 3:2 and there are 15 boys, how many girls are there?',
        options: ['A) 8', 'B) 10', 'C) 12', 'D) 14'],
        correctAnswer: 'B) 10',
        type: 'multiple_choice'
      },
      {
        id: '13',
        question: 'What is 25% of 80?',
        options: ['A) 15', 'B) 20', 'C) 25', 'D) 30'],
        correctAnswer: 'B) 20',
        type: 'multiple_choice'
      },
      {
        id: '14',
        question: 'Solve: 4x - 8 = 12',
        options: ['A) 3', 'B) 4', 'C) 5', 'D) 6'],
        correctAnswer: 'C) 5',
        type: 'multiple_choice'
      },
      {
        id: '15',
        question: 'What is the volume of a cube with side length 3 cm?',
        options: ['A) 9 cm³', 'B) 18 cm³', 'C) 27 cm³', 'D) 36 cm³'],
        correctAnswer: 'C) 27 cm³',
        type: 'multiple_choice'
      }
    ]
  };

  useEffect(() => {
    if (examStarted) {
      setTimeLeft(examData.duration * 60); // Convert minutes to seconds
    }
  }, [examStarted, examData.duration]);

  useEffect(() => {
    if (timeLeft > 0 && examStarted && !showSubmitModal) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && examStarted) {
      handleSubmitExam();
    }
  }, [timeLeft, examStarted, showSubmitModal]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleFlagQuestion = () => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion)) {
        newSet.delete(currentQuestion);
      } else {
        newSet.add(currentQuestion);
      }
      return newSet;
    });
  };

  const handleSubmitExam = () => {
    if (!examStarted) return; // Prevent submission if exam hasn't started
    
    const score = examData.questions.reduce((total, question, index) => {
      return answers[index] === question.correctAnswer ? total + 1 : total;
    }, 0);

    const percentage = Math.round((score / examData.questions.length) * 100);
    
    // Navigate to results page with score
    navigate('/dashboard', { 
      state: { 
        showResults: true,
        examTitle: examData.title,
        score,
        totalQuestions: examData.questions.length,
        percentage,
        answers,
        questions: examData.questions
      }
    });
  };

  const getQuestionStatus = (index: number) => {
    if (index === currentQuestion) return 'current';
    if (flaggedQuestions.has(index)) return 'flagged';
    if (answers[index]) return 'answered';
    return 'unanswered';
  };

  const startExam = () => {
    console.log('Starting exam...'); // Debug log
    setExamStarted(true);
    setTimeLeft(examData.duration * 60); // Ensure timer is set when starting
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 mx-auto mb-4 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 font-poppins mb-2">{examData.title}</h1>
            <p className="text-gray-600">{examData.subject}</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-6 mb-8">
            <h2 className="font-semibold text-blue-900 mb-4">Exam Instructions</h2>
            <div className="space-y-2 text-blue-800">
              <p>• Duration: {examData.duration} minutes</p>
              <p>• Total Questions: {examData.questions.length}</p>
              <p>• {examData.instructions}</p>
              <p>• Once started, the timer cannot be paused</p>
              <p>• Your answers are automatically saved</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={startExam}
              className="btn-primary text-lg px-8 py-4"
            >
              Start Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="exam-interface">
      {/* Exam Header */}
      <div className="exam-header">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <div>
                <h1 className="font-semibold text-gray-900">{examData.title}</h1>
                <p className="text-sm text-gray-600">{examData.subject}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`exam-timer ${timeLeft <= 600 ? 'warning' : ''}`}>
              <Clock className="w-4 h-4 mr-2" />
              {formatTime(timeLeft)}
            </div>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="btn-success"
            >
              Submit Exam
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Question Navigation Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Questions</h3>
          <div className="question-nav">
            {examData.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`question-nav-item ${getQuestionStatus(index)}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-600"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 border border-green-300"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-300"></div>
              <span>Flagged</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-100 border border-gray-300"></div>
              <span>Unanswered</span>
            </div>
          </div>
        </div>

        {/* Main Question Area */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="question-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Question {currentQuestion + 1} of {examData.questions.length}
                </h2>
                <button
                  onClick={handleFlagQuestion}
                  className={`flex items-center space-x-2 px-3 py-2 transition-colors ${
                    flaggedQuestions.has(currentQuestion)
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                      : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-yellow-50'
                  }`}
                >
                  <Flag className="w-4 h-4" />
                  <span>{flaggedQuestions.has(currentQuestion) ? 'Unflag' : 'Flag'}</span>
                </button>
              </div>

              <div className="mb-8">
                <p className="text-lg text-gray-900 leading-relaxed">
                  {examData.questions[currentQuestion].question}
                </p>
              </div>

              <div className="space-y-3">
                {examData.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`option-button ${
                      answers[currentQuestion] === option ? 'selected' : ''
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="exam-controls">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  {Object.keys(answers).length} of {examData.questions.length} answered
                </span>
                {flaggedQuestions.size > 0 && (
                  <span className="text-sm text-yellow-600">
                    {flaggedQuestions.size} flagged
                  </span>
                )}
              </div>

              <button
                onClick={() => setCurrentQuestion(Math.min(examData.questions.length - 1, currentQuestion + 1))}
                disabled={currentQuestion === examData.questions.length - 1}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Exam?</h3>
              <p className="text-gray-600 mb-6">
                You have answered {Object.keys(answers).length} out of {examData.questions.length} questions.
                {examData.questions.length - Object.keys(answers).length > 0 && (
                  <span className="block text-red-600 mt-2">
                    {examData.questions.length - Object.keys(answers).length} questions remain unanswered.
                  </span>
                )}
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="btn-secondary"
                >
                  Continue Exam
                </button>
                <button
                  onClick={handleSubmitExam}
                  className="btn-success"
                >
                  Submit Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamInterface;