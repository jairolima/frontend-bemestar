import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 0px auto;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 0px;
    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 15px;
      color: #fff;
      margin: 0 0 10px;
      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }
    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    button {
      margin: 5px 0 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }
    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
  > button {
    width: 100%;
    margin: 10px 0 0;
    height: 44px;
    background: #f64c75;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.08, '#f64c75')};
    }
  }
`;

export const Margin = styled.div`
  height: 90px;
`;

export const Background = styled.div`
  margin: 0;
  height: 100%;
  width: 100%;
  overflow: auto;
  background: linear-gradient(-90deg, #056600, #08a200);
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
  background: linear-gradient(-90deg, #056600, #056600);
  color: #fff;
  border-radius: 8px;
  padding: 20px;
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 40px 0;
`;

// Appointment shadow
// -webkit-box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
// -moz-box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
// box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
