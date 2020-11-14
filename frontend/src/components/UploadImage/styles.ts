import styled from 'styled-components';

export const Image = styled.div`
  height: 23rem;
  background: #bdbdbdbd;
  width: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  svg:hover {
    width: 50px;
    height: 50px;

    cursor: pointer;
  }
`;
