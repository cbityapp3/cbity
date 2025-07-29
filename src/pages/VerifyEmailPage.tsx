import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { BookOpen, CheckCircle, XCircle, Loader2 } from 'lucide-react';

const VerifyEmailPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      const type = searchParams.get('type');

      if (!token || type !== 'signup') {
        setStatus('error');
        setMessage('Invalid verification link.');
        return;
      }

      try {
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'signup'
        });

        if (error) {
          setStatus('error');
          setMessage(error.message);
          return;
        }

        if (data.user) {
          // Update user and school status to active
          await Promise.all([
            supabase
              .from('users')
              .update({ status: 'active' })
              .eq('id', data.user.id),
            supabase
              .from('schools')
              .update({ status: 'active' })
              .eq('owner_id', data.user.id)
          ]);

          setStatus('success');
          setMessage('Email verified successfully! You can now sign in to your account.');
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('An error occurred during verification. Please try again.');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-2xl p-8 text-center animate-fade-in">
          {/* Logo */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 font-poppins mb-4">
            Email Verification
          </h1>

          {status === 'loading' && (
            <div className="space-y-4">
              <Loader2 className="w-12 h-12 text-blue-600 mx-auto animate-spin" />
              <p className="text-gray-600">Verifying your email address...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
              <div className="space-y-2">
                <p className="text-green-600 font-semibold">Verification Successful!</p>
                <p className="text-gray-600">{message}</p>
                <p className="text-sm text-gray-500">Redirecting to login page...</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <XCircle className="w-12 h-12 text-red-600 mx-auto" />
              <div className="space-y-2">
                <p className="text-red-600 font-semibold">Verification Failed</p>
                <p className="text-gray-600">{message}</p>
              </div>
              <div className="space-y-2">
                <Link
                  to="/signup"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Signing Up Again
                </Link>
                <div>
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;