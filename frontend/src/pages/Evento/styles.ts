import styled from 'styled-components';

export const PageEvento = styled.div`
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
export const EventoDados = styled.div`
  display: flex;
  flex-direction: column;
  & img {
    width: 100%;
    height: 258.55px;
  }
  span {
    font-size: 30px;
    line-height: 44px;

    color: #c0ae30;
  }
  a {
    font-size: 30px;
    line-height: 35px;

    color: #009ca0;
  }
  div {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    h1 {
      font-family: Bahnschrift;
      font-size: 45.3123px;
      line-height: 53px;

      color: #000000;
    }
  }
`;

export const Description = styled.p`
  margin-top: 35px;
  font-size: 25px;
  line-height: 29px;

  color: #191919;
`;
