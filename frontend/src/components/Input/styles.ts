import styled from 'styled-components';
import Tooltip from '../Tooltip/index';

export const InputStyled = styled.input`
  height: 2.2rem;
  width: 100%;
  padding: 0.3rem;
  background-color: transparent;
  border: 1px solid #535353;
  box-sizing: border-box;
  border-radius: 0.4rem;

  text-align: left;
  font-size: 1rem;
  &:focus {
    border: 1px solid #38a9f0;
    -webkit-box-shadow: 0px 0px 3px #00b5bb;
    -moz-box-shadow: 0px 0px 3px #00b5bb;
    box-shadow: 0px 0px 3px #00b5bb;
  }
`;

export const InputBlock = styled.div`
  height: 3.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border: 0.1rem solid #535353;
  box-sizing: border-box;
  border-radius: 0.6rem;
  padding: 0.8rem;

  &:focus-within {
    box-sizing: inherit;
    outline: none;
  }

  & label {
    display: flex;
    position: absolute;
    line-height: 1.6rem;
    color: #808080;
    font-size: 1.6rem;
    z-index: 1;
  }
  & input {
    width: calc(100% - 1.2rem);
    border: 0;
    outline: 0;
    background: transparent;
    z-index: 2;
    &:focus:not([type='color']) + label,
    :not(:placeholder-shown) + label {
      margin-top: -27px;
      padding-top: 0.1 !important;
      padding-left: 0.3rem !important;
      padding-right: 0.3rem !important;
      font-size: 0.8rem;
      margin-bottom: 0.1rem;
      text-overflow: ellipsis;
    }
  }
  & button {
    border: 0;
    height: auto;
    width: auto;
    background: transparent;
    outline: 0;
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
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
