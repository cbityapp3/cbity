import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, ArrowLeft, Loader2, Check, AlertCircle } from 'lucide-react';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    schoolName: '',
    subdomain: '',
    plan: 'starter',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '₦50,000',
      period: 'per term',
      features: ['Up to 200 students', '5 subjects', 'Basic analytics', 'Email support']
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '₦120,000',
      period: 'per term',
      features: ['Up to 800 students', 'All subjects', 'Advanced analytics', 'Priority support'],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '₦250,000',
      period: 'per term',
      features: ['Unlimited students', 'All subjects', 'Full analytics suite', '24/7 support']
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.schoolName.trim()) newErrors.schoolName = 'School name is required';
    
    if (!formData.subdomain.trim()) {
      newErrors.subdomain = 'Domain is required';
    } else if (!/^[a-z0-9]+$/.test(formData.subdomain)) {
      newErrors.subdomain = 'Domain can only contain lowercase letters and numbers';
    } else if (formData.subdomain.length < 3) {
      newErrors.subdomain = 'Domain must be at least 3 characters';
    }
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const result = await signup(formData);
    
    if (result.success) {
      setMessageType('success');
      setMessage(result.message);
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        schoolName: '',
        subdomain: '',
        plan: 'starter',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
      });
    } else {
      setMessageType('error');
      setMessage(result.message);
    }
  };

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '');
    setFormData({ ...formData, subdomain: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Signup Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8 animate-fade-in">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 font-poppins">Create Your School Account</h1>
            <p className="text-gray-600 mt-2">Join thousands of schools using Cbity for WAEC preparation</p>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center ${
              messageType === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-700' 
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {messageType === 'success' ? (
                <Check className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              {message}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Name *
                </label>
                <input
                  type="text"
                  required
                  className={`input-field ${errors.schoolName ? 'border-red-500' : ''}`}
                  placeholder="Lagos Model College"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                />
                {errors.schoolName && <p className="text-red-500 text-sm mt-1">{errors.schoolName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Domain (School Name Without Space) *
              </label>
              <div className="flex items-center">
                <span className="text-gray-500 bg-gray-100 px-3 py-3 border border-r-0 border-gray-300 rounded-l-lg">
                  https://
                </span>
                <input
                  type="text"
                  required
                  className={`input-field rounded-l-none border-l-0 flex-1 ${errors.subdomain ? 'border-red-500' : ''}`}
                  placeholder="lagosmodel"
                  value={formData.subdomain}
                  onChange={handleSubdomainChange}
                />
                <span className="text-gray-500 bg-gray-100 px-3 py-3 border border-l-0 border-gray-300 rounded-r-lg">
                  .cbity.shop
                </span>
              </div>
              {errors.subdomain && <p className="text-red-500 text-sm mt-1">{errors.subdomain}</p>}
              {formData.subdomain && !errors.subdomain && (
                <p className="text-green-600 text-sm mt-1">
                  Your school will be accessible at: https://{formData.subdomain}.cbity.shop
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  className={`input-field ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  required
                  className={`input-field ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Select Plan *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.plan === plan.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${plan.popular ? 'ring-2 ring-blue-200' : ''}`}
                    onClick={() => setFormData({ ...formData, plan: plan.id })}
                  >
                    {plan.popular && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                          Popular
                        </span>
                      </div>
                    )}
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-blue-600">{plan.price}</span>
                        <span className="text-gray-600 text-sm">/{plan.period}</span>
                      </div>
                      <ul className="mt-3 space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="text-xs text-gray-600">{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      checked={formData.plan === plan.id}
                      onChange={() => setFormData({ ...formData, plan: plan.id })}
                      className="absolute top-2 right-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                className={`text-blue-600 rounded ${errors.agreeToTerms ? 'border-red-500' : ''}`}
              />
              <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
                I agree to our{' '}
                <Link to="/terms" className="text-blue-600 hover:text-blue-800">
                  terms and conditions
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;