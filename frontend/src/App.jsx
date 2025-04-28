import './App.css'

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSign from './pages/UserSign'
import CaptainSign from './pages/CaptainSign'
import CaptainLogin from './pages/CaptainLogin'
import Start from './pages/Start'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import { UserLogout } from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'

function App() {
  

  return (
    <div>
      <Routes>

        <Route path="/" element={<Start />} />
        <Route path ="/Sign" element={<UserSign />} />
        <Route path ="/Login" element={<UserLogin />} />
        <Route path="/CaptainSign" element={<CaptainSign/>}/>
        <Route path = "/CaptainLogin" element ={<CaptainLogin/>}/>
        <Route path ="/home" element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
          
        } />

        <Route path="/user/logout" element={<UserProtectedWrapper><UserLogout/></UserProtectedWrapper>}></Route>
        <Route path="/captain-home" element={
          <CaptainProtectedWrapper>
            <CaptainHome/>
          </CaptainProtectedWrapper>
          
          } />
      </Routes>

    </div>
  )
}

export default App
