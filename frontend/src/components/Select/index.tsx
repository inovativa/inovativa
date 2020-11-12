import React, { SelectHTMLAttributes } from 'react';
import SelecStyles from './styles';

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectProps> = ({ children, ...rest }) => {
  return <SelecStyles {...rest}>{children}</SelecStyles>;
};
export default Select;
