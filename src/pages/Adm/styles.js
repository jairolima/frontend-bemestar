import styled from 'styled-components';

export const Container = styled.div`
  max-width: 90%;
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

export const Login = styled.div`
  width: 100%;
  text-align: center;
  display: flex;

  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-bottom: 30px;
    width: 70%;

    input {
      background: #f9f9f9;
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 15px;
      color: #000;
      margin: 0 0 10px;
      width: 100%;

      &::placeholder {
        color: #000;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
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
`;

export const Appointment = styled.div`
  background: #fff;
  padding: 20px;
  min-width: 200px;
  flex: 1;
  align-items: center;
  margin: 50px 0 100px 0;
  border-radius: 20px;
  -webkit-box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
  -moz-box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
  box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
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

export const Shadow = styled.div`
  border-radius: 20px;
  -webkit-box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
  -moz-box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
  box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
`;
