import styled from 'styled-components';

export const ContainerFluid = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
`;

export const Container = styled.div`
  width: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 3rem;
  form {
    margin-top: 3rem;
  }
  div + div,
  div + button {
    margin-top: 1rem;
  }
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #009ca0;
  margin-top: 4rem;
  h1 {
    text-align: center;
    font-family: Bahnschrift;
    font-size: 2rem;
    line-height: 2.2rem;
  }
`;

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
export const GroupHorario = styled.div`
  margin-top: 1rem;
  display: flex;
  flex: 1;
  .year {
    flex: 2 !important;
  }

  div + div,
  div:first-child {
    margin-right: 0.6rem;
    margin-top: 0;
  }
  div:last-child {
    margin-right: 0 !important;
  }
`;
