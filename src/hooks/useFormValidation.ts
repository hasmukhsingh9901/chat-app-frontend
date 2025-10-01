import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { phoneSchema, otpSchema, createChatroomSchema, type PhoneFormData, type OTPFormData, type CreateChatroomFormData } from '@/types/forms';

export const usePhoneForm = (onSubmit: (data: PhoneFormData) => void) => {
  const form = useForm<PhoneFormData>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      countryCode: '+1',
    },
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    form.setValue('phone', value);
  };

  return {
    ...form,
    handlePhoneChange,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};

export const useOTPForm = (onSubmit: (data: OTPFormData) => void) => {
  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
  });

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    form.setValue('otp', value);
  };

  return {
    ...form,
    handleOTPChange,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};

export const useCreateChatroomForm = (onSubmit: (data: CreateChatroomFormData) => void) => {
  const form = useForm<CreateChatroomFormData>({
    resolver: zodResolver(createChatroomSchema),
  });

  return {
    ...form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
