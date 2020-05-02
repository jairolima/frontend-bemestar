import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  height: 100%;

  header {
    display: flex;
    align-items: center;
    align-self: center;

    button {
      border: 0;
      background: none;
    }

    strong {
      color: #000;
      font-size: 24px;
      margin: 0 15px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
    width: 100%;
    font-size: 18px;
  }
`;

export const Appointment = styled.div`
  background: #fff;
  padding: 20px;
  min-width: 200px;
  flex: 1;
  align-items: center;
  margin: 50px 0 10px 0;
  border-radius: 20px;
`;

export const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  margin-top: 30px;
  width: 100%;
  div {
    text-align: bottom;
  }
  span {
    font-size: 12px;
    display: block;
  }
  strong {
    display: block;
    align-self: center;
    justify-self: center;
    padding: 20px;
    flex: 1;
    font-size: 40px;
    align-items: center;
    background: #fff;
    border-radius: 20px;
  }
`;
