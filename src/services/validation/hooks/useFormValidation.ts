import { FormValidationContext } from '@/services/validation/providers/FormValidationProvider';
import { useContext } from 'react';

export const useFormValidation = () => {
  return useContext(FormValidationContext);
};
