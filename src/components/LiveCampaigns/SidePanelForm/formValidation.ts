import { SetStateAction } from 'react';

interface FormValidationProps {
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    setFieldValue: (value: number) => void;
    setErrors: (value: SetStateAction<FormErrorProps>) => void;
}

const formValidation = ({
    e,
    setFieldValue,
    setErrors,
}: FormValidationProps) => {
    const value = e.target.value;
    const fieldName = e.target.id;

    if (isNaN(parseFloat(value))) {
        return setFieldValue(0);
    }

    if (value.toLowerCase().includes('e')) {
        setErrors((prev: FormErrorProps) => ({
            ...prev,
            [fieldName]: 'Scientific notation is not allowed (e.g., 1e3).',
        }));
    } else if (value.includes('--')) {
        setErrors((prev: FormErrorProps) => ({
            ...prev,
            [fieldName]: 'Double dashes are not allowed.',
        }));
    } else if (parseFloat(value) < 0) {
        setErrors((prev: FormErrorProps) => ({
            ...prev,
            [fieldName]: 'Negative numbers are not allowed.',
        }));
    } else {
        setErrors((prev: FormErrorProps) => ({ ...prev, [fieldName]: null }));
    }

    return true;
};

export default formValidation;
