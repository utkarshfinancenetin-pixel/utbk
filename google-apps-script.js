/**
 * =========================================================================
 * UTKARSH FINANCE - GOOGLE APPS SCRIPT WEB APP FOR GOOGLE SHEETS
 * Spreadsheet ID: 12SyKh0ARrLAPICFm-_ZVXp-CymKxMfrd0X4QUYYftm8
 * =========================================================================
 * 
 * HOW TO INSTALL (2 Minutes):
 * 1. Open your Google Sheet (https://docs.google.com/spreadsheets/d/12SyKh0ARrLAPICFm-_ZVXp-CymKxMfrd0X4QUYYftm8/edit)
 * 2. In the top menu, click on "Extensions" > "Apps Script".
 * 3. Delete any default code in Code.gs and paste THIS ENTIRE FILE.
 * 4. Click the "Save" icon (Floppy disk).
 * 5. In the top right, click "Deploy" > "New deployment".
 * 6. Click the gear icon (⚙️) next to "Select type" and choose "Web app".
 * 7. Fill in:
 *    - Description: "Utkarsh Finance Form Submissions"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone" (VERY IMPORTANT!)
 * 8. Click "Deploy", review permissions, and click "Allow".
 * 9. Copy the "Web app URL" (looks like https://script.google.com/macros/s/.../exec).
 * 10. Paste it into `src/config/sheetConfig.js` or in `.env` as `VITE_GOOGLE_SHEET_URL`.
 * =========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Wait up to 10 seconds for concurrent writes

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      // Fallback if not running bound to active spreadsheet
      ss = SpreadsheetApp.openById("12SyKh0ARrLAPICFm-_ZVXp-CymKxMfrd0X4QUYYftm8");
    }

    // Extract parameters from POST (supports form-urlencoded and JSON)
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    var formType = data.formType || "loan_application";
    var timestamp = new Date();
    var formattedDate = Utilities.formatDate(timestamp, "Asia/Kolkata", "dd-MMM-yyyy HH:mm:ss");

    if (formType === "loan_application") {
      // Sheet 1: Loan Applications
      var sheetName = "Loan Applications";
      var sheet = ss.getSheetByName(sheetName);

      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        var headers = [
          "Timestamp",
          "Application ID",
          "Full Name",
          "Mobile Number",
          "Email",
          "City / District",
          "Loan Category",
          "Loan Amount (₹)",
          "Employment Type",
          "Monthly Income (₹)",
          "Remarks / Preferred Branch",
          "Status"
        ];
        sheet.appendRow(headers);
        formatHeaderRow(sheet, "#0A3871", "#FFFFFF"); // Utkarsh Corporate Navy Blue
      }

      sheet.appendRow([
        formattedDate,
        data.applicationId || "N/A",
        data.fullName || "",
        data.phone ? "'" + data.phone : "", // Prefix with quote so leading zeros are preserved
        data.email || "",
        data.city || "",
        data.loanType || "",
        data.loanAmount ? Number(data.loanAmount) : "",
        data.employmentType || "",
        data.monthlyIncome ? Number(data.monthlyIncome) : "",
        data.message || "",
        "New / Pending Review"
      ]);

      // Remove default empty "Sheet1" if it exists and has no data
      cleanupDefaultSheet(ss);

    } else if (formType === "contact_enquiry") {
      // Sheet 2: Contact Enquiries
      var sheetName = "Contact Enquiries";
      var sheet = ss.getSheetByName(sheetName);

      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
        var headers = [
          "Timestamp",
          "Full Name",
          "Phone Number",
          "Email",
          "Subject / Category",
          "Enquiry Message",
          "Status"
        ];
        sheet.appendRow(headers);
        formatHeaderRow(sheet, "#F37022", "#FFFFFF"); // Utkarsh Vibrant Orange
      }

      sheet.appendRow([
        formattedDate,
        data.name || data.fullName || "",
        data.phone ? "'" + data.phone : "",
        data.email || "",
        data.subject || "General Enquiry",
        data.message || "",
        "Unread Enquiry"
      ]);

      cleanupDefaultSheet(ss);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Data recorded successfully in sheet: " + (formType === "contact_enquiry" ? "Contact Enquiries" : "Loan Applications")
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "Utkarsh Finance - Google Sheets Webhook",
    spreadsheet: "Connected"
  })).setMimeType(ContentService.MimeType.JSON);
}

// Helper to format header row with custom colors and freeze row 1
function formatHeaderRow(sheet, bgColor, fontColor) {
  var headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  headerRange.setBackground(bgColor);
  headerRange.setFontColor(fontColor);
  headerRange.setFontWeight("bold");
  headerRange.setFontFamily("Segoe UI");
  headerRange.setFontSize(11);
  headerRange.setVerticalAlignment("middle");
  sheet.setRowHeight(1, 38);
  sheet.setFrozenRows(1);

  // Auto-resize columns
  for (var i = 1; i <= sheet.getLastColumn(); i++) {
    sheet.setColumnWidth(i, 160);
  }
  sheet.setColumnWidth(1, 180); // Timestamp
  sheet.setColumnWidth(sheet.getLastColumn(), 160); // Status
}

// Remove default blank "Sheet1" once our customized sheets exist
function cleanupDefaultSheet(ss) {
  try {
    var defaultSheet = ss.getSheetByName("Sheet1");
    if (defaultSheet && defaultSheet.getLastRow() === 0 && ss.getSheets().length > 1) {
      ss.deleteSheet(defaultSheet);
    }
  } catch (e) {
    // Ignore if Sheet1 is already deleted or active
  }
}
