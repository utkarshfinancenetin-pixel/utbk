import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Users, TrendingUp, Award, Building, Landmark, CheckCircle2, ArrowRight } from 'lucide-react';

const About = () => {
  return (
    <div className="about-page">
      {/* Page Header */}
      <section className="page-header text-center">
        <div className="container">
          <span className="text-secondary font-semibold text-uppercase" style={{ letterSpacing: '1px' }}>
            आपकी उम्मीद का फाइनेंस
          </span>
          <h1 className="hero-title text-primary mt-2">About Utkarsh Finance</h1>
          <p className="hero-desc mx-auto" style={{ maxWidth: '650px' }}>
            Empowering dreams, driving financial inclusion, and delivering dependable finance solutions across India since inception.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container">
          <div className="card p-6 md:p-12 mb-12" style={{ borderTop: '4px solid #F37022', boxShadow: '0 8px 24px rgba(10, 56, 113, 0.08)' }}>
            <h2 className="section-title text-center mb-8 text-primary">Our Journey & Philosophy</h2>
            <div className="grid md-grid-2 gap-8 text-secondary" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
              <div>
                <p>
                  <strong>Utkarsh Finance</strong> began its operations with a vision to provide accessible and affordable financial products to the underserved and unserved segments of the nation.
                </p>
                <p>
                  Over the years, we have transitioned into a robust, technology-driven financial institution regulated by RBI guidelines. Today, we provide complete retail credit services, affordable home loans, micro-financing, MSME loans, and flexible financing schemes to over 10,000+ customers across 5 states.
                </p>
              </div>
              <div>
                <p>
                  At Utkarsh Finance, customer satisfaction and trust are our ultimate goals. Our motto, <em>"Aapki Umeed Ka Finance"</em> (Your Trust in Finance), embodies our dedication to standing alongside every Indian family and enterprise as they realize their financial aspirations.
                </p>
                <p>
                  With transparent processes, zero hidden charges, and digital-first doorstep finance, we aim to bridge the credit divide and foster sustainable socio-economic development.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Finance Highlights */}
          <div className="grid md-grid-4 gap-6 mb-12">
            <div className="card text-center p-6" style={{ borderTop: '3px solid #0A3871' }}>
              <Landmark size={40} className="text-secondary mx-auto mb-3" />
              <h3 className="text-primary mb-1">RBI Regulated</h3>
              <p className="text-sm text-secondary mb-0">Registered Finance Institution</p>
            </div>
            <div className="card text-center p-6" style={{ borderTop: '3px solid #0A3871' }}>
              <Users size={40} className="text-secondary mx-auto mb-3" />
              <h3 className="text-primary mb-1">10,000+</h3>
              <p className="text-sm text-secondary mb-0">Satisfied Active Borrowers & Clients</p>
            </div>
            <div className="card text-center p-6" style={{ borderTop: '3px solid #0A3871' }}>
              <Building size={40} className="text-secondary mx-auto mb-3" />
              <h3 className="text-primary mb-1">10+</h3>
              <p className="text-sm text-secondary mb-0">Branches Across 5 States</p>
            </div>
            <div className="card text-center p-6" style={{ borderTop: '3px solid #0A3871' }}>
              <Award size={40} className="text-secondary mx-auto mb-3" />
              <h3 className="text-primary mb-1">9+ Years</h3>
              <p className="text-sm text-secondary mb-0">Of Proven Integrity & Growth</p>
            </div>
          </div>

          {/* Core Values */}
          <div className="text-center mb-12">
            <h6 className="text-secondary font-semibold mb-2 text-uppercase">What Drives Us</h6>
            <h2 className="section-title text-primary">Our Core Values</h2>
            <p className="max-w-2xl mx-auto text-secondary-text">
              The fundamental principles that guide our interactions, services, and commitment to every customer.
            </p>
          </div>

          <div className="grid md-grid-4 gap-6 mb-12">
             <div className="card text-center p-6" style={{ borderTop: '4px solid #0A3871' }}>
               <ShieldCheck size={44} className="text-secondary mx-auto mb-4" />
               <h4 className="mb-2 text-primary">Trust & Transparency</h4>
               <p className="text-sm text-secondary">Complete clarity in our pricing, terms, and conditions with zero hidden charges.</p>
             </div>
             <div className="card text-center p-6" style={{ borderTop: '4px solid #0A3871' }}>
               <Target size={44} className="text-secondary mx-auto mb-4" />
               <h4 className="mb-2 text-primary">Customer Centricity</h4>
               <p className="text-sm text-secondary">Tailoring financial solutions to match the unique needs of every household and business.</p>
             </div>
             <div className="card text-center p-6" style={{ borderTop: '4px solid #0A3871' }}>
               <TrendingUp size={44} className="text-secondary mx-auto mb-4" />
               <h4 className="mb-2 text-primary">Financial Inclusion</h4>
               <p className="text-sm text-secondary">Reaching unserved and underserved segments to fuel grassroot economic prosperity.</p>
             </div>
             <div className="card text-center p-6" style={{ borderTop: '4px solid #0A3871' }}>
               <Award size={44} className="text-secondary mx-auto mb-4" />
               <h4 className="mb-2 text-primary">Excellence</h4>
               <p className="text-sm text-secondary">Continuously elevating our technology, customer experience, and banking benchmarks.</p>
             </div>
          </div>

          {/* Call to action */}
          <div className="card text-center p-8 bg-light" style={{ border: '1px solid #CBD5E1', borderRadius: '14px' }}>
            <h3 className="text-primary mb-2">Need Financial Assistance Today?</h3>
            <p className="text-secondary mb-6 max-w-2xl mx-auto">
              Our financial advisors are available across branches and digital channels to assist you with fast approvals.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/online-loan-apply" className="btn btn-secondary">
                Apply For Loan Online <ArrowRight size={18} />
              </Link>
              <Link to="/contact-us" className="btn btn-outline">
                Contact Nearest Branch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
