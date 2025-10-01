'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CountrySelect } from './CountrySelect';
import { useCountries } from '@/hooks/useCountries';
import { usePhoneForm } from '@/hooks/useFormValidation';
import { useResponsive } from '@/hooks/useResponsive';
import { toast } from 'sonner';
import { PhoneFormData } from '@/types/forms';

interface PhoneFormProps {
  onOTPSent: (phone: string, countryCode: string) => void;
}

export function PhoneForm({ onOTPSent }: PhoneFormProps) {
  const [isSending, setIsSending] = useState(false);
  const { countries, loading } = useCountries();
  const { isMobile } = useResponsive();

  const onSubmit = async (data: PhoneFormData) => {
    setIsSending(true);
    
    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('OTP sent successfully!');
      onOTPSent(data.phone, data.countryCode);
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    handlePhoneChange,
  } = usePhoneForm(onSubmit);

  const countryCode = watch('countryCode');

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="text-center">Loading countries...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome to Gemini Chat</CardTitle>
        <CardDescription>
          Enter your phone number to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <div className="flex gap-2">
              <CountrySelect
                value={countryCode}
                onValueChange={(value) => setValue('countryCode', value)}
                countries={countries}
              />
              <Input
                {...register('phone')}
                placeholder="Enter phone number"
                type="tel"
                className="flex-1"
                onChange={handlePhoneChange}
                inputMode="numeric"
                pattern="[0-9]*"
              />
            </div>
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
            {errors.countryCode && (
              <p className="text-sm text-red-500">{errors.countryCode.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSending}
            className="w-full"
          >
            {isSending ? 'Sending OTP...' : 'Send OTP'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
