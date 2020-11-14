import styled from 'styled-components';

export const PageRegister = styled.div`
  background-color: #fff6bb;
  width: 100vw;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LogoPageRegister = styled.div`
  height: 700px;
  width: 700px;
  border-radius: 50%;
  background: #fff05a;
  margin-top: -400px;
  z-index: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 30px;

  box-shadow: 0px 4px 214px #ffffff;

  img {
    max-width: 370px;
  }

  transition: 0.2s;

  animation-duration: 2s;
  animation-name: logofade;

  @keyframes logofade {
    from {
      margin-top: -340px;
      opacity: 0;
    }

    to {
      margin-top: -400px;
      opacity: 1;
    }
  }
`;
export const SubtitlePage = styled.h1`
  font-size: 2rem;
  line-height: 3rem;
  color: #000;
  font: Signika;
  font-weight: 500;
  transition: 0.2s;

  animation-duration: 2s;
  animation-name: fadeIn;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 65rem;

  padding: 4rem;

  margin-top: 1rem;

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
    background: #fff05a;
  }

  input:checked + label {
    background: #fff05a;
    color: #535353 !important;
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
