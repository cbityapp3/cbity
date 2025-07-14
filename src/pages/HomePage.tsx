import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  Shield, 
  Monitor, 
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Play,
  Download,
  Globe,
  Zap,
  BarChart3,
  Target
} from 'lucide-react';

const HomePage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    message: '',
    requestType: 'demo'
  });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappMessage = `
Hi! I'm interested in Cbity CBT System.
Name: ${contactForm.name}
Email: ${contactForm.email}
Phone: ${contactForm.phone}
School: ${contactForm.school}
Request Type: ${contactForm.requestType}
Message: ${contactForm.message}
    `.trim();
    
    const whatsappUrl = `https://wa.me/2348069462143?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    
    setIsContactModalOpen(false);
    setContactForm({
      name: '',
      email: '',
      phone: '',
      school: '',
      message: '',
      requestType: 'demo'
    });
  };

  const features = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Modern Interface",
      description: "Clean, intuitive design optimized for tablets, laptops, and mobile devices"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description: "Advanced security features with IP tracking and anti-cheating measures"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Comprehensive performance tracking and detailed reporting for insights"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Timed Exams",
      description: "Automated timing with warnings and auto-submission features"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Online & Offline",
      description: "Works seamlessly online and offline with automatic sync"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "WAEC Ready",
      description: "Specially designed for WAEC 2026 CBT preparation"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Adebayo Olumide",
      role: "Principal, Lagos Model College",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      quote: "Cbity has transformed how we conduct assessments. Our students are now more confident and prepared for WAEC."
    },
    {
      name: "Mrs. Kemi Oladele",
      role: "HOD Mathematics, FGC Warri",
      avatar: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      quote: "The analytics and reporting features help us identify student weaknesses and improve our teaching methods."
    },
    {
      name: "Mr. Tunde Adebayo",
      role: "Vice Principal, King's College",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      quote: "Easy to use, reliable, and the customer support is excellent. Highly recommended for all secondary schools."
    }
  ];

  const pricing = [
    {
      name: "Starter",
      price: "₦50,000",
      period: "per term",
      features: [
        "Up to 200 students",
        "5 subjects",
        "Basic analytics",
        "Email support",
        "Online mode only"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "₦120,000",
      period: "per term",
      features: [
        "Up to 800 students",
        "All subjects",
        "Advanced analytics",
        "Priority support",
        "Online & offline modes",
        "Custom branding"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "₦250,000",
      period: "per term",
      features: [
        "Unlimited students",
        "All subjects",
        "Full analytics suite",
        "24/7 support",
        "All modes",
        "Custom integration",
        "Training included"
      ],
      popular: false
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students" },
    { number: "150+", label: "Schools" },
    { number: "500+", label: "Teachers" },
    { number: "98%", label: "Success Rate" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-poppins text-white drop-shadow-lg">Cbity</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="navbar-link font-semibold">About</Link>
              <a href="#features" className="navbar-link font-semibold">Features</a>
              <Link to="/pricing" className="navbar-link font-semibold">Pricing</Link>
              <a href="#testimonials" className="navbar-link font-semibold">Testimonials</a>
              <a href="#contact" className="navbar-link font-semibold">Contact</a>
              <Link to="/login" className="btn-primary">Sign In</Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link to="/about" className="block navbar-link font-semibold">About</Link>
              <a href="#features" className="block navbar-link">Features</a>
              <Link to="/pricing" className="block navbar-link">Pricing</Link>
              <a href="#testimonials" className="block navbar-link">Testimonials</a>
              <a href="#contact" className="block navbar-link">Contact</a>
              <Link to="/login" className="block btn-primary text-center">Sign In</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-section pt-20 pb-20 text-white relative overflow-hidden">
        <div className="floating-elements">
          <div className="floating-element">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <div className="floating-element">
            <Award className="w-10 h-10 text-white" />
          </div>
          <div className="floating-element">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div className="floating-element">
            <Users className="w-14 h-14 text-white" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6 animate-fade-in">
              Prepare for <span className="text-yellow-300">WAEC 2026</span> with Confidence
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Modern Computer-Based Testing platform designed specifically for Nigerian secondary schools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="btn-primary bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                Get Free Demo
              </button>
              <Link to="/login" className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 font-montserrat">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title font-poppins">Why Choose Cbity?</h2>
            <p className="section-subtitle">Everything you need for modern CBT implementation</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="icon-wrapper text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 font-poppins">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title font-poppins mb-8">See Cbity in Action</h2>
            <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden hover-scale">
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-blue-600 ml-1" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Complete CBT Solution Demo</h3>
                <p className="text-gray-600">Watch how easy it is to create, manage, and take exams with Cbity</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title font-poppins">Simple, Transparent Pricing</h2>
            <p className="section-subtitle">Choose the plan that fits your school's needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'featured' : ''} animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                {plan.popular && (
                  <div className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold text-center">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 font-poppins">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => setIsContactModalOpen(true)}
                    className={`w-full py-3 font-semibold transition-all ${
                      plan.popular 
                        ? 'btn-primary' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title font-poppins">What Educators Say</h2>
            <p className="section-subtitle">Trusted by schools across Nigeria</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-20 text-white relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">
            Ready to Transform Your School's Assessment?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of schools already using Cbity to prepare their students for WAEC 2026
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsContactModalOpen(true)}
              className="btn-primary bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Schedule Demo
            </button>
            <Link to="/login" className="btn-secondary border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold font-poppins">Cbity</span>
              </div>
              <p className="text-gray-400 mb-4">
                Modern CBT platform for Nigerian secondary schools preparing for WAEC 2026.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-400 cursor-pointer" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/security" className="hover:text-white">Security</Link></li>
                <li><Link to="/integrations" className="hover:text-white">Integrations</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/documentation" className="hover:text-white">Documentation</Link></li>
                <li><Link to="/training" className="hover:text-white">Training</Link></li>
                <li><Link to="/help-center" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/status" className="hover:text-white">Status</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +234 806 946 2143
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@cbity.ng
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Lagos, Nigeria
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2024 Cbity. All rights reserved. Built for Nigerian schools.</p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content max-w-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold font-poppins">Get in Touch</h3>
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="input-field"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  required
                  className="input-field"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={contactForm.school}
                  onChange={(e) => setContactForm({...contactForm, school: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Request Type</label>
                <select
                  className="input-field"
                  value={contactForm.requestType}
                  onChange={(e) => setContactForm({...contactForm, requestType: e.target.value})}
                >
                  <option value="demo">Request Demo</option>
                  <option value="quote">Get Quote</option>
                  <option value="trial">Free Trial</option>
                  <option value="support">Support</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="input-field"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  placeholder="Tell us about your requirements..."
                />
              </div>
              
              <button type="submit" className="w-full btn-primary">
                Send Message via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;