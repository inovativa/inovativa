import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 8rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  main {
    width: 960px;
    margin-top: 35px;
  }
`;
export const Title = styled.div`
  width: 960px;
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  div {
    display: flex;
    height: 4rem;
    align-items: center;
  }

  .StatesOptions {
    display: flex;
    align-items: center;
    height: 4rem;
    align-items: center;
    max-width: 312px;
    border-bottom: 3px solid #eedf3d;
    & p {
      color: #009ca0;
    }
    button {
      display: flex;
      align-items: center;
      outline: 0;
      border: 0;
      background: transparent;
      cursor: pointer;
    }
    ul {
      background: #fff6bb;
      border-top: 2px solid #eedf3d;
      width: 400px;
      position: absolute;
      margin-left: 0;
      margin-top: 261px;
      overflow-x: hidden;
      overflow-y: scroll;
      max-height: 200px;
      li {
        height: 60px;
        padding: 15px;
        list-style: none;
        text-align: left;
        a {
          text-align: left;
          text-decoration: none;
          color: #191919;
          width: 100%;
        }

        &:hover {
          background: #eedf3d;
        }
      }
    }
  }
  .userOptions {
    div {
      width: 3px;
      height: 70%;
      margin-left: 20px;
      margin-right: 20px;
      background-color: #009ca0;
    }
    img {
      height: 22px;
      cursor: pointer;
    }
  }
`;
export const Profiles = styled.div`
  display: flex;
  margin-top: 40px;
  align-items: center;
  img {
    height: 120px;
    width: 120px;
    border-radius: 50%;
  }
  div {
    margin-left: 45px;
    p {
      font-size: 18px;
      line-height: 21px;
      color: #808080;
    }
    h3 {
      font-size: 30px;
      line-height: 19px;
      color: #191919;
      font-weight: 400;
    }
    span {
      font-size: 15px;
      line-height: 21px;
      color: #808080;
    }
  }
`;

export const City = styled.span`
  position: relative;
  text-align: right;
  font-size: 15px;
  line-height: 18px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  color: #868686;
`;
