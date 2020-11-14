import styled from 'styled-components';

export const PageLogin = styled.div`
  background-color: #fff6bb;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const SubtitlePage = styled.h1`
  font-size: 2.5rem;
  line-height: 3rem;
  color: #00b5bb;
  font-weight: bold;
  margin-top: 0.1rem;
`;
export const FormLogin = styled.div`
  margin-top: -1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  z-index: 1;
  padding: 2rem;
  padding-top: 4rem;
  border-radius: 0.8rem;
  height: 18rem;
  div {
    max-width: 25rem;
  }
  div + div {
    margin-top: 0.8rem;
  }
  button {
    margin-top: 0.8rem;
    max-width: 25rem;
  }
`;
