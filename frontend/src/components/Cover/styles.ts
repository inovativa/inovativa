import styled from 'styled-components';

export const CoverInput = styled.div`
  height: 6rem;
  background: #747474;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #00b5bb;
    right: 0.5rem;
    margin-bottom: -24px;
    border: 0;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    input {
      display: none;
    }
    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
    &:hover {
      background: #fff05a;
    }
  }
`;
export const ImageCover = styled.img`
  position: absolute;
  height: 6rem;
  width: 100vw;
  background: #fff;
`;
