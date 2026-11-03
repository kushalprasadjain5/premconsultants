import test from 'node:test';
import assert from 'node:assert/strict';
import {
  isValidEmail,
  isValidPhone,
  isValidContact,
  validateOrganizationInquiry,
  validateCandidateInquiry,
  formatWhatsAppMessage,
} from './inquiry';

test('contact validation detects valid and invalid emails and phone numbers', () => {
  assert.equal(isValidEmail('prasad.jain@premconsultant.com'), true);
  assert.equal(isValidEmail('invalid-email'), false);

  assert.equal(isValidPhone('9422758727'), true);
  assert.equal(isValidPhone('+91 9423389525'), true);
  assert.equal(isValidPhone('12345'), false);

  assert.equal(isValidContact('test@example.com'), true);
  assert.equal(isValidContact('+919422758727'), true);
  assert.equal(isValidContact('bad-contact'), false);
});

test('organization inquiry validation enforces required corporate fields', () => {
  const invalidResult = validateOrganizationInquiry({
    fullName: '',
    companyName: '',
    contact: '',
    service: '',
  });
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.companyName);
  assert.ok(invalidResult.errors.contact);
  assert.ok(invalidResult.errors.service);

  const validResult = validateOrganizationInquiry({
    fullName: 'Rajesh Sharma',
    companyName: 'Apex Precision Engineering, Pune',
    contact: 'rajesh@apexeng.in',
    service: 'Performance Management Systems (PMS)',
    message: 'Looking to implement Balanced Scorecard for 450 employees.',
  });
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('candidate inquiry validation enforces zero-fee placement form integrity', () => {
  const invalidResult = validateCandidateInquiry({
    fullName: 'A',
    contact: 'wrong',
    targetRole: '',
    hasResume: false,
  });
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.contact);
  assert.ok(invalidResult.errors.targetRole);
  assert.ok(invalidResult.errors.resume);

  const validResult = validateCandidateInquiry({
    fullName: 'Sunil Patil',
    contact: '9822012345',
    targetRole: 'Senior Production Engineer (Automotive)',
    experience: '6 Years',
    hasResume: true,
    resumeFileName: 'Sunil_Patil_CV.pdf',
  });
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('WhatsApp link formatter creates properly URI-encoded messages', () => {
  const encoded = formatWhatsAppMessage('client', {
    fullName: 'Prasad',
    companyName: 'Mahindra',
    contact: '9422758727',
    service: 'Performance Management Systems (PMS)',
  });
  assert.ok(encoded.includes('Prem%20Consultants'));
  assert.ok(encoded.includes('Mahindra'));
});
