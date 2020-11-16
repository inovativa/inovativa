import styled from 'styled-components';

export const PagePerfil = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin-bottom: 50px;
  main {
    margin-top: 90px;
    width: 960px;
  }
`;
export const GroupLink = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  a + a {
    margin-top: 30px;
  }
  a {
    text-decoration: none;
    font-weight: none;
    text-decoration: none;
    font-size: 22.586px;
    line-height: 26px;
    display: flex;
    align-items: center;
    span {
      color: #00b5bb;
    }
    svg {
      margin-right: 20px;
    }
  }
`;

export const City = styled.span`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 300px;
  font-size: 18.8217px;
  line-height: 22px;

  color: #868686;
`;

export const DescriptionPerfil = styled.div`
  margin-top: 70px;
  p + p {
    margin-top: 40px;
  }
  p {
    font-size: 22.586px;
    line-height: 26px;

    color: #808080;
  }
`;

export const TitlePerfil = styled.div`
  h3 {
    font-size: 37.7194px;
    line-height: 25px;
    color: #535353;
    font-weight: 400;
  }
  span {
    font-size: 18.8217px;
    line-height: 22px;

    color: #868686;
  }
`;

export const Cover = styled.div`
  height: 6rem;
  width: 100vw;
  display: flex;
  justify-content: center;
`;
export const AvatarContainer = styled.div``;

export const ImgeCover = styled.div`
  background-image: url(${props => props.datatype});
  background-repeat: no-repeat;
  background-size: cover;
`;

export const Avatar = styled.div`
  margin-top: 25px;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 4px solid #fff;
  background-image: url(${props => props.datatype});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const ListArtigos = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  margin-top: 25px;
  img {
    width: 168.47px;
    height: 137px;
    background: #c4c4c4;
    margin-right: 35px;
  }
  & div {
    h3 {
      font-size: 25px;
      line-height: 29px;
      color: #191919;
    }
    span {
      font-weight: 400;
      font-size: 20px;
      line-height: 23px;
      color: #808080;
    }
  }
`;
