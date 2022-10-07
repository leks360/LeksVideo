import { dark } from '@mui/material/styles/createPalette.js';
import { useState } from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Menu from './components/Menu.jsx';
import Navbar from './components/Navbar.jsx';
import { darkTheme, lightTheme } from './utils/Theme';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import  Home  from './pages/Home.jsx';
import  Video  from './pages/Video.jsx';
import  SignIn  from './pages/SignIn.jsx';
import Search from './pages/Search';
const Container=styled.div`
display:flex;
`

const Main=styled.div`
  flex:7;
  background-color:${({theme}) =>theme.bg};
`

const Wrapper =styled.div`
  padding:22px 96px;
`
function App() {
  const [darkMode,setDarkMode]=useState(true);

  return (
    <ThemeProvider theme={darkMode? darkTheme:lightTheme}>
      <Container>
        <BrowserRouter>
        <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
        <Main>
          <Navbar/>
          <Wrapper>
           <Routes>
              <Route path="/">
                 <Route index element={<Home type="random"/>}/>
                 <Route path="trend" element={<Home type="trend"/>}/>
                 <Route path="search" element={<Search/>}/>
                 <Route path="subvideo" element={<Home type="subvideo"/>}/>
                 <Route path="signin" element={<SignIn/>}/>
                 <Route path="video">
                  <Route path=":id" element={<Video/>}/>
                 </Route>

              </Route>

           </Routes>

          </Wrapper>
        </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
