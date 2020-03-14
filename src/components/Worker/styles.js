import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  z-index: 1;
`;

export const ProvidersList = styled.li`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  margin-top: 30px;
  padding: 0px;
`;

export const Name = styled.p`
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

export const Provider = styled.button`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  min-width: 200px;
  flex: 1;
  align-items: center;
  margin: 0 0px 0px;
`;
export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;
