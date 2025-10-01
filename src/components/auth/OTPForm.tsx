'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useOTPForm } from '@/hooks/useFormValidation';
import { toast } from 'sonner';
import { OTPFormData } from '@/types/forms';

interface OTPFormProps {
  phone: string;
  countryCode: string;
  onBack: () => void;
}

export function OTPForm({ phone, countryCode, onBack }: OTPFormProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const { login } = useAuth();

  const onSubmit = async (data: OTPFormData) => {
    setIsVerifying(true);
    
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, accept any 6-digit OTP
      if (data.otp.length === 6) {
        await login(phone, countryCode);
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    handleOTPChange,
  } = useOTPForm(onSubmit);

  const resendOTP = () => {
    toast.success('OTP sent successfully!');
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verify OTP</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to {countryCode} {phone}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              {...register('otp')}
              placeholder="Enter OTP"
              maxLength={6}
              className="text-center text-lg tracking-widest"
              onChange={handleOTPChange}
              inputMode="numeric"
              pattern="[0-9]*"
            />
            {errors.otp && (
              <p className="text-sm text-red-500">{errors.otp.message}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isVerifying}
              className="flex-1"
            >
              {isVerifying ? 'Verifying...' : 'Verify'}
            </Button>
          </div>

          <div className="text-center">
            <Button
              type="button"
              variant="ghost"
              onClick={resendOTP}
              className="text-sm"
            >
              Resend OTP
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
