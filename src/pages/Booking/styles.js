import styled from 'styled-components';
import { darken } from 'polished';

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
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 2fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Del = styled.div`
  button {
    margin: 0px 0 0 10px;
    padding: 0 5px;
    height: 44px;
    background: #f64c75;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 10px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.03, '#f64c75')};
    }
  }
`;

export const Appointment = styled.div`
  background: #fff;
  padding: 20px;
  min-width: 200px;
  flex: 1;
  align-items: center;
  margin: 0 0 10px 0;
`;
