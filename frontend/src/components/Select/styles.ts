import styled from 'styled-components';
import Tooltip from '../Tooltip/index';

export const SelecStyles = styled.select`
  width: 100%;
  border-radius: 0.6rem;
  background: transparent;
  padding: 0.5rem;

  font: Signika;

  color: #808080;
  font-size: 1.6rem;
`;

export const Error = styled(Tooltip)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent !important;
    }
  }
`;
