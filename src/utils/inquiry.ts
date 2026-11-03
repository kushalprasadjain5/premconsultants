/**
 * Business logic and validation utilities for Prem Consultants
 */

export interface OrganizationInquiry {
  fullName: string;
  companyName: string;
  contact: string;
  service: string;
  message?: string;
}

export interface CandidateInquiry {
  fullName: string;
  contact: string;
  targetRole: string;
  experience?: string;
  hasResume: boolean;
  resumeFileName?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const VALID_SERVICES = [
  'Performance Management Systems (PMS)',
  'HR Process Consulting & OD',
  'Corporate Training & Capability Building',
  'Strategic Talent Acquisition & Recruitment',
  'General Strategic Advisory',
] as const;

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\+\(\)]/g, '');
  return cleaned.length >= 10 && cleaned.length <= 13 && /^\d+$/.test(cleaned);
}

export function isValidContact(contact: string): boolean {
  const trimmed = contact.trim();
  return isValidEmail(trimmed) || isValidPhone(trimmed);
}

export function validateOrganizationInquiry(data: OrganizationInquiry): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!data.companyName || data.companyName.trim().length < 2) {
    errors.companyName = 'Please enter your organization name and location.';
  }

  if (!data.contact || !isValidContact(data.contact)) {
    errors.contact = 'Please enter a valid work email or 10-digit WhatsApp/mobile number.';
  }

  if (!data.service || !VALID_SERVICES.includes(data.service as any)) {
    errors.service = 'Please select a valid consulting service.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateCandidateInquiry(data: CandidateInquiry): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!data.contact || !isValidContact(data.contact)) {
    errors.contact = 'Please enter a valid email or 10-digit phone number.';
  }

  if (!data.targetRole || data.targetRole.trim().length < 2) {
    errors.targetRole = 'Please specify your target functional role or department.';
  }

  if (!data.hasResume) {
    errors.resume = 'Please attach your CV / Resume (PDF or DOCX format).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatWhatsAppMessage(type: 'client' | 'candidate', payload: Record<string, any>): string {
  if (type === 'client') {
    const text = `Hello Prem Consultants, I would like to inquire about strategic consulting services.\n\nName: ${payload.fullName}\nCompany: ${payload.companyName}\nContact: ${payload.contact}\nService: ${payload.service}\nNotes: ${payload.message || 'N/A'}`;
    return encodeURIComponent(text);
  } else {
    const text = `Hello Prem Consultants, I am applying for opportunities through your candidate portal (Ethical Candidate Placement).\n\nName: ${payload.fullName}\nRole: ${payload.targetRole}\nContact: ${payload.contact}\nExperience: ${payload.experience || 'Not specified'}`;
    return encodeURIComponent(text);
  }
}
