import React, { SelectHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { FiAlertCircle } from 'react-icons/fi';
import { Error, SelecStyles } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
}

const Select: React.FC<SelectProps> = ({ children, name, ...rest }) => {
  const selectRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fieldName, defaultValue, error, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, selectRef]);
  return (
    <>
      <SelecStyles ref={selectRef} {...rest}>
        {children}
      </SelecStyles>
      {error && (
        <Error title={error}>
          <FiAlertCircle size={20} color="c53030" />
        </Error>
      )}
    </>
  );
};
export default Select;
