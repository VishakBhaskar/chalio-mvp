import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

/**
 * Validate phone number format
 * @param {string} phoneNumber - Phone number to validate
 * @param {string} countryCode - Country code (default: 'US')
 * @returns {object} - { isValid: boolean, formatted: string, error: string }
 */
export const validatePhoneNumber = (phoneNumber, countryCode = 'US') => {
  try {
    // Remove all non-digit characters except +
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');

    if (!cleaned) {
      return {
        isValid: false,
        formatted: '',
        error: 'Phone number is required'
      };
    }

    // Check if it's a valid phone number
    const isValid = isValidPhoneNumber(cleaned, countryCode);

    if (!isValid) {
      return {
        isValid: false,
        formatted: cleaned,
        error: 'Invalid phone number format'
      };
    }

    // Parse and format the phone number
    const parsedNumber = parsePhoneNumber(cleaned, countryCode);

    return {
      isValid: true,
      formatted: parsedNumber.format('E.164'), // Returns format like +1234567890
      displayFormatted: parsedNumber.formatNational(), // Returns format like (123) 456-7890
      error: ''
    };
  } catch (error) {
    return {
      isValid: false,
      formatted: phoneNumber,
      error: 'Invalid phone number'
    };
  }
};

/**
 * Format phone number as user types
 * @param {string} value - Current input value
 * @param {string} countryCode - Country code (default: 'US')
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumberInput = (value, countryCode = 'US') => {
  // Remove all non-digit characters
  const cleaned = value.replace(/\D/g, '');

  // Format for US numbers: (XXX) XXX-XXXX
  if (countryCode === 'US') {
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  }

  return cleaned;
};

/**
 * Check if phone number is complete (has minimum required digits)
 * @param {string} phoneNumber - Phone number to check
 * @param {string} countryCode - Country code (default: 'US')
 * @returns {boolean} - True if phone number has enough digits
 */
export const isPhoneNumberComplete = (phoneNumber, countryCode = 'US') => {
  const cleaned = phoneNumber.replace(/\D/g, '');

  if (countryCode === 'US') {
    return cleaned.length === 10;
  }

  return cleaned.length >= 10;
};
