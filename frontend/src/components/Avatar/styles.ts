import styled from 'styled-components';

export const AvatarInput = styled.div`
  margin-bottom: -75px;
  position: absolute;
  width: 160px;
  height: 150px;
  background: transparent;
`;

export const LabelStyles = styled.label`
  position: absolute;
  width: 48px;
  height: 48px;
  background: #fff05a;
  border-radius: 50%;
  right: 0;
  bottom: 0;
  border: 0;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0 !important;
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
    background: #00b5bb;
  }
`;
export const ImageAvatar = styled.img`
  position: absolute;
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 4px solid #fff;
  background-image: url(${props => props.src});
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
`;
