import { GOOGLE_SHEET_WEB_APP_URL } from '../config/sheetConfig.js';

/**
 * Submit Form Data to Google Sheets via Google Apps Script Web App
 * 
 * Uses standard urlencoded payload with mode: 'no-cors' to guarantee
 * zero CORS failures across all devices and browsers.
 */
export async function sendToGoogleSheet(formData) {


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

    

    // Send POST request with no-cors to bypass cross-origin redirect restrictions
    await fetch(GOOGLE_SHEET_WEB_APP_URL, {
      method: 'POST',
      body: payload,
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    console.groupEnd();

    return { success: true };
  } catch (error) {

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
