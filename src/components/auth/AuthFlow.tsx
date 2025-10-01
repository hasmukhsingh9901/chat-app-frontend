'use client';

import { useState } from 'react';
import { PhoneForm } from './PhoneForm';
import { OTPForm } from './OTPForm';

export function AuthFlow() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const handleOTPSent = (phoneNumber: string, code: string) => {
    setPhone(phoneNumber);
    setCountryCode(code);
    setStep('otp');
  };

  const handleBack = () => {
    setStep('phone');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        {step === 'phone' ? (
          <PhoneForm onOTPSent={handleOTPSent} />
        ) : (
          <OTPForm
            phone={phone}
            countryCode={countryCode}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
