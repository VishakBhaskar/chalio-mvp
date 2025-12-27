import React, { useState } from 'react';
import { validatePhoneNumber, formatPhoneNumberInput, isPhoneNumberComplete } from '../utils/phoneValidator';

// Common countries with their codes and dial codes
const COUNTRIES = [
  { code: 'US', dialCode: '+1', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', dialCode: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: 'GB', dialCode: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'AU', dialCode: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: 'IN', dialCode: '+91', name: 'India', flag: '🇮🇳' },
  { code: 'DE', dialCode: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', dialCode: '+33', name: 'France', flag: '🇫🇷' },
  { code: 'JP', dialCode: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: 'MX', dialCode: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: 'BR', dialCode: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: 'IT', dialCode: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', dialCode: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: 'CN', dialCode: '+86', name: 'China', flag: '🇨🇳' },
  { code: 'KR', dialCode: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: 'NL', dialCode: '+31', name: 'Netherlands', flag: '🇳🇱' },
];

const PhoneInput = ({ onPhoneChange, onValidationChange }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('US');
  const [touched, setTouched] = useState(false);
  const [validationResult, setValidationResult] = useState({ isValid: false, error: '' });

  const handleChange = (e) => {
    const value = e.target.value;
    const formatted = formatPhoneNumberInput(value, countryCode);

    setPhoneNumber(formatted);

    // Check if phone number is complete
    if (isPhoneNumberComplete(formatted, countryCode)) {
      const result = validatePhoneNumber(formatted, countryCode);
      setValidationResult(result);

      // Notify parent component
      if (onPhoneChange) {
        onPhoneChange(result.formatted);
      }
      if (onValidationChange) {
        onValidationChange(result.isValid);
      }
    } else {
      setValidationResult({ isValid: false, error: '' });
      if (onValidationChange) {
        onValidationChange(false);
      }
    }
  };

  const handleCountryChange = (e) => {
    const newCountryCode = e.target.value;
    setCountryCode(newCountryCode);

    // Reset phone number and validation when country changes
    setPhoneNumber('');
    setValidationResult({ isValid: false, error: '' });
    setTouched(false);

    if (onValidationChange) {
      onValidationChange(false);
    }
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const getBorderColor = () => {
    if (!touched || !phoneNumber) {
      return 'border-gray-300';
    }
    return validationResult.isValid ? 'border-green-500' : 'border-red-500';
  };

  const showError = touched && phoneNumber && !validationResult.isValid && validationResult.error;

  return (
    <div className="w-full">
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
        Phone Number
      </label>
      <div className="relative flex gap-2">
        <select
          value={countryCode}
          onChange={handleCountryChange}
          className="flex-shrink-0 pl-3 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mexican-orange focus:border-mexican-orange transition-colors duration-200 bg-white cursor-pointer"
          aria-label="Country code selector"
        >
          {COUNTRIES.map(country => (
            <option key={country.code} value={country.code}>
              {country.flag} {country.dialCode}
            </option>
          ))}
        </select>
        <div className="relative flex-grow">
          <input
            type="tel"
            id="phone"
            className={`block w-full px-3 py-3 border ${getBorderColor()} rounded-lg focus:ring-2 focus:ring-mexican-orange focus:border-mexican-orange transition-colors duration-200`}
            placeholder={countryCode === 'US' || countryCode === 'CA' ? '(555) 123-4567' : 'Enter phone number'}
            value={phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-label="Phone number input"
            aria-invalid={showError ? 'true' : 'false'}
            aria-describedby={showError ? 'phone-error' : 'phone-helper'}
          />
          {validationResult.isValid && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {showError ? (
        <p id="phone-error" className="mt-2 text-sm text-red-600">
          {validationResult.error}
        </p>
      ) : (
        <p id="phone-helper" className="mt-2 text-sm text-gray-500">
          Enter your phone number to receive order confirmation and payment link
        </p>
      )}
    </div>
  );
};

export default PhoneInput;
