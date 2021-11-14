import React from 'react';
import { Route, Routes, Link, BrowserRouter, useLocation } from 'react-router-dom';
import App from './App';

interface Props {

}

const MainMenu:React.FC<Props> = () => {

    const location = useLocation()   

    return (

      <>
      
        <>
        {location.pathname != "/App" &&
          <nav>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/App">App</Link>
            </li>
          </nav>
          }

          <Routes>
            <Route path="/"/>
            <Route path="/App" element={<App/>}/>
          </Routes>
        </>
        

      </>
        
        
    )
}

export default MainMenu

