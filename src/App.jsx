import Game from './Square';
import styled from 'styled-components';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  #root {
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const StyleAppContainer = styled.div `
  text-align: center;
`

function App() {
  return (
    <>
    <GlobalStyle />
    <StyleAppContainer>
      <h1>Tic Tac Toe</h1>
      <Game /> {}
    </StyleAppContainer>
    </>
  );
}

export default App;
