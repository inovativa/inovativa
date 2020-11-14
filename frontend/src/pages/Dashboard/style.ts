import styled from 'styled-components';

export const PageDashboard = styled.div`
  background-color: #fff6bb;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
export const GroupLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 2.5rem;

  a {
    font-family: Bahnschrift;
    color: #505050;
    line-height: 2rem;
    font-size: 1.6rem;
    text-decoration: underline;

    transition: 0.2s;
  }

  a:first-child {
    line-height: 2.5rem;
    font-size: 1.8rem;
    font-weight: bold;
    color: #000;
    text-decoration: none;
  }
  a:last-child {
    margin-top: 2.3rem;
    color: #00b5bb;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.7rem;
    line-height: 2rem;
  }
  a:hover {
    color: #ccc;
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
