import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import { TextAreaBlock, Error } from './styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  background?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  children,
  name,
  placeholder,
  label,
  background = '#FFF',
  ...rest
}) => {
  const textAreaRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fieldName, defaultValue, error, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, textAreaRef]);
  return (
    <TextAreaBlock>
      <textarea
        ref={textAreaRef}
        name={name}
        placeholder={placeholder === undefined ? ' ' : placeholder}
        {...rest}
      >
        {children}
      </textarea>

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
    </TextAreaBlock>
  );
};
