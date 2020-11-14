import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder?: string;
  type: 'radio' | 'checkbox';
}
export const RadioButton: React.FC<InputProps> = ({
  name,
  placeholder,
  type,
  ...rest
}) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <input
      name={name}
      type={type}
      ref={inputRef}
      placeholder={placeholder === undefined ? ' ' : placeholder}
      {...rest}
    />
  );
};
