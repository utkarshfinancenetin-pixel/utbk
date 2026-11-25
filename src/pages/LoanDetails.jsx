import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle2, Calculator, MapPin, Mail, Phone, 
  Clock, ShieldCheck, FileText, Send, Building, Award, AlertCircle 
} from 'lucide-react';
import { submitContactEnquiryData } from '../services/sheetService';
import { validateContactEnquiry } from '../utils/validation';
import './LoanDetails.css';

const LoanDetails = () => {
  const { loanType } = useParams();
  
  // Format the URL parameter to a readable title
  const title = loanType
    ? loanType
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Loan Details';

  const isCalculator = loanType === 'emi-calculator';
  const isContact = loanType === 'contact-us';
  const isPolicy = ['privacy-policy', 'term-of-use', 'cookie-policy'].includes(loanType);

  // State for Full EMI Calculator
  const [emiAmount, setEmiAmount] = useState(500000);
  const [emiRate, setEmiRate] = useState(8.5);
  const [emiTenureYears, setEmiTenureYears] = useState(5);

  const calculateFullEmi = () => {
    const monthlyRate = emiRate / 12 / 100;
    const totalMonths = emiTenureYears * 12;
    const emi = (emiAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - emiAmount;

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    };
  };

  const emiResults = calculateFullEmi();

  // Contact form state
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactErrors, setContactErrors] = useState({});
  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Enquiry',
    message: ''
  });

  const handleContactChange = (field, value) => {
    let val = value;
    // Strict numeric restriction and 10-digit maximum for phone
    if (field === 'phone') {
      val = value.replace(/\D/g, '').slice(0, 10);
    }
    setContactData((prev) => ({ ...prev, [field]: val }));
    if (contactErrors[field]) {
      setContactErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    // Validate using Zod + Validator
    const validation = validateContactEnquiry(contactData);
    if (!validation.isValid) {
      setContactErrors(validation.errors);
      return;
    }

    setContactErrors({});
    setContactLoading(true);

    // Send validated & cleaned data to Google Sheets
    await submitContactEnquiryData(validation.cleanedData);

    setContactLoading(false);
    setContactSubmitted(true);
  };

  // Policy pages
  if (isPolicy) {
    return (
      <div className="loan-details-page">
        <section className="page-header text-center">
          <div className="container">
             <span className="text-secondary font-semibold text-uppercase">Legal & Compliance</span>
             <h1 className="hero-title text-primary mt-2">{title}</h1>
             <p className="hero-desc mx-auto">
               Review the {title} of Utkarsh Finance.
             </p>
          </div>
        </section>
        <section className="section-padding">
          <div className="container">
            <div className="card p-8 md:p-12 text-secondary-text" style={{ lineHeight: '1.8', borderTop: '4px solid #0A3871' }}>
              <h2 className="text-primary mb-4">{title} - Utkarsh Finance</h2>
              <p>Welcome to <strong>Utkarsh Finance</strong>. This document sets forth our <strong>{title}</strong> and details your rights and our commitments in compliance with the Reserve Bank of India (RBI) and Information Technology rules.</p>
              
              <h4 className="text-primary mt-6 mb-2">1. Information We Collect</h4>
              <p>We collect essential personal, identity (KYC), financial, and contact information strictly to verify your creditworthiness, process loan requests, maintain customer accounts, and comply with regulatory statutes.</p>

              <h4 className="text-primary mt-6 mb-2">2. Usage & Disclosure of Information</h4>
              <p>Your confidential data is never sold to third-party advertisers. Information is only shared with authorized credit bureaus (such as CIBIL, Experian), payment processors, statutory auditing entities, or law enforcement bodies when mandated by Indian law.</p>

              <h4 className="text-primary mt-6 mb-2">3. Data Security & Encryption</h4>
              <p>Utkarsh Finance deploys enterprise 256-bit SSL encryption, firewalls, and multi-factor authentication systems to secure all customer information and transactions against unauthorized interception.</p>

              <h4 className="text-primary mt-6 mb-2">4. Contact Grievance Officer</h4>
              <p>For any inquiries, data privacy requests, or grievances regarding our {title}, please write to our Customer Care team at <a href="mailto:support@utkarshfinance.in" className="text-secondary font-semibold">support@utkarshfinance.in</a> or call Helpline <strong><a href="tel:8958623532" className="text-primary">+91 8958623532</a></strong>.</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Interactive EMI Calculator Page
  if (isCalculator) {
    return (
      <div className="loan-details-page">
        <section className="page-header text-center">
          <div className="container">
             <span className="text-secondary font-semibold text-uppercase">Financial Planning Tools</span>
             <h1 className="hero-title text-primary mt-2">Utkarsh Loan EMI Calculator</h1>
             <p className="hero-desc mx-auto">
               Plan your finances with ease. Calculate your monthly installment (EMI), interest liability, and overall loan repayment schedule.
             </p>
          </div>
        </section>
        
        <section className="section-padding">
          <div className="container">
            <div className="card p-6 md:p-10" style={{ borderTop: '4px solid #F37022', boxShadow: '0 10px 30px rgba(10,56,113,0.1)' }}>
              <div className="grid md-grid-2 gap-10 items-center">
                {/* Sliders Input */}
                <div>
                  <h3 className="text-primary mb-6">Customize Your Loan</h3>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-semibold text-primary">Loan Amount (₹)</label>
                      <span className="text-secondary font-bold" style={{ fontSize: '1.2rem' }}>
                        ₹{emiAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="50000" 
                      max="10000000" 
                      step="25000" 
                      value={emiAmount} 
                      onChange={(e) => setEmiAmount(Number(e.target.value))}
                      className="w-full"
                      style={{ accentColor: '#F37022', cursor: 'pointer' }}
                    />
                    <div className="flex justify-between text-xs text-muted mt-1">
                      <span>₹50,000</span>
                      <span>₹1 Crore</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-semibold text-primary">Interest Rate (% p.a.)</label>
                      <span className="text-secondary font-bold" style={{ fontSize: '1.2rem' }}>
                        {emiRate}%
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="7.5" 
                      max="24" 
                      step="0.25" 
                      value={emiRate} 
                      onChange={(e) => setEmiRate(Number(e.target.value))}
                      className="w-full"
                      style={{ accentColor: '#F37022', cursor: 'pointer' }}
                    />
                    <div className="flex justify-between text-xs text-muted mt-1">
                      <span>7.5%</span>
                      <span>24%</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <label className="font-semibold text-primary">Tenure (Years)</label>
                      <span className="text-secondary font-bold" style={{ fontSize: '1.2rem' }}>
                        {emiTenureYears} Years ({emiTenureYears * 12} Months)
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="30" 
                      step="1" 
                      value={emiTenureYears} 
                      onChange={(e) => setEmiTenureYears(Number(e.target.value))}
                      className="w-full"
                      style={{ accentColor: '#F37022', cursor: 'pointer' }}
                    />
                    <div className="flex justify-between text-xs text-muted mt-1">
                      <span>1 Year</span>
                      <span>30 Years</span>
                    </div>
                  </div>
                </div>

                {/* Calculation Summary Card */}
                <div className="card p-8 bg-light text-center" style={{ border: '2px solid #E2E8F0', borderRadius: '14px' }}>
                  <span className="text-xs text-uppercase font-bold text-secondary" style={{ letterSpacing: '1px' }}>Monthly Installment</span>
                  <h1 className="text-primary mt-2 mb-4" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
                    ₹{emiResults.monthlyEmi.toLocaleString('en-IN')}
                    <span style={{ fontSize: '1rem', color: '#64748B', fontWeight: 500 }}> / month</span>
                  </h1>

                  <div className="border-t pt-4 mt-4" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Principal Amount:</span>
                      <strong>₹{emiAmount.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Total Interest Payable:</span>
                      <strong className="text-secondary">₹{emiResults.totalInterest.toLocaleString('en-IN')}</strong>
                    </div>
                    <div className="flex justify-between text-sm border-t pt-2">
                      <span className="font-semibold text-primary">Total Amount Payable:</span>
                      <strong className="text-primary" style={{ fontSize: '1.1rem' }}>₹{emiResults.totalPayment.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link to="/online-loan-apply" className="btn btn-secondary w-full btn-lg">
                      Apply For Loan At This EMI <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Contact Us Page
  if (isContact) {
    return (
      <div className="loan-details-page">
        <section className="page-header text-center">
          <div className="container">
             <span className="text-secondary font-semibold text-uppercase">We Are Here To Help</span>
             <h1 className="hero-title text-primary mt-2">Contact Utkarsh Finance</h1>
             <p className="hero-desc mx-auto">
               Reach out to our customer care or visit our registered corporate office in Ahmedabad, Gujarat.
             </p>
          </div>
        </section>
        
        <section className="contact-section-padding">
          <div className="container">
            {/* Two Balanced Boxes with Generous Gap */}
            <div className="contact-grid-container">
              {/* Box 1 (Left): Corporate & Support Offices */}
              <div className="contact-main-card contact-card-blue">
                <div>
                  <div className="contact-card-header">
                    <h3 className="contact-card-title">Corporate & Support Offices</h3>
                    <p className="contact-card-subtitle">
                      Official contact channels and registered head office details for Utkarsh Finance.
                    </p>
                  </div>
                  
                  {/* Address Section */}
                  <div className="contact-info-blocks-list">
                    <div className="contact-info-block border-blue">
                      <div className="contact-block-icon">
                        <MapPin size={24} />
                      </div>
                      <div className="contact-block-content">
                        <h4 className="contact-block-title">Registered & Head Office</h4>
                        <p className="contact-block-text">
                          <strong>Utkarsh Finance Limited</strong><br />
                          11/27, Rudraksh complex,<br />
                          Maninagar, Ahmedabad, Gujarat
                        </p>
                      </div>
                    </div>

                    {/* Customer Care Section */}
                    <div className="contact-info-block border-orange">
                      <div className="contact-block-icon">
                        <Phone size={24} />
                      </div>
                      <div className="contact-block-content">
                        <h4 className="contact-block-title">Customer Care & Helpline</h4>
                        <p className="contact-block-text">
                          <strong>Mobile / Helpline:</strong> <a href="tel:8958623532">+91 8958623532</a><br />
                          <strong>Support Desk:</strong> <a href="tel:8958623532">+91 8958623532</a>
                        </p>
                      </div>
                    </div>

                    {/* Email Section */}
                    <div className="contact-info-block border-blue">
                      <div className="contact-block-icon">
                        <Mail size={24} />
                      </div>
                      <div className="contact-block-content">
                        <h4 className="contact-block-title">Email Support</h4>
                        <p className="contact-block-text">
                          <a href="mailto:support@utkarshfinance.in">support@utkarshfinance.in</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-card-footer">
                  <span>Working Hours: Mon - Sat, 9:30 AM - 6:30 PM</span>
                  <span className="text-secondary font-semibold">ISO 9001:2015</span>
                </div>
              </div>

              {/* Box 2 (Right): Quick Message Form */}
              <div className="contact-main-card contact-card-orange">
                <div>
                  <div className="contact-card-header">
                    <h3 className="contact-card-title">Send Us a Message</h3>
                    <p className="contact-card-subtitle">
                      Have a question about loans, interest rates, or services? Leave your message below.
                    </p>
                  </div>

                  {contactSubmitted ? (
                    <div className="text-center p-8 bg-light rounded-xl">
                      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-3">
                        <circle cx="36" cy="36" r="32" stroke="#F37022" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
                        <circle cx="36" cy="36" r="28" fill="#ECFDF5" />
                        <circle cx="36" cy="36" r="22" fill="#10B981" />
                        <path d="M26 36L33 43L46 29" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <h3 className="text-primary mb-2">Message Sent Successfully!</h3>
                      <p className="text-secondary mb-5 text-sm">
                        Thank you! Your query has been recorded in our system. Our customer relationship manager will contact you within 24 hours.
                      </p>
                      <button 
                        onClick={() => {
                          setContactSubmitted(false);
                          setContactErrors({});
                          setContactData({ name: '', phone: '', email: '', subject: 'General Enquiry', message: '' });
                        }} 
                        className="btn btn-outline btn-sm"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="contact-form" noValidate>
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input 
                          type="text" 
                          className={`form-input ${contactErrors.name ? 'input-error' : ''}`}
                          placeholder="Your full name"
                          value={contactData.name}
                          onChange={(e) => handleContactChange('name', e.target.value)}
                        />
                        {contactErrors.name && (
                          <div className="field-error">
                            <AlertCircle size={14} />
                            <span>{contactErrors.name}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid md-grid-2 gap-4">
                        <div className="form-group">
                          <label className="form-label">Phone Number *</label>
                          <input 
                            type="tel" 
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength="10"
                            className={`form-input ${contactErrors.phone ? 'input-error' : ''}`}
                            placeholder="e.g. 9876543210 (10 digits)"
                            value={contactData.phone}
                            onChange={(e) => handleContactChange('phone', e.target.value)}
                          />
                          {contactErrors.phone && (
                            <div className="field-error">
                              <AlertCircle size={14} />
                              <span>{contactErrors.phone}</span>
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email Address *</label>
                          <input 
                            type="email" 
                            className={`form-input ${contactErrors.email ? 'input-error' : ''}`}
                            placeholder="name@email.com"
                            value={contactData.email}
                            onChange={(e) => handleContactChange('email', e.target.value)}
                          />
                          {contactErrors.email && (
                            <div className="field-error">
                              <AlertCircle size={14} />
                              <span>{contactErrors.email}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Message / Enquiry *</label>
                        <textarea 
                          rows="4" 
                          className={`form-textarea ${contactErrors.message ? 'input-error' : ''}`}
                          placeholder="Tell us what you are looking for (minimum 5 characters)..."
                          value={contactData.message}
                          onChange={(e) => handleContactChange('message', e.target.value)}
                        ></textarea>
                        {contactErrors.message && (
                          <div className="field-error">
                            <AlertCircle size={14} />
                            <span>{contactErrors.message}</span>
                          </div>
                        )}
                      </div>

                      <button 
                        type="submit" 
                        disabled={contactLoading}
                        className="btn btn-secondary contact-submit-btn w-full" 
                      >
                        {contactLoading ? 'Submitting to Utkarsh Finance...' : (
                          <>Submit Enquiry <Send size={18} /></>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                <div className="contact-form-footer-note">
                  We respect your privacy. No spam or unsolicited promotions.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Generic and Specific Loan Product Pages
  return (
    <div className="loan-details-page">
      <section className="page-header text-center">
        <div className="container">
          <span className="text-secondary font-semibold text-uppercase">Utkarsh Loan Services</span>
          <h1 className="hero-title text-primary mt-2">{title}</h1>
          <p className="hero-desc mx-auto" style={{ maxWidth: '680px' }}>
            Empower your dreams with Utkarsh Finance {title}. Attractive interest rates, quick sanction, and flexible repayment tenures.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid md-grid-2 gap-10 items-start">
            {/* Features & Benefits */}
            <div>
              <h2 className="mb-4 text-primary">Key Benefits of Utkarsh {title}</h2>
              <p className="text-secondary mb-6">
                Designed to cater to salaried professionals, business owners, entrepreneurs, and families across urban and rural India.
              </p>

              <ul className="list-none mb-8" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li className="flex items-center gap-3 text-secondary-text">
                  <CheckCircle2 className="text-secondary flex-shrink-0" size={20} />
                  <span><strong>Competitive Interest Rates:</strong> Transparent pricing tailored to your credit profile.</span>
                </li>
                <li className="flex items-center gap-3 text-secondary-text">
                  <CheckCircle2 className="text-secondary flex-shrink-0" size={20} />
                  <span><strong>Rapid In-Principle Sanction:</strong> Minimal paperwork with digital verification.</span>
                </li>
                <li className="flex items-center gap-3 text-secondary-text">
                  <CheckCircle2 className="text-secondary flex-shrink-0" size={20} />
                  <span><strong>Customizable Repayment:</strong> Flexible EMI options fitting your monthly cash flow.</span>
                </li>
                <li className="flex items-center gap-3 text-secondary-text">
                  <CheckCircle2 className="text-secondary flex-shrink-0" size={20} />
                  <span><strong>Zero Hidden Charges:</strong> Complete disclosure and transparent loan agreement.</span>
                </li>
                <li className="flex items-center gap-3 text-secondary-text">
                  <CheckCircle2 className="text-secondary flex-shrink-0" size={20} />
                  <span><strong>Doorstep Support:</strong> Dedicated Utkarsh relationship managers to assist you.</span>
                </li>
              </ul>
              
              <div className="flex gap-4 flex-wrap">
                <Link to="/online-loan-apply" className="btn btn-secondary btn-lg">
                  Apply for {title} <ArrowRight size={20} />
                </Link>
                <Link to="/emi-calculator" className="btn btn-outline btn-lg">
                  Calculate EMI
                </Link>
              </div>
            </div>
            
            {/* Eligibility & Documentation Card */}
            <div className="card p-8" style={{ borderTop: '4px solid #0A3871', boxShadow: '0 8px 24px rgba(10,56,113,0.08)' }}>
              <h3 className="mb-6 text-primary">Eligibility & Requirements</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="p-4 bg-light rounded-sm" style={{ borderLeft: '3px solid #F37022' }}>
                  <h5 className="text-primary mb-1">Age Criteria</h5>
                  <p className="text-sm text-secondary-text mb-0">Minimum 21 years at the time of application, up to 65 years at loan maturity.</p>
                </div>
                
                <div className="p-4 bg-light rounded-sm" style={{ borderLeft: '3px solid #0A3871' }}>
                  <h5 className="text-primary mb-1">Employment / Business</h5>
                  <p className="text-sm text-secondary-text mb-0">Salaried employees, self-employed professionals, traders, farmers, or enterprise owners.</p>
                </div>
                
                <div className="p-4 bg-light rounded-sm" style={{ borderLeft: '3px solid #F37022' }}>
                  <h5 className="text-primary mb-1">Required Documents</h5>
                  <p className="text-sm text-secondary-text mb-0">
                    • Identity & Address Proof (Aadhaar / PAN / Voter ID)<br/>
                    • Income Proof (Salary Slips / ITR / Bank Statements)<br/>
                    • Property Documents (for LAP / Home Loan)
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 text-center rounded-sm" style={{ background: '#FFF2EB', border: '1px dashed #F37022' }}>
                <p className="text-xs text-secondary font-semibold mb-1">Need help with eligibility?</p>
                <p className="text-primary font-bold mb-0">Call Helpline: <a href="tel:8958623532" className="text-primary">+91 8958623532</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoanDetails;
