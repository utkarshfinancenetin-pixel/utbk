/**
 * Google Sheet Integration Config
 * Connected to Spreadsheet: https://docs.google.com/spreadsheets/d/12SyKh0ARrLAPICFm-_ZVXp-CymKxMfrd0X4QUYYftm8/edit
 */

export const GOOGLE_SHEET_WEB_APP_URL = 
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GOOGLE_SHEET_URL) || 
  "https://script.google.com/macros/s/AKfycbyB99EJDwmGJ3yhw-1ze2p-L1nV2sr_zh41pHKe5deKAHf71c4SnOmN0913DPJQ5v7b4Q/exec";
