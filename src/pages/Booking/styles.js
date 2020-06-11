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
    margin: 0px 0px 0px 40px;
    padding: 0 10px;
    height: 44px;
    flex-direction: flex-end;
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
  background: linear-gradient(-90deg, #056600, #08a200);
  color: #fff;
  border-radius: 8px;
  padding: 20px;
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 10px 0;
  -webkit-box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
  -moz-box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
  box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
`;
