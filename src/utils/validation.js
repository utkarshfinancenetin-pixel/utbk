import validator from 'validator';
import { z } from 'zod';

/**
 * Clean phone number by removing spaces, dashes, +91, leading 0
 */
export function sanitizeIndianPhone(phone) {
  if (!phone) return '';
  let cleaned = phone.replace(/[\s\-\(\)]/g, '');
  if (cleaned.startsWith('+91')) {
    cleaned = cleaned.slice(3);
  } else if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2);
  } else if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Check if a number is a valid 10-digit Mobile Number
 * Accepts any 10-digit numeric phone number
 */
export function isValidIndianMobile(phone) {
  const sanitized = sanitizeIndianPhone(phone);
  return /^\d{10}$/.test(sanitized);
}

/**
 * Zod Schema for Loan Application
 */
export const loanApplicationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, { message: 'Full name must be at least 3 characters long' })
    .max(60, { message: 'Full name cannot exceed 60 characters' })
    .refine((val) => /^[a-zA-Z\s.]+$/.test(val), {
      message: 'Name can only contain alphabets and spaces',
    }),

  phone: z
    .string()
    .trim()
    .refine(isValidIndianMobile, {
      message: 'Please enter a valid 10-digit mobile number',
    }),

  email: z
    .string()
    .trim()
    .refine((val) => validator.isEmail(val), {
      message: 'Please enter a valid email address (e.g. name@example.com)',
    }),

  city: z
    .string()
    .trim()
    .min(2, { message: 'Please enter your city/district name' })
    .max(50, { message: 'City name is too long' }),

  loanType: z
    .string()
    .min(1, { message: 'Please select a loan category' }),

  loanAmount: z
    .coerce
    .number({ invalid_type_error: 'Loan amount must be a number' })
    .min(10000, { message: 'Minimum loan amount is ₹10,000' })
    .max(100000000, { message: 'Maximum loan amount is ₹10 Crore' }),

  employmentType: z
    .string()
    .min(1, { message: 'Please select an employment type' }),

  monthlyIncome: z
    .union([
      z.string().length(0),
      z.coerce.number().min(3000, { message: 'Monthly income must be at least ₹3,000' }),
    ])
    .optional(),

  termsAccepted: z
    .boolean()
    .refine((val) => val === true, {
      message: 'You must accept the terms to proceed',
    }),
});

/**
 * Validate Loan Application Form
 * Returns { isValid: boolean, errors: Record<string, string>, cleanedData: object }
 */
export function validateLoanApplication(data) {
  const errors = {};
  
  const result = loanApplicationSchema.safeParse(data);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (field && !errors[field]) {
        errors[field] = issue.message;
      }
    });
    return { isValid: false, errors };
  }

  return { 
    isValid: true, 
    errors: {}, 
    cleanedData: {
      ...data,
      phone: sanitizeIndianPhone(data.phone),
    } 
  };
}

/**
 * Zod Schema for Contact Enquiry Form
 */
export const contactEnquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(60, { message: 'Name cannot exceed 60 characters' })
    .refine((val) => /^[a-zA-Z\s.]+$/.test(val), {
      message: 'Name can only contain alphabets and spaces',
    }),

  phone: z
    .string()
    .trim()
    .refine(isValidIndianMobile, {
      message: 'Please enter a valid 10-digit mobile number',
    }),

  email: z
    .string()
    .trim()
    .refine((val) => validator.isEmail(val), {
      message: 'Please enter a valid email address',
    }),

  message: z
    .string()
    .trim()
    .min(5, { message: 'Message must be at least 5 characters long' })
    .max(1000, { message: 'Message cannot exceed 1000 characters' }),
});

/**
 * Validate Contact Enquiry Form
 */
export function validateContactEnquiry(data) {
  const errors = {};
  const result = contactEnquirySchema.safeParse(data);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0];
      if (field && !errors[field]) {
        errors[field] = issue.message;
      }
    });
    return { isValid: false, errors };
  }

  return { 
    isValid: true, 
    errors: {}, 
    cleanedData: {
      ...data,
      phone: sanitizeIndianPhone(data.phone),
    } 
  };
}
