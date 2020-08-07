import styled from 'styled-components';

export const Container = styled.div`
  max-width: 100px;
  display: flex;
  flex-direction: column;
  height: 100%;

  z-index: 1;
  button {
    border: 0;
    background: none;
  }
  ul {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ProvidersList = styled.li`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 15px;
  flex-direction: column;
  background-color: blue;
  margin: 0px 0px 80px 0px;
  padding: 0px;
`;

export const Provider = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  background-color: yellow;
  display: flex;
  flex-direction: column;

  margin: 10px 0px 0px;
  -webkit-box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
  -moz-box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
  box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
`;
export const Avatar = styled.img`
  width: 70%;
  height: 70%;
  border-radius: 50%;
`;

export const Header = styled.div`
  display: flex;
  background-color: #fffafa;
  flex-direction: row;
  background-color: red;
  sjustify-content: space-between;
  width: 100%;
`;

export const Time = styled.li`
  height: 40px;
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${props => (props.avaiable ? '#dcdcdc' : '#00c851')};

  opacity: ${props => (props.avaiable ? 0.6 : 1)};

  strong {
    display: block;
    color: ${props => (props.avaiable ? '#dcdcdc' : '#fff')};
    font-size: 14px;
    font-weight: normal;
  }
`;

// export const FilterBtn = styled.div`
//   width: 120px;
//   height: 40px;
//   background: linear-gradient(-90deg, #056600, #08a200);
//   border-radius: 20px;
//   color: #fff;
//   font-weight: 500;
//   display: flex;
//   justify-content: center;
//   margin: 5px 5px;
//   align-items: center;
//   -webkit-box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
//   -moz-box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
//   box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
// `;

/* Basic button styling */
export const PulsingBtn = styled.a`
  width: 220px;
  text-align: center;
  white-space: nowrap;
  padding: 12px 20px;
  box-shadow: 0 0 0 0 rgba(42, 245, 152, 0.7);
  border-radius: 15px;
  background: linear-gradient(-90deg, #1edb50, #00c851);
  -webkit-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -moz-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  -ms-animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  animation: pulsing 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  font-size: 22px;
  font-weight: normal;
  font-family: sans-serif;
  text-decoration: none !important;
  transition: all 300ms ease-in-out;

  /* Animation */

  @-webkit-keyframes pulsing {
    to {
      box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
    }
  }

  @-moz-keyframes pulsing {
    to {
      box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
    }
  }

  @-ms-keyframes pulsing {
    to {
      box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
    }
  }

  @keyframes pulsing {
    to {
      box-shadow: 0 0 0 30px rgba(232, 76, 61, 0);
    }
  }
`;
