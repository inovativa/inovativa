import styled from 'styled-components';

export const MenubarStyles = styled.div`
  width: 100vw;
  height: 4rem;
  background: #191919;
  display: flex;
  justify-content: center;
  align-items: center;

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
export const ContainerStyles = styled.div`
  width: 100%;
  max-width: 60rem;
  display: flex;
  justify-content: space-between;
`;

export const RigthMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .boxSearch {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 1rem;
    height: 2rem;
    width: 18rem;
    padding-left: 0.3rem;
    & svg {
      margin-left: 0.3rem;
      margin-right: 0.3rem;
    }
    & input {
      width: calc(100% - 37px);
      border: none;
      outline: 0;
      overflow: hidden;
      line-height: 1.8rem;
      font-size: 1rem;
    }
  }
  .avatarImage {
    height: 2.3rem;
    width: 2.3rem;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
  }
  .avatarImage:hover {
    border: 0.3rem solid #fff;
  }
  .conectedIconContainer,
  .avatar {
    height: 100%;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    cursor: pointer;
  }
  .conectedIconContainer img {
    width: 1.3rem;
    height: 1.3rem;
  }
  .conectedIconContainer:hover,
  .avatar:hover {
    border-bottom: 0.3rem solid #fff;
  }
  .active {
    .avatarImage {
      height: 2.5rem;
      width: 2.5rem;
      border: 0.3rem solid #fff05a;
    }
  }
  .active {
    border-bottom: 0.3rem solid #fff05a;
  }
  .active:hover {
    border-bottom: 0.3rem solid #fff05a;
  }
  .conectedIcon {
    height: 1.5rem;
    width: 1.5rem;
    cursor: pointer;
  }
`;
export const LeftMenu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .logo {
    max-width: 5rem;
    transition: 0.2s;
    cursor: pointer;
  }

  ul {
    display: flex;
    margin-left: 3rem;
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 4rem;
    width: 3rem;
    cursor: pointer;
    transition: 0.2s;
  }
  .icon:hover {
    border-bottom: 0.3rem solid #fff;
  }
  .active {
    border-bottom: 0.3rem solid #fff05a;
  }
  .active:hover {
    border-bottom: 0.3rem solid #fff05a;
  }
`;
