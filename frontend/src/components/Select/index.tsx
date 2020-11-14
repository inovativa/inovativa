import React, { SelectHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import SelecStyles from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
}

const Select: React.FC<SelectProps> = ({ children, name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField, selectRef]);
  return (
    <SelecStyles ref={selectRef} {...rest}>
      {children}
    </SelecStyles>
  );
};
export default Select;
