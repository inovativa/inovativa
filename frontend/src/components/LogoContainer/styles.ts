import styled from 'styled-components';

export const LogoContainerStyles = styled.div`
  height: 700px;
  width: 700px;
  border-radius: 50%;
  background: #fff05a;
  margin-top: -350px;

  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 60px;

  box-shadow: 0px 4px 214px #ffffff;

  img {
    max-width: 370px;
  }
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
