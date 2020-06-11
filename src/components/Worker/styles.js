import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  z-index: 1;
`;

export const ProvidersList = styled.li`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
  margin: 30px 0px 80px 0px;
  padding: 0px;
`;

export const Provider = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  margin: 25px 0px 0px;
  -webkit-box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
  -moz-box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
  box-shadow: 0px 0px 25px 0px rgba(191, 191, 191, 1);
`;
export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;
