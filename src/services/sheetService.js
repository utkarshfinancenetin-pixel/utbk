import { GOOGLE_SHEET_WEB_APP_URL } from '../config/sheetConfig.js';

/**
 * Submit Form Data to Google Sheets via Google Apps Script Web App
 * 
 * Uses standard urlencoded payload with mode: 'no-cors' to guarantee
 * zero CORS failures across all devices and browsers.
 */
export async function sendToGoogleSheet(formData) {
  console.group('🚀 [Utkarsh Finance -> Google Sheets]');
  console.log('📝 Form Type:', formData.formType || 'general');
  console.log('🔗 Target Web App URL:', GOOGLE_SHEET_WEB_APP_URL);
  console.log('📦 Data Payload to be saved:', formData);

  // If user hasn't deployed Google Apps Script URL yet, log warning and return success gracefully
  if (!GOOGLE_SHEET_WEB_APP_URL || GOOGLE_SHEET_WEB_APP_URL.trim() === '') {
    console.warn(
      '⚠️ [Google Sheets Warning]: Web App URL not configured in src/config/sheetConfig.js. Data logged locally.'
    );
    console.groupEnd();
    return { success: true, simulated: true };
  }

  try {
    const payload = new URLSearchParams();

    // Add all form fields to payload
    Object.keys(formData).forEach((key) => {
      const val = formData[key] !== undefined && formData[key] !== null ? formData[key] : '';
      payload.append(key, val);
    });

    // Add browser submission timestamp
    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    payload.append('submissionDate', now);

    console.log('⏳ Sending POST request to Google Apps Script...');

    // Send POST request with no-cors to bypass cross-origin redirect restrictions
    await fetch(GOOGLE_SHEET_WEB_APP_URL, {
      method: 'POST',
      body: payload,
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.log('✅ Form submission successfully sent to Google Sheet at:', now);
    console.log('📊 Check your Google Sheet tab ("Loan Applications" / "Contact Enquiries") to see the new row!');
    console.groupEnd();

    return { success: true };
  } catch (error) {
    console.error('❌ [Google Sheets Integration Error]:', error);
    console.groupEnd();
    return { success: false, error: error.message };
  }
}

/**
 * Submit Loan Application
 */
export async function submitLoanApplicationData(applicationData) {
  return await sendToGoogleSheet({
    formType: 'loan_application',
    ...applicationData,
  });
}

/**
 * Submit Contact Enquiry
 */
export async function submitContactEnquiryData(enquiryData) {
  return await sendToGoogleSheet({
    formType: 'contact_enquiry',
    ...enquiryData,
  });
}
