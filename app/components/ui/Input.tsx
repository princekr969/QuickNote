import React, { useState } from 'react';

interface InputFieldProps {
  label: string;
  value?: string;
  type: string;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type='text',
  value = '',
  placeholder = '',
  maxLength,
  required = false,
  onChange,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`block text-gray-500 text-sm font-medium mb-6 ${className}`}>
      <div className="">
        <fieldset className='border border-gray-500 rounded-md focus-within:border-blue-500'>
            <legend className="block px-2 ml-2 text-gray-500  text-md font-medium">
              {label}
            </legend>
            <input
              id={label}
              type={type}
              value={internalValue}
              onChange={handleChange}
              maxLength={maxLength}
              placeholder={placeholder}
              required={required}
              className="w-full text-gray-600 px-4 pt-2 pb-4 rounded-lg border border-transparent focus:outline-none focus:border-transparent"
            />
        </fieldset>
      </div>
    </div>
  );
};

export default InputField;