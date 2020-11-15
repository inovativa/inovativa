import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 8rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  main {
    display: grid;
    grid-template-columns: 3fr 1fr;
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
    height: 4rem;
    align-items: center;
    max-width: 312px;
    border-bottom: 3px solid #eedf3d;
    & p {
      color: #009ca0;
    }
    button {
      outline: 0;
      border: 0;
      background: transparent;
      cursor: pointer;
      svg {
        margin-top: 10px;
      }
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
    svg {
      margin-top: 8px;
    }
  }
`;
export const Artigos = styled.div``;
export const ArtigoItem = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  margin-top: 50px;
`;

export const HeaderArtigo = styled.div`
  display: flex;
  justify-content: space-between;
  a:hover {
    strong,
    span {
      color: #84e5e8;
    }
  }
  .perfil {
    display: flex;
    align-items: center;
    img {
      margin-right: 20px;
      height: 39px;
      width: 39px;
      background-color: #ccc;
      border-radius: 50%;
    }
    p {
      font-size: 20px;
      color: #535353;
    }
    text-decoration: none;
    cursor: pointer;
  }
  span {
    font-size: 20px;
    color: #535353;
  }
`;
export const InformationArtigo = styled.div`
  a {
    text-decoration: none;
    &:hover {
      color: #84e5e8;
    }
    h3 {
      margin-top: 15px;
      font-size: 24px;
      color: #191919;
      line-height: 28px;
    }
    h3:hover {
      color: #84e5e8;
    }
    p {
      color: #808080;
      font-size: 20px;
      margin-top: 8px;
    }
  }
`;
export const ImageArtigo = styled.div`
  margin-left: 25px;
  span {
    font-size: 15px;
  }
  img {
    height: 111px;
    width: 164px;
    margin-top: 22px;
  }
  button {
    background: transparent;
    border: none;
    outline: 0;
    cursor: pointer;
  }
`;
export const Eventos = styled.div`
  margin-left: 35px;
`;
export const TitleEvent = styled.h3`
  color: #009ca0;
  font-size: 48px;
  text-align: center;
  font-weight: 400;
`;
export const EventoItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  span {
    font-size: 15px;
    color: #535353;
  }
  img {
    width: 264px;
    height: 97px;
    margin-top: 10px;
  }
  a {
    font-size: 18px;
    text-decoration: none;
    color: #000000;
    margin-top: 15px;
    &:hover {
      color: #84e5e8;
    }
  }
`;
