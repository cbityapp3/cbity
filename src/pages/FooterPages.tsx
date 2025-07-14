import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Zap, Users, BookOpen, Phone, Mail, CheckCircle, Globe, Lock, Database, Cloud, Smartphone, Code, Headphones, MessageCircle, FileText, Video, GraduationCap, Award, Activity, BarChart3, Star } from 'lucide-react';

interface FooterPagesProps {
  page: string;
}

const FooterPages: React.FC<FooterPagesProps> = ({ page }) => {
  const renderContent = () => {
    switch (page) {
      case 'about':
        return (
          <div className="min-h-screen bg-gray-50">
            {/* Hero Header */}
            <section className="hero-section py-20 text-white relative overflow-hidden">
              <div className="floating-elements">
                <div className="floating-element">
                  <BookOpen className="w-12 h-12 text-white" />
                </div>
                <div className="floating-element">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <div className="floating-element">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="floating-element">
                  <Users className="w-14 h-14 text-white" />
                </div>
              </div>
              
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                  <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6 animate-fade-in">
                    About Cbity
                  </h1>
                  <p className="text-xl md:text-2xl font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    Leading the Computer-Based Testing Revolution in Nigerian Schools....
                  </p>
                </div>
              </div>
            </section>

            {/* Our Story */}
            <section className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="animate-slide-up">
                    <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-6">Our Story</h2>
                    <div className="space-y-4 text-lg text-gray-700">
                      <p className="flex items-start space-x-3">
                        <span className="text-2xl">✍️</span>
                        <span><strong>Before now, only UTME used CBT.</strong></span>
                      </p>
                      <p className="flex items-start space-x-3">
                        <span className="text-2xl">🏫</span>
                        <span><em>Today, private schools are gradually adopting CBT.</em></span>
                      </p>
                      <p className="flex items-start space-x-3">
                        <span className="text-2xl">🎯</span>
                        <span><em>With WAEC's recent move toward full CBT, it's time to lead the charge.</em></span>
                      </p>
                      <p className="flex items-start space-x-3">
                        <span className="text-2xl">💡</span>
                        <span><em>Cbity was born from the School Owners Forum—Nigeria's largest school leadership network—to help schools automate testing and prepare confidently for WAEC 2026.</em></span>
                      </p>
                    </div>
                  </div>
                  <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white text-center">
                      <Globe className="w-24 h-24 mx-auto mb-6 animate-pulse-slow" />
                      <h3 className="text-2xl font-bold mb-4">Digital Learning Revolution</h3>
                      <p className="text-lg">Transforming education through technology</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Infographics */}
            <section className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">CBT Adoption Momentum</h2>
                  <p className="text-xl text-gray-600">Leading the digital transformation in Nigerian education</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                  <div className="text-center animate-bounce-in">
                    <div className="text-4xl font-bold text-yellow-500 mb-2">7,000+</div>
                    <div className="text-gray-700 font-medium">CBT-ready WAEC-standard questions</div>
                  </div>
                  <div className="text-center animate-bounce-in" style={{ animationDelay: '0.1s' }}>
                    <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
                    <div className="text-gray-700 font-medium">Schools onboarded</div>
                  </div>
                  <div className="text-center animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                    <div className="text-4xl font-bold text-green-600 mb-2">&lt;3</div>
                    <div className="text-gray-700 font-medium">Minutes to set up first test</div>
                  </div>
                  <div className="text-center animate-bounce-in" style={{ animationDelay: '0.3s' }}>
                    <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
                    <div className="text-gray-700 font-medium">Uptime + top-tier security</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div className="bg-white p-8 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">WAEC CBT Rollout Plan</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>2024 - Pilot Phase</span>
                        <div className="w-32 bg-gray-200 h-4">
                          <div className="bg-blue-600 h-4" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>2025 - Expansion</span>
                        <div className="w-32 bg-gray-200 h-4">
                          <div className="bg-green-600 h-4" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>2026 - Full CBT</span>
                        <div className="w-32 bg-gray-200 h-4">
                          <div className="bg-purple-600 h-4" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-8 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">CBT Adoption by Region</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Lagos</span>
                        <span className="font-bold text-blue-600">45%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Abuja</span>
                        <span className="font-bold text-green-600">38%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Port Harcourt</span>
                        <span className="font-bold text-purple-600">32%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Kano</span>
                        <span className="font-bold text-orange-600">28%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Why Cbity */}
            <section className="py-20 bg-white">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">Why Choose Cbity?</h2>
                  <p className="text-xl text-gray-600">Everything you need for modern CBT implementation</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="feature-card text-center animate-slide-up">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 mx-auto mb-4 flex items-center justify-center">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">WAEC-standard question bank</h3>
                    <p className="text-gray-600">Comprehensive question database aligned with WAEC standards</p>
                  </div>
                  
                  <div className="feature-card text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="w-16 h-16 bg-green-100 text-green-600 mx-auto mb-4 flex items-center justify-center">
                      <Zap className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Fast deployment & cloud-ready</h3>
                    <p className="text-gray-600">Quick setup with cloud infrastructure for reliability</p>
                  </div>
                  
                  <div className="feature-card text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="w-16 h-16 bg-purple-100 text-purple-600 mx-auto mb-4 flex items-center justify-center">
                      <BarChart3 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Auto-marking & instant analytics</h3>
                    <p className="text-gray-600">Automated grading with detailed performance insights</p>
                  </div>
                  
                  <div className="feature-card text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <div className="w-16 h-16 bg-red-100 text-red-600 mx-auto mb-4 flex items-center justify-center">
                      <Shield className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Highly secure testing</h3>
                    <p className="text-gray-600">Advanced security features to prevent cheating</p>
                  </div>
                  
                  <div className="feature-card text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
                    <div className="w-16 h-16 bg-yellow-100 text-yellow-600 mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Built for school admins and teachers</h3>
                    <p className="text-gray-600">User-friendly interface designed for educators</p>
                  </div>
                  
                  <div className="feature-card text-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-600 mx-auto mb-4 flex items-center justify-center">
                      <Smartphone className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">Accessible across devices</h3>
                    <p className="text-gray-600">Works seamlessly on desktop, tablet, and mobile</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Vision Statement */}
            <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900 text-white relative overflow-hidden">
              <div className="floating-elements">
                <div className="floating-element">
                  <BookOpen className="w-16 h-16 text-white opacity-20" />
                </div>
                <div className="floating-element">
                  <Cloud className="w-12 h-12 text-white opacity-20" />
                </div>
                <div className="floating-element">
                  <BarChart3 className="w-14 h-14 text-white opacity-20" />
                </div>
              </div>
              
              <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-8 neon-glow">
                  Our vision is to CBT <span className="text-yellow-400">everything</span>—internal tests, mocks, and WAEC.
                </h2>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                  We're building the future of education assessment in Nigeria, one school at a time.
                </p>
              </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-gray-50">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">What Educators Say</h2>
                  <p className="text-xl text-gray-600">Trusted by schools across Nigeria</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="testimonial-card animate-slide-up">
                    <div className="flex items-center mb-4">
                      <img 
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" 
                        alt="Dr. Adebayo Olumide"
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">Dr. Adebayo Olumide</h4>
                        <p className="text-sm text-gray-600">Principal, Lagos Model College</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"Cbity has transformed how we conduct assessments. Our students are now more confident and prepared for WAEC."</p>
                    <div className="flex items-center mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="testimonial-card animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center mb-4">
                      <img 
                        src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" 
                        alt="Mrs. Kemi Oladele"
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">Mrs. Kemi Oladele</h4>
                        <p className="text-sm text-gray-600">HOD Mathematics, FGC Warri</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"The analytics and reporting features help us identify student weaknesses and improve our teaching methods."</p>
                    <div className="flex items-center mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="testimonial-card animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center mb-4">
                      <img 
                        src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" 
                        alt="Mr. Tunde Adebayo"
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">Mr. Tunde Adebayo</h4>
                        <p className="text-sm text-gray-600">Vice Principal, King's College</p>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"Easy to use, reliable, and the customer support is excellent. Highly recommended for all secondary schools."</p>
                    <div className="flex items-center mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="cta-section py-20 text-white relative">
              <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">
                  <span className="text-yellow-400">Be part of the digital testing wave</span> sweeping Nigerian schools.
                </h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                  Start with a free demo or trial today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-primary bg-yellow-500 text-black hover:bg-yellow-400 px-8 py-4 text-lg font-semibold pulse-animation">
                    Get Free Demo
                  </button>
                  <Link to="/login" className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                    Start Free Trial
                  </Link>
                </div>
              </div>
            </section>
          </div>
        );

      case 'pricing':
        return (
          <div className="footer-page">
            <div className="footer-page-content">
              <div className="footer-page-header">
                <h1 className="footer-page-title">Pricing Plans</h1>
                <p className="footer-page-subtitle">Choose the perfect plan for your school's needs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="pricing-card">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-blue-600">₦50,000</span>
                      <span className="text-gray-600 ml-2">per term</span>
                    </div>
                    <p className="text-gray-600">Perfect for small schools</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Up to 200 students</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />5 subjects</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Basic analytics</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Email support</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Online mode only</li>
                  </ul>
                  <button className="w-full btn-primary">Get Started</button>
                </div>

                <div className="pricing-card featured">
                  <div className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold text-center -mx-8 -mt-8 mb-6">
                    Most Popular
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-blue-600">₦120,000</span>
                      <span className="text-gray-600 ml-2">per term</span>
                    </div>
                    <p className="text-gray-600">Best for medium schools</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Up to 800 students</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />All subjects</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Advanced analytics</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Priority support</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Online & offline modes</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Custom branding</li>
                  </ul>
                  <button className="w-full btn-primary">Get Started</button>
                </div>

                <div className="pricing-card">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-blue-600">₦250,000</span>
                      <span className="text-gray-600 ml-2">per term</span>
                    </div>
                    <p className="text-gray-600">For large institutions</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Unlimited students</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />All subjects</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Full analytics suite</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />24/7 support</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />All modes</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Custom integration</li>
                    <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-3" />Training included</li>
                  </ul>
                  <button className="w-full btn-primary">Contact Sales</button>
                </div>
              </div>

              <div className="footer-page-section">
                <h2>Frequently Asked Questions</h2>
                <div className="space-y-6">
                  <div>
                    <h3>Can I upgrade or downgrade my plan?</h3>
                    <p>Yes, you can change your plan at any time. Changes take effect at the start of your next billing cycle.</p>
                  </div>
                  <div>
                    <h3>Is there a free trial available?</h3>
                    <p>Yes, we offer a 14-day free trial for all plans. No credit card required.</p>
                  </div>
                  <div>
                    <h3>What payment methods do you accept?</h3>
                    <p>We accept bank transfers, card payments, and mobile money payments.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="footer-page">
            <div className="footer-page-content">
              <div className="footer-page-header">
                <h1 className="footer-page-title">Security & Privacy</h1>
                <p className="footer-page-subtitle">Your data security is our top priority</p>
              </div>

              <div className="footer-page-section">
                <h2>Data Protection</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    <Lock className="w-8 h-8 text-blue-600 mt-1" />
                    <div>
                      <h3>End-to-End Encryption</h3>
                      <p>All data is encrypted in transit and at rest using industry-standard AES-256 encryption.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Shield className="w-8 h-8 text-green-600 mt-1" />
                    <div>
                      <h3>Secure Infrastructure</h3>
                      <p>Our servers are hosted on secure cloud infrastructure with 99.9% uptime guarantee.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Database className="w-8 h-8 text-purple-600 mt-1" />
                    <div>
                      <h3>Data Backup</h3>
                      <p>Automated daily backups ensure your data is always safe and recoverable.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Users className="w-8 h-8 text-orange-600 mt-1" />
                    <div>
                      <h3>Access Control</h3>
                      <p>Role-based access control ensures only authorized users can access sensitive data.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="footer-page-section">
                <h2>Compliance & Certifications</h2>
                <ul>
                  <li>GDPR compliant data processing</li>
                  <li>ISO 27001 security standards</li>
                  <li>SOC 2 Type II certified</li>
                  <li>Regular security audits and penetration testing</li>
                </ul>
              </div>

              <div className="footer-page-section">
                <h2>Privacy Policy</h2>
                <p>We are committed to protecting your privacy. We collect only the minimum data necessary to provide our services and never sell your personal information to third parties.</p>
                <p>For detailed information about how we handle your data, please read our complete Privacy Policy.</p>
              </div>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div className="footer-page">
            <div className="footer-page-content">
              <div className="footer-page-header">
                <h1 className="footer-page-title">Integrations</h1>
                <p className="footer-page-subtitle">Connect Cbity with your favorite tools and services</p>
              </div>

              <div className="footer-page-section">
                <h2>Available Integrations</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border border-gray-200">
                    <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3>Google Workspace</h3>
                    <p>Single sign-on and seamless integration with Google Classroom and Drive.</p>
                  </div>
                  <div className="text-center p-6 border border-gray-200">
                    <Cloud className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3>Microsoft 365</h3>
                    <p>Integration with Microsoft Teams, OneDrive, and Office applications.</p>
                  </div>
                  <div className="text-center p-6 border border-gray-200">
                    <Smartphone className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3>SMS Gateway</h3>
                    <p>Send exam notifications and results via SMS to students and parents.</p>
                  </div>
                  <div className="text-center p-6 border border-gray-200">
                    <Mail className="w-12 h-12 text-red-600 mx-auto mb-4" />
                    <h3>Email Services</h3>
                    <p>Automated email notifications for exam schedules and results.</p>
                  </div>
                  <div className="text-center p-6 border border-gray-200">
                    <Code className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                    <h3>API Access</h3>
                    <p>RESTful API for custom integrations with your existing systems.</p>
                  </div>
                  <div className="text-center p-6 border border-gray-200">
                    <Database className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                    <h3>Student Information Systems</h3>
                    <p>Sync student data with popular SIS platforms.</p>
                  </div>
                </div>
              </div>

              <div className="footer-page-section">
                <h2>Custom Integrations</h2>
                <p>Need a specific integration that's not listed? Our team can work with you to create custom integrations tailored to your school's needs.</p>
                <p>Contact our integration specialists to discuss your requirements and get a custom quote.</p>
              </div>
            </div>
          </div>
        );

      case 'support':
        return (
          <div className="footer-page">
            <div className="footer-page-content">
              <div className="footer-page-header">
                <h1 className="footer-page-title">Support</h1>
                <p className="footer-page-subtitle">We're here to help you succeed</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center p-6 bg-white shadow-lg">
                  <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3>Phone Support</h3>
                  <p className="mb-4">Get immediate help from our support team</p>
                  <p className="font-semibold">+234 806 946 2143</p>
                  <p className="text-sm text-gray-600">Mon-Fri, 8AM-6PM WAT</p>
                </div>
                <div className="text-center p-6 bg-white shadow-lg">
                  <Mail className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3>Email Support</h3>
                  <p className="mb-4">Send us your questions and we'll respond within 24 hours</p>
                  <p className="font-semibold">support@cbity.ng</p>
                </div>
                <div className="text-center p-6 bg-white shadow-lg">
                  <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3>Live Chat</h3>
                  <p className="mb-4">Chat with our support team in real-time</p>
                  <button className="btn-primary">Start Chat</button>
                </div>
              </div>

              <div className="footer-page-section">
                <h2>Support Levels</h2>
                <div className="space-y-6">
                  <div>
                    <h3>Basic Support (Starter Plan)</h3>
                    <ul>
                      <li>Email support during business hours</li>
                      <li>Response time: 48 hours</li>
                      <li>Access to knowledge base</li>
                    </ul>
                  </div>
                  <div>
                    <h3>Priority Support (Professional Plan)</h3>
                    <ul>
                      <li>Email and phone support</li>
                      <li>Response time: 24 hours</li>
                      <li>Priority queue for faster resolution</li>
                      <li>Video call support available</li>
                    </ul>
                  </div>
                  <div>
                    <h3>Premium Support (Enterprise Plan)</h3>
                    <ul>
                      <li>24/7 phone and email support</li>
                      <li>Response time: 4 hours</li>
                      <li>Dedicated account manager</li>
                      <li>On-site training and setup assistance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'documentation':
        return (
          <div className="footer-page">
            <div className="footer-page-content">
              <div className="footer-page-header">
                <h1 className="footer-page-title">Documentation</h1>
                <p className="footer-page-subtitle">Everything you need to know about using Cbity</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-6 shadow-lg">
                  <BookOpen className="w-8 h-8 text-blue-600 mb-4" />
                  <h3>Getting Started Guide</h3>
                  <p className="mb-4">Step-by-step instructions to set up your school on Cbity</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Account setup and configuration</li>
                    <li>• Adding students and teachers</li>
                    <li>• Creating your first exam</li>
                    <li>• Understanding the dashboard</li>
                  </ul>
                </div>
                <div className="bg-white p-6 shadow-lg">
                  <Users className="w-8 h-8 text-green-600 mb-4" />
                  <h3>User Guides</h3>
                  <p className="mb-4">Detailed guides for different user types</p>
                  <ul className="space-y-2 text-sm">
                    <li>• School Administrator Guide</li>
                    <li>• Teacher User Manual</li>
                    <li>• Student Guide</li>
                    <li>• Parent Portal Guide</li>
                  </ul>
                </div>
                <div className="bg-white p-6 shadow-lg">
                  <FileText className="w-8 h-8 text-purple-600 mb-4" />
                  <h3>Exam Management</h3>
                  <p className="mb-4">Learn how to create and manage exams effectively</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Creating question banks</li>
                    <li>• Setting up exam schedules</li>
                    <li>• Managing exam security</li>
                    <li>• Analyzing results</li>
                  </ul>
                </div>
                <div className="bg-white p-6 shadow-lg">
                  <Code className="w-8 h-8 text-orange-600 mb-4" />
                  <h3>API Documentation</h3>
                  <p className="mb-4">Technical documentation for developers</p>
                  <ul className="space-y-2 text-sm">
                    <li>• API endpoints reference</li>
                    <li>• Authentication methods</li>
                    <li>• Code examples</li>
                    <li>• Integration tutorials</li>
                  </ul>
                </div>
              </div>

              <div className="footer-page-section">
                <h2>Video Tutorials</h2>
                <p>Watch our comprehensive video tutorials to learn how to use Cbity effectively. Our video library covers everything from basic setup to advanced features.</p>
                <button className="btn-primary mt-4">
                  <Video className="w-5 h-5 mr-2" />
                  Watch Tutorials
                </button>
              </div>
            </div>
          </div>
        );

      case 'training':
        return (
          <div className="footer-page">
            <div className="footer-page-content">
              <div className="footer-page-header">
                <h1 className="footer-page-title">Training Programs</h1>
                <p className="footer-page-subtitle">Comprehensive training to maximize your Cbity experience</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-6 shadow-lg text-center">
                  <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3>Administrator Training</h3>
                  <p className="mb-4">2-day intensive training for school administrators</p>
                  <ul className="text-sm space-y-2 mb-6">
                    <li>• System setup and configuration</li>
                    <li>• User management</li>
                    <li>• Reporting and analytics</li>
                    <li>• Best practices</li>
                  </ul>
                  <button className="btn-primary">Book Training</button>
                </div>
                <div className="bg-white p-6 shadow-lg text-center">
                  <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3>Teacher Training</h3>
                  <p className="mb-4">1-day training focused on exam creation and management</p>
                  <ul className="text-sm space-y-2 mb-6">
                    <li>• Creating effective questions</li>
                    <li>• Exam scheduling</li>
                    <li>• Result analysis</li>
                    <li>• Student monitoring</li>
                  </ul>
                  <button className="btn-success">Book Training</button>
                </div>
                <div className="bg-white p-6 shadow-lg text-center">
                  <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3>Certification Program</h3>
                  <p className="mb-4">Become a certified Cbity expert</p>
                  <ul className="text-sm space-y-2 mb-6">
                    <li>• Advanced features training</li>
                    <li>• Troubleshooting skills</li>
                    <li>• Certification exam</li>
                    <li>• Ongoing support</li>
                  </ul>
                  <button className="btn-purple">Learn More</button>
                </div>
              </div>

              <div className="footer-page-section">
                <h2>Training Formats</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3>On-site Training</h3>
                    <p>Our trainers come to your school to provide hands-on training for your team. This format allows for customized training based on your specific needs and setup.</p>
                  </div>
                  <div>
                    <h3>Virtual Training</h3>
                    <p>Join our interactive online training sessions from anywhere. Virtual training includes live demonstrations, Q&A sessions, and hands-on practice.</p>
                  </div>
                  <div>
                    <h3>Self-paced Learning</h3>
                    <p>Access our comprehensive online learning platform with video tutorials, interactive modules, and progress tracking.</p>
                  </div>
                  <div>
                    <h3>Webinar Series</h3>
                    <p>Join our regular webinars covering specific topics, new features, and best practices. All webinars are recorded for later viewing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'help-center':
        return (
          <div className="footer-page">
            <div className="footer-page-content">
              <div className="footer-page-header">
                <h1 className="footer-page-title">Help Center</h1>
                <p className="footer-page-subtitle">Find answers to common questions and troubleshooting guides</p>
              </div>

              <div className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for help articles..."
                    className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-6 shadow-lg">
                  <BookOpen className="w-8 h-8 text-blue-600 mb-4" />
                  <h3>Getting Started</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-blue-600 hover:underline">How to set up your school account</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Adding students and teachers</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Creating your first exam</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Understanding user roles</a></li>
                  </ul>
                </div>
                <div className="bg-white p-6 shadow-lg">
                  <FileText className="w-8 h-8 text-green-600 mb-4" />
                  <h3>Exam Management</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-blue-600 hover:underline">Creating question banks</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Scheduling exams</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Setting exam security options</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Managing exam results</a></li>
                  </ul>
                </div>
                <div className="bg-white p-6 shadow-lg">
                  <Headphones className="w-8 h-8 text-purple-600 mb-4" />
                  <h3>Troubleshooting</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-blue-600 hover:underline">Login issues</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Exam not loading</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Browser compatibility</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Network connectivity issues</a></li>
                  </ul>
                </div>
              </div>

              <div className="footer-page-section">
                <h2>Popular Articles</h2>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h3><a href="#" className="text-blue-600 hover:underline">How to create effective multiple-choice questions</a></h3>
                    <p className="text-sm text-gray-600">Learn best practices for creating engaging and effective exam questions.</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h3><a href="#" className="text-blue-600 hover:underline">Understanding exam analytics and reports</a></h3>
                    <p className="text-sm text-gray-600">Make sense of your exam data with our comprehensive analytics guide.</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h3><a href="#" className="text-blue-600 hover:underline">Setting up offline exam mode</a></h3>
                    <p className="text-sm text-gray-600">Configure Cbity to work without internet connectivity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'status':
        return (
          <div className="footer-page">
            <div className="footer-page-content">
              <div className="footer-page-header">
                <h1 className="footer-page-title">System Status</h1>
                <p className="footer-page-subtitle">Real-time status of Cbity services</p>
              </div>

              <div className="bg-green-50 border border-green-200 p-6 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-600 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">All Systems Operational</h3>
                    <p className="text-green-700">All services are running normally</p>
                  </div>
                </div>
              </div>

              <div className="footer-page-section">
                <h2>Service Status</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200">
                    <div className="flex items-center">
                      <Activity className="w-5 h-5 text-green-500 mr-3" />
                      <span>Web Application</span>
                    </div>
                    <span className="text-green-600 font-medium">Operational</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200">
                    <div className="flex items-center">
                      <Activity className="w-5 h-5 text-green-500 mr-3" />
                      <span>Exam Engine</span>
                    </div>
                    <span className="text-green-600 font-medium">Operational</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200">
                    <div className="flex items-center">
                      <Activity className="w-5 h-5 text-green-500 mr-3" />
                      <span>Database</span>
                    </div>
                    <span className="text-green-600 font-medium">Operational</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200">
                    <div className="flex items-center">
                      <Activity className="w-5 h-5 text-green-500 mr-3" />
                      <span>File Storage</span>
                    </div>
                    <span className="text-green-600 font-medium">Operational</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white border border-gray-200">
                    <div className="flex items-center">
                      <Activity className="w-5 h-5 text-green-500 mr-3" />
                      <span>Email Notifications</span>
                    </div>
                    <span className="text-green-600 font-medium">Operational</span>
                  </div>
                </div>
              </div>

              <div className="footer-page-section">
                <h2>Recent Incidents</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Scheduled Maintenance</h3>
                      <span className="text-sm text-gray-500">Dec 15, 2024</span>
                    </div>
                    <p className="text-sm text-gray-600">Routine database maintenance completed successfully. No service interruption.</p>
                  </div>
                  <div className="p-4 bg-white border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Performance Optimization</h3>
                      <span className="text-sm text-gray-500">Dec 10, 2024</span>
                    </div>
                    <p className="text-sm text-gray-600">Server performance improvements deployed. Faster page load times across all services.</p>
                  </div>
                </div>
              </div>

              <div className="footer-page-section">
                <h2>Uptime Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-white border border-gray-200">
                    <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                    <div className="text-sm text-gray-600">Last 30 days</div>
                  </div>
                  <div className="text-center p-6 bg-white border border-gray-200">
                    <div className="text-3xl font-bold text-green-600 mb-2">99.8%</div>
                    <div className="text-sm text-gray-600">Last 90 days</div>
                  </div>
                  <div className="text-center p-6 bg-white border border-gray-200">
                    <div className="text-3xl font-bold text-green-600 mb-2">99.7%</div>
                    <div className="text-sm text-gray-600">Last 12 months</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div>
      {/* Header with back link */}
      <div className="bg-white shadow-sm border-b border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-xl p-8 text-white">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Digital Testing Revolution</h3>
                  <p className="text-blue-100">Transforming how Nigerian schools conduct assessments and prepare students for the future of education.</p>
                </div>
              </div>
          <Link to="/">
          <div>
            Back to Home
            </div>
        </Link>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default FooterPages;