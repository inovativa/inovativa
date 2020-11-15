import styled from 'styled-components';

export const PageArtigo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin-bottom: 50px;
  main {
    margin-top: 90px;
    width: 960px;
    header {
      display: flex;
      justify-content: space-between;
      img {
        width: 62px;
        height: 62px;
        border-radius: 50%;
      }
      span {
        font-size: 20px;
        line-height: 23px;

        color: #868686;
      }
    }
    body {
      margin-top: 45px;
    }
  }
`;
export const ArtigoDados = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  & img {
    width: 500px;
    height: 337.5px;
    margin-right: 35px;
  }
  div {
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 30px;
      line-height: 35px;
      color: #191919;
    }
    h3 {
      font-size: 20px;
      line-height: 29px;
      color: #505050;
    }
  }
`;

export const Description = styled.p`
  margin-top: 35px;
  font-size: 25px;
  line-height: 29px;

  color: #505050;
`;
