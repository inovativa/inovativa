import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import { InputBlock, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeholder?: string;
  background?: string;
}
export const Input: React.FC<InputProps> = ({
  name,
  label,
  placeholder,
  background = '#FFF',
  ...rest
}) => {
  const inputRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fieldName, defaultValue, error, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <InputBlock className={error && 'error'}>
      <input
        name={name}
        ref={inputRef}
        placeholder={placeholder === undefined ? ' ' : placeholder}
        {...rest}
      />

      <label
        style={{
          background,
        }}
      >
        {label}
      </label>
      {error && (
        <Error title={error}>
          <FiAlertCircle size={20} color="c53030" />
        </Error>
      )}
    </InputBlock>
  );
};
