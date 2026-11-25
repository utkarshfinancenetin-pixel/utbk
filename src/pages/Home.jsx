import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, Users, Banknote, 
  Home as HomeIcon, User, Briefcase, GraduationCap, Building, Car,
  Zap, CheckCircle2, TrendingUp, Award, Calculator, Percent, Sparkles
} from 'lucide-react';
import heroImg from '../assets/hero-loan.png';
import aboutImg from '../assets/about-trust.png';
import './Home.css';

const Home = () => {
  // Mini Loan EMI quick estimator state
  const [calcAmount, setCalcAmount] = useState(300000);
  const [calcTenure, setCalcTenure] = useState(36); // months

  const calculateQuickEmi = (rate = 8.5) => {
    const monthlyRate = rate / 12 / 100;
    const emi = (calcAmount * monthlyRate * Math.pow(1 + monthlyRate, calcTenure)) / 
                (Math.pow(1 + monthlyRate, calcTenure) - 1);
    return Math.round(emi);
  };

  const loanServices = [
    { 
      title: 'Personal Loan', 
      path: '/personal-loan', 
      icon: <User size={30} />, 
      rate: 'From 10.49% p.a.',
      desc: 'Quick collateral-free personal loans for weddings, travel, emergencies, or medical needs with minimal documentation.' 
    },
    { 
      title: 'Home Loan', 
      path: '/home-loan', 
      icon: <HomeIcon size={30} />, 
      rate: 'From 8.50% p.a.',
      desc: 'Fulfill your dream of owning a home with low interest rates, transparent processing, and long repayment tenure up to 30 years.' 
    },
    { 
      title: 'MSME Loan', 
      path: '/msme-loan', 
      icon: <Briefcase size={30} />, 
      rate: 'Competitive Rates',
      desc: 'Empowering enterprises and MSMEs with customized working capital and business expansion loans across India.' 
    },
    { 
      title: 'Business Loan', 
      path: '/business-loan', 
      icon: <TrendingUp size={30} />, 
      rate: 'From 11.99% p.a.',
      desc: 'Fuel your enterprise growth, inventory purchasing, or equipment upgrades with hassle-free fast business financing.' 
    },
    { 
      title: 'Loan Against Property', 
      path: '/loan-against-property', 
      icon: <Building size={30} />, 
      rate: 'From 9.25% p.a.',
      desc: 'Leverage the true market value of your residential or commercial property to get higher loan amounts at lower EMIs.' 
    },
    { 
      title: 'Vehicle / Car Loan', 
      path: '/car-loan', 
      icon: <Car size={30} />, 
      rate: 'From 8.85% p.a.',
      desc: 'Finance new or pre-owned vehicles, commercial vehicles, and two-wheelers with flexible tenure and quick approval.' 
    },
    { 
      title: 'Education Loan', 
      path: '/education-loan', 
      icon: <GraduationCap size={30} />, 
      rate: 'From 9.50% p.a.',
      desc: 'Invest in your higher education in premier colleges in India and abroad with flexible repayment post course completion.' 
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="grid md-grid-2 gap-8 items-center">
            <div className="hero-content">
           
              <h1 className="hero-title text-primary">
                Aapki Umeed Ka Finance, <br/>
                <span className="text-secondary">Aapki Unnati Ka Saath</span>
              </h1>
              <p className="hero-desc">
                Welcome to Utkarsh Finance. Empowering over <strong>10,000+ customers</strong> with quick approvals, transparent digital finance, and affordable interest rates tailored to your life goals.
              </p>
              <div className="hero-actions">
                <Link to="/online-loan-apply" className="btn btn-secondary btn-lg">
                  Apply for Loan <ArrowRight size={20} />
                </Link>
                <Link to="/emi-calculator" className="btn btn-outline btn-lg">
                  Calculate EMI <Calculator size={18} />
                </Link>
              </div>

              <div className="hero-quick-features">
                <span className="qf-item"><CheckCircle2 size={16} className="text-secondary" /> Zero Hidden Charges</span>
                <span className="qf-item"><CheckCircle2 size={16} className="text-secondary" /> Instant In-Principle Sanction</span>
                <span className="qf-item"><CheckCircle2 size={16} className="text-secondary" /> RBI Regulated Finance</span>
              </div>
            </div>

            <div className="hero-image-wrapper text-center">
              <div className="floating-badge-top-left badge-float">
                <Zap size={18} className="text-secondary" /> Instant Loan Approval
              </div>
              <div className="floating-badge-top-right badge-float">
                <Award size={18} className="text-secondary" /> 10K+ Customers
              </div>
              <div className="floating-badge-bottom-left badge-float">
                <TrendingUp size={18} className="text-primary" /> Low Interest Rates
              </div>
              
              <img src={heroImg} alt="Utkarsh Finance Happy Customers" className="hero-image" />
            </div>
          </div>
          
          {/* Key Bank Statistics */}
          <div className="hero-stats mt-8">
            <div className="stat-item card bg-white">
              <Users className="stat-icon text-primary" size={32} />
              <div className="stat-text">
                <strong>10,000+</strong>
                <span>Customers Empowered</span>
              </div>
            </div>
            <div className="stat-item card bg-white">
              <Building className="stat-icon text-secondary" size={32} />
              <div className="stat-text">
                <strong>10+</strong>
                <span>Branches Across 5 States</span>
              </div>
            </div>
            <div className="stat-item card bg-white">
              <ShieldCheck className="stat-icon text-success" size={32} />
              <div className="stat-text">
                <strong>RBI Regulated</strong>
                <span>Finance Institution</span>
              </div>
            </div>
            <div className="stat-item card bg-white">
              <Banknote className="stat-icon text-warning" size={32} />
              <div className="stat-text">
                <strong>₹2,000+ Cr</strong>
                <span>Total Loan Disbursed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick EMI Estimator Banner */}
      <section className="calculator-strip section-padding-sm bg-light">
        <div className="container">
          <div className="calc-banner card">
            <div className="calc-banner-header">
              <div className="calc-banner-title">
                <Calculator size={28} className="text-secondary" />
                <div>
                  <h3 className="mb-0 text-primary">Quick Loan EMI Estimator</h3>
                  <p className="text-sm text-secondary mb-0">Estimate your monthly installment at an indicative 8.5% to 10.5% p.a.</p>
                </div>
              </div>
              <Link to="/emi-calculator" className="btn btn-outline btn-sm">Full Calculator</Link>
            </div>

            <div className="calc-banner-body grid md-grid-3 gap-6 items-center mt-6">
              <div>
                <label className="form-label text-sm">Loan Amount: <strong>₹{calcAmount.toLocaleString('en-IN')}</strong></label>
                <input 
                  type="range" 
                  min="50000" 
                  max="2000000" 
                  step="25000" 
                  value={calcAmount} 
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full accent-orange" 
                />
                <div className="flex justify-between text-xs text-muted">
                  <span>₹50K</span>
                  <span>₹20 Lakh</span>
                </div>
              </div>

              <div>
                <label className="form-label text-sm">Tenure: <strong>{calcTenure} Months ({calcTenure/12} Years)</strong></label>
                <input 
                  type="range" 
                  min="12" 
                  max="84" 
                  step="6" 
                  value={calcTenure} 
                  onChange={(e) => setCalcTenure(Number(e.target.value))}
                  className="w-full accent-orange" 
                />
                <div className="flex justify-between text-xs text-muted">
                  <span>1 Yr</span>
                  <span>7 Yrs</span>
                </div>
              </div>

              <div className="calc-result-box text-center">
                <span className="text-xs text-uppercase font-semibold text-secondary">Estimated Monthly EMI</span>
                <h2 className="text-primary calc-emi-amount mb-1">
                  ₹{calculateQuickEmi(8.5).toLocaleString('en-IN')} - ₹{calculateQuickEmi(10.5).toLocaleString('en-IN')}<span className="emi-unit">/mo</span>
                </h2>
                <span className="text-xs text-muted" style={{ display: 'block', marginBottom: '0.5rem' }}>Indicative 8.5% to 10.5% p.a.</span>
                <Link to="/online-loan-apply" className="btn btn-secondary btn-sm w-full">
                  Apply at this EMI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Utkarsh Section */}
      <section className="about-section section-padding">
        <div className="container">
          <div className="grid md-grid-2 gap-8 items-center">
            <div className="about-content">
              <h6 className="text-secondary font-semibold mb-2 text-uppercase">Financial Inclusion & Trust</h6>
              <h2 className="section-title text-primary">About Utkarsh Finance</h2>
              <p>
                <strong>Utkarsh Finance</strong> is a premier financial institution dedicated to fostering economic growth, financial literacy, and credit accessibility across India. With corporate presence in Ahmedabad, Gujarat, Utkarsh has expanded into an all-India financial network.
              </p>
              <p>
                Guided by our philosophy of <em>"Aapki Umeed Ka Finance"</em>, we provide comprehensive financial solutions spanning retail credit, MSME working capital, affordable housing finance, micro-financing, and secure personal loans.
              </p>
              <div className="about-highlights-grid mt-4 mb-6">
                <div className="highlight-pill">
                  <CheckCircle2 size={18} className="text-secondary" /> <span>RBI Regulated Finance</span>
                </div>
                <div className="highlight-pill">
                  <CheckCircle2 size={18} className="text-secondary" /> <span>Present in 5 States</span>
                </div>
                <div className="highlight-pill">
                  <CheckCircle2 size={18} className="text-secondary" /> <span>Doorstep Customer Support</span>
                </div>
                <div className="highlight-pill">
                  <CheckCircle2 size={18} className="text-secondary" /> <span>100% Digital Processing</span>
                </div>
              </div>
              <Link to="/about-us" className="btn btn-primary">
                Learn More About Utkarsh <ArrowRight size={18} />
              </Link>
            </div>

            <div className="about-image-wrapper">
              <div className="card about-image-card p-2 bg-white rounded-lg relative">
                <img src={aboutImg} alt="Utkarsh Finance Trusted Advisor" className="w-full h-auto rounded object-cover" />
                <div className="floating-badge card">
                  <h3 className="text-primary">9+ Years</h3>
                  <p>Of Finance Trust</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section section-padding bg-light">
        <div className="container">
          <div className="text-center mb-12">
            <h6 className="text-secondary font-semibold mb-2 text-uppercase">Comprehensive Loan Products</h6>
            <h2 className="section-title text-primary">Utkarsh Loan Services</h2>
            <p className="max-w-2xl mx-auto text-secondary-text">
              Whether you are planning your child's education, buying a dream home, expanding your enterprise, or facing an urgent medical requirement, Utkarsh Finance has you covered.
            </p>
          </div>

          <div className="services-grid grid md-grid-3 gap-6">
            {loanServices.map((service, index) => (
              <div key={index} className="service-card card bg-white">
                <div className="service-card-top flex justify-between items-center mb-4">
                  <div className="service-icon-wrapper">
                    {service.icon}
                  </div>
                  <span className="rate-badge">{service.rate}</span>
                </div>
                <h3 className="text-primary mb-2">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
                <div className="service-card-footer mt-auto pt-4 flex justify-between items-center border-t">
                  <Link to={service.path} className="service-link text-primary font-semibold">
                    View Details <ArrowRight size={16} />
                  </Link>
                  <Link to="/online-loan-apply" className="btn btn-outline-orange btn-sm">
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Utkarsh Finance */}
      <section className="why-choose-us section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <h6 className="text-secondary font-semibold mb-2 text-uppercase">The Utkarsh Advantage</h6>
            <h2 className="section-title text-primary">Why Choose Utkarsh Finance For Your Loans?</h2>
            <p className="max-w-2xl mx-auto text-secondary-text">
              We combine the safety of an RBI-regulated finance institution with the speed and agility of digital-first lending.
            </p>
          </div>
          <div className="grid md-grid-3 gap-8">
             <div className="feature-item card text-center p-6 rounded-xl">
               <div className="feature-icon mb-4 flex justify-center">
                 <ShieldCheck size={48} className="text-secondary" />
               </div>
               <h4 className="text-primary">100% Transparent & Fair</h4>
               <p>No hidden charges, no fine-print traps. Clear sanction letters, fair terms, and complete regulatory compliance under RBI guidelines.</p>
             </div>
             <div className="feature-item card text-center p-6 rounded-xl">
               <div className="feature-icon mb-4 flex justify-center">
                 <Percent size={48} className="text-secondary" />
               </div>
               <h4 className="text-primary">Attractive & Flexible Rates</h4>
               <p>Enjoy industry-competitive interest rates, custom EMI options, and tenure up to 30 years to suit your monthly budget.</p>
             </div>
             <div className="feature-item card text-center p-6 rounded-xl">
               <div className="feature-icon mb-4 flex justify-center">
                 <Zap size={48} className="text-secondary" />
               </div>
               <h4 className="text-primary">Fast Digital Sanctions</h4>
               <p>Minimal paper documentation and rapid digital evaluation ensure that your loan is approved and disbursed when you need it most.</p>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section-padding text-center">
        <div className="container">
          <div className="cta-card card">
            <h6 className="text-secondary font-semibold mb-2 text-uppercase">Begin Your Journey Today</h6>
            <h2 className="text-white mb-4">Ready To Take Your Next Step With Utkarsh Finance?</h2>
            <p className="mb-8 max-w-2xl mx-auto text-light">
              Connect with our dedicated relationship managers or apply online in just 3 simple steps. Our team is ready to assist you.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/online-loan-apply" className="btn btn-secondary btn-lg">
                Apply For Loan Online <ArrowRight size={20} />
              </Link>
              <Link to="/contact-us" className="btn btn-outline-white btn-lg">
                Find Nearest Branch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
