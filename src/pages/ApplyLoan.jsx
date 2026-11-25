import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  PhoneCall, 
  AlertCircle,
  Copy,
  Check,
  Printer,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Wallet,
  Briefcase,
  TrendingUp,
  BadgeCheck,
  FileText
} from 'lucide-react';
import { submitLoanApplicationData } from '../services/sheetService';
import { validateLoanApplication } from '../utils/validation';
import './ApplyLoan.css';

const ApplyLoan = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [submissionTime, setSubmissionTime] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    employmentType: 'Salaried',
    monthlyIncome: '',
    loanType: 'Personal Loan',
    loanAmount: '',
    message: '',
    termsAccepted: true
  });

  const handleCopyId = () => {
    if (applicationId) {
      navigator.clipboard.writeText(applicationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setErrors({});
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      city: '',
      employmentType: 'Salaried',
      monthlyIncome: '',
      loanType: 'Personal Loan',
      loanAmount: '',
      message: '',
      termsAccepted: true
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let val = type === 'checkbox' ? checked : value;
    
    // Strict numeric 10-digit limit for phone
    if (name === 'phone') {
      val = value.replace(/\D/g, '').slice(0, 10);
    }

    setFormData((prev) => ({ ...prev, [name]: val }));
    
    // Clear error for this field as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form using Zod + Validator
    const validation = validateLoanApplication(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Scroll to the first error
      const firstErrorField = Object.keys(validation.errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    setLoading(true);
    setErrors({});

    const generatedId = 'UTK-' + Math.floor(100000 + Math.random() * 900000);
    setApplicationId(generatedId);
    setSubmissionTime(new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }));

    // Send validated & cleaned data to Google Sheets in real-time
    await submitLoanApplicationData({
      applicationId: generatedId,
      ...validation.cleanedData,
    });

    setLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="apply-loan-page">
      <section className="page-header text-center">
        <div className="container">
          <span className="text-secondary font-semibold text-uppercase">आपकी उम्मीद का फाइनेंस</span>
          <h1 className="hero-title text-primary mt-2">Apply for a Loan</h1>
          <p className="hero-desc mx-auto" style={{ maxWidth: '620px' }}>
            Experience paperless, transparent, and fast loan approvals with Utkarsh Finance.
          </p>
        </div>
      </section>

      <section className="loan-section-padding">
        <div className="container">
          <div className={`loan-card-box ${isSubmitted ? 'confirmation-container' : ''}`}>
            {isSubmitted ? (
              <div className="success-screen-wrapper">
                {/* SVG Animated Success Hero */}
                <div className="success-hero">
                  <div className="success-svg-wrap">
                    <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg" className="success-svg">
                      <circle cx="52" cy="52" r="48" stroke="#F37022" strokeWidth="2" strokeDasharray="6 6" opacity="0.4" className="pulse-circle" />
                      <circle cx="52" cy="52" r="42" fill="#ECFDF5" />
                      <circle cx="52" cy="52" r="34" fill="url(#successGradient)" />
                      <defs>
                        <linearGradient id="successGradient" x1="18" y1="18" x2="86" y2="86" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#10B981" />
                          <stop offset="1" stopColor="#047857" />
                        </linearGradient>
                      </defs>
                      {/* Confetti & Sparkles */}
                      <path d="M20 32L23 35L20 38L17 35Z" fill="#F37022" />
                      <path d="M84 28L87 31L84 34L81 31Z" fill="#0A3871" />
                      <path d="M16 70L18 72L16 74L14 72Z" fill="#10B981" />
                      <path d="M88 72L90 74L88 76L86 74Z" fill="#F37022" />
                      <circle cx="28" cy="20" r="2.5" fill="#F59E0B" />
                      <circle cx="76" cy="20" r="2.5" fill="#10B981" />
                      {/* Bold Checkmark */}
                      <path d="M42 53L49 60L64 44" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  
                  <div className="official-seal-pill">
                    <BadgeCheck size={16} />
                    <span>Official Application Acknowledgement</span>
                  </div>
                  
                  <h2 className="success-hero-title">
                    Application Submitted Successfully!
                  </h2>
                  <p className="success-hero-desc">
                    Thank you, <strong>{formData.fullName}</strong>. Your loan application has been registered securely in Utkarsh Finance core system.
                  </p>
                </div>

                {/* Application Reference ID Card */}
                <div className="ref-id-card">
                  <div className="ref-id-header">
                    <div>
                      <span className="ref-id-label">Application Reference ID</span>
                      <div className="ref-id-number-row">
                        <h3 className="ref-id-val">{applicationId}</h3>
                        <button
                          type="button"
                          onClick={handleCopyId}
                          className="copy-id-btn"
                          title="Copy Reference ID"
                        >
                          {copied ? (
                            <>
                              <Check size={13} style={{ color: '#10B981' }} />
                              <span style={{ color: '#10B981' }}>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="status-indicator-wrap">
                      <span className="live-status-pill">
                        <span className="pulsing-green-dot"></span> In Process
                      </span>
                      <div className="submission-timestamp">
                        <Clock size={12} /> {submissionTime || 'Just now'}
                      </div>
                    </div>
                  </div>

                  <div className="ref-card-footer">
                    <span>Utkarsh Finance • आपकी उम्मीद का फाइनेंस</span>
                    <span className="ref-card-secure-tag">
                      <ShieldCheck size={15} style={{ color: '#F37022' }} /> 256-Bit SSL Encrypted
                    </span>
                  </div>
                </div>

                {/* Digital Slip Details Grid */}
                <div className="summary-slip-card">
                  <div className="slip-section-title">
                    <FileText size={16} style={{ color: '#F37022' }} />
                    <span>Application Summary Details</span>
                  </div>

                  <div className="summary-slip-grid">
                    <div className="slip-tile">
                      <span className="slip-tile-label">
                        <User size={13} style={{ color: '#F37022' }} /> Full Name
                      </span>
                      <strong className="slip-tile-value">{formData.fullName}</strong>
                    </div>

                    <div className="slip-tile">
                      <span className="slip-tile-label">
                        <Phone size={13} style={{ color: '#F37022' }} /> Contact Number
                      </span>
                      <strong className="slip-tile-value">+91 {formData.phone}</strong>
                    </div>

                    <div className="slip-tile">
                      <span className="slip-tile-label">
                        <CreditCard size={13} style={{ color: '#F37022' }} /> Loan Category
                      </span>
                      <strong className="slip-tile-value">{formData.loanType}</strong>
                    </div>

                    <div className="slip-tile highlight-gold">
                      <span className="slip-tile-label">
                        <Wallet size={13} style={{ color: '#F37022' }} /> Required Amount
                      </span>
                      <strong className="slip-tile-value">
                        ₹{Number(formData.loanAmount || 0).toLocaleString('en-IN')}
                      </strong>
                    </div>

                    <div className="slip-tile">
                      <span className="slip-tile-label">
                        <Mail size={13} style={{ color: '#F37022' }} /> Email Address
                      </span>
                      <strong className="slip-tile-value">{formData.email}</strong>
                    </div>

                    <div className="slip-tile">
                      <span className="slip-tile-label">
                        <MapPin size={13} style={{ color: '#F37022' }} /> City / District
                      </span>
                      <strong className="slip-tile-value" style={{ textTransform: 'capitalize' }}>{formData.city}</strong>
                    </div>

                    <div className="slip-tile">
                      <span className="slip-tile-label">
                        <Briefcase size={13} style={{ color: '#F37022' }} /> Employment Type
                      </span>
                      <strong className="slip-tile-value">{formData.employmentType}</strong>
                    </div>

                    <div className="slip-tile">
                      <span className="slip-tile-label">
                        <TrendingUp size={13} style={{ color: '#F37022' }} /> Monthly Income
                      </span>
                      <strong className="slip-tile-value">
                        ₹{Number(formData.monthlyIncome || 0).toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* 4-Step Roadmap Stepper */}
                <div className="roadmap-card">
                  <div className="slip-section-title">
                    <Sparkles size={16} style={{ color: '#F37022' }} />
                    <span>What Happens Next? (Sanction Roadmap)</span>
                  </div>

                  <div className="roadmap-grid">
                    <div className="step-tile step-tile-completed">
                      <div className="step-tile-top">
                        <span className="step-badge-num completed">✓</span>
                        <span className="step-title" style={{ color: '#065F46' }}>1. Submitted</span>
                      </div>
                      <p className="step-desc">Securely registered in Utkarsh Cloud DB.</p>
                    </div>

                    <div className="step-tile step-tile-active">
                      <div className="step-tile-top">
                        <span className="step-badge-num active">2</span>
                        <span className="step-title" style={{ color: '#9A3412' }}>2. Verification</span>
                      </div>
                      <p className="step-desc">Our executive will call on <strong>{formData.phone}</strong> in 15–30 mins.</p>
                    </div>

                    <div className="step-tile">
                      <div className="step-tile-top">
                        <span className="step-badge-num upcoming">3</span>
                        <span className="step-title">3. Sanction Letter</span>
                      </div>
                      <p className="step-desc">Instant digital sanction letter issued online.</p>
                    </div>

                    <div className="step-tile">
                      <div className="step-tile-top">
                        <span className="step-badge-num upcoming">4</span>
                        <span className="step-title">4. Disbursal</span>
                      </div>
                      <p className="step-desc">Direct funds credit to your verified bank account.</p>
                    </div>
                  </div>
                </div>

                {/* Security Tip Box */}
                <div className="security-tip-card">
                  <ShieldCheck size={22} style={{ color: '#D97706', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong>Security Advisory:</strong> Utkarsh Finance never asks for advance payment, processing fees, OTP, or UPI PIN over phone or WhatsApp. Always keep your application reference ID confidential.
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="receipt-actions-row">
                  <button 
                    type="button"
                    onClick={handlePrintReceipt}
                    className="btn btn-outline"
                  >
                    <Printer size={16} /> Print / Save Slip
                  </button>

                  <a href="tel:8958623532" className="btn btn-secondary">
                    <PhoneCall size={16} /> Helpline: +91 8958623532
                  </a>

                  <button 
                    type="button"
                    onClick={handleResetForm}
                    className="btn btn-primary"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="loan-form" noValidate>
                <div className="flex items-center justify-between mb-6 pb-3 border-b">
                  <h3 className="text-primary mb-0">Loan Application Form</h3>
                  <span className="text-xs font-semibold text-secondary flex items-center gap-1">
                    <Lock size={12} /> 256-Bit SSL Secure
                  </span>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">Full Name (As per Aadhaar/PAN) *</label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName" 
                      className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Ramesh Kumar"
                    />
                    {errors.fullName && (
                      <div className="field-error">
                        <AlertCircle size={14} />
                        <span>{errors.fullName}</span>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Mobile Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength="10"
                      className={`form-input ${errors.phone ? 'input-error' : ''}`}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210 (10 digits)"
                    />
                    {errors.phone && (
                      <div className="field-error">
                        <AlertCircle size={14} />
                        <span>{errors.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-grid mt-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ramesh@example.com"
                    />
                    {errors.email && (
                      <div className="field-error">
                        <AlertCircle size={14} />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="city">City / District *</label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city" 
                      className={`form-input ${errors.city ? 'input-error' : ''}`}
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Ahmedabad, Surat, Vadodara"
                    />
                    {errors.city && (
                      <div className="field-error">
                        <AlertCircle size={14} />
                        <span>{errors.city}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-grid mt-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="loanType">Select Loan Category *</label>
                    <select 
                      id="loanType" 
                      name="loanType" 
                      className={`form-select ${errors.loanType ? 'input-error' : ''}`}
                      value={formData.loanType}
                      onChange={handleChange}
                    >
                      <option value="Personal Loan">Personal Loan</option>
                      <option value="Home Loan">Home Loan</option>
                      <option value="MSME Loan">MSME Loan</option>
                      <option value="Business Loan">Business Loan</option>
                      <option value="Loan Against Property">Loan Against Property (LAP)</option>
                      <option value="Vehicle Loan">Vehicle & Car Loan</option>
                      <option value="Education Loan">Education Loan</option>
                    </select>
                    {errors.loanType && (
                      <div className="field-error">
                        <AlertCircle size={14} />
                        <span>{errors.loanType}</span>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="loanAmount">Required Amount (₹) *</label>
                    <input 
                      type="number" 
                      id="loanAmount" 
                      name="loanAmount" 
                      className={`form-input ${errors.loanAmount ? 'input-error' : ''}`}
                      value={formData.loanAmount}
                      onChange={handleChange}
                      placeholder="e.g. 500000"
                    />
                    {errors.loanAmount && (
                      <div className="field-error">
                        <AlertCircle size={14} />
                        <span>{errors.loanAmount}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-grid mt-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="employmentType">Employment Type</label>
                    <select 
                      id="employmentType" 
                      name="employmentType" 
                      className="form-select"
                      value={formData.employmentType}
                      onChange={handleChange}
                    >
                      <option value="Salaried">Salaried (Private / Govt)</option>
                      <option value="Self-Employed Professional">Self-Employed Professional</option>
                      <option value="Business Owner">Business Owner / Trader</option>
                      <option value="Agriculture / Allied">Agriculture / Allied</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="monthlyIncome">Approx. Monthly Income (₹)</label>
                    <input 
                      type="number" 
                      id="monthlyIncome" 
                      name="monthlyIncome" 
                      className={`form-input ${errors.monthlyIncome ? 'input-error' : ''}`}
                      value={formData.monthlyIncome}
                      onChange={handleChange}
                      placeholder="e.g. 45000"
                    />
                    {errors.monthlyIncome && (
                      <div className="field-error">
                        <AlertCircle size={14} />
                        <span>{errors.monthlyIncome}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="form-group mt-2">
                  <label className="form-label" htmlFor="message">Special Remarks / Preferred Branch</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    className="form-textarea" 
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter any additional details or preferred branch location..."
                  ></textarea>
                </div>

                <div className="form-group mt-4">
                  <label className="flex items-center gap-2 text-sm text-secondary" style={{ cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      name="termsAccepted" 
                      checked={formData.termsAccepted} 
                      onChange={handleChange}
                      style={{ accentColor: '#F37022' }}
                    />
                    <span>
                      I authorize Utkarsh Finance to contact me via Call, SMS, WhatsApp, or Email regarding this loan inquiry.
                    </span>
                  </label>
                  {errors.termsAccepted && (
                    <div className="field-error">
                      <AlertCircle size={14} />
                      <span>{errors.termsAccepted}</span>
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-secondary w-full mt-6" 
                  style={{ padding: '0.9rem', fontSize: '1.05rem', fontWeight: 700 }}
                >
                  {loading ? 'Submitting to Utkarsh Finance...' : (
                    <>Submit Loan Application <Send size={18} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyLoan;
