import styled from 'styled-components';

export const PageProfile = styled.div`
  background-color: #fff;
  width: 100vw;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContainerImagePerfil = styled.div`
  height: 6rem;
  background: #747474;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 65rem;

  background: #ffffff;
  padding: 4rem;
  border-radius: 0.8rem;

  box-shadow: 3px 3px #ffffff;

  margin-top: 3rem;

  z-index: 1;

  div + div,
  div + textarea,
  textarea + textarea,
  textarea + div {
    margin-top: 0.8rem;
  }

  margin-bottom: 3rem;
`;

export const ProfileType = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;

  label {
    cursor: pointer;
    font-size: 1rem;
    line-height: 2rem;
    text-align: center;
    color: #808080;

    border: 1px solid #535353;
    border-radius: 0.6rem;
    box-sizing: border-box;
    padding: 0.1rem;

    height: 2.3rem;
    width: 6rem;

    transition: 0.2s;
  }
  input {
    display: none;
  }
  label:hover {
    background: #00b5bb;
    color: #fff;
  }

  input:checked + label {
    background: #00b5bb;
    color: #fff !important;
  }

  input + label {
    margin-right: 0.8rem;
  }
`;
export const GroupInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.8rem;
  div + select,
  div + div {
    margin-left: 0.8rem;
    margin-top: 0;
  }
`;
