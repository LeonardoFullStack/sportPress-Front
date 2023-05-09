import { useDispatch, useSelector } from "react-redux"
import { Login } from "./components/Login"
import { NavBar } from "./components/NavBar"
import {Router} from './routers/Router'
import { useEffect, useState } from "react"
import { checkCookie } from "./store/slices/users/thunk"


function App() {
  const { email } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const [logged, setLogged] = useState('')
  console.log(email)
  useEffect(() => {

    if (!email) {
      dispatch(checkCookie(document.cookie, setLogged))
    }
    
  },[])

  return (
    <>
    <header>
    <div className="divLogo">
      <img src="../src/assets/logosportpress.png"/>
    </div>
    <div className="burguermenu">
    <span className="material-symbols-outlined">
    menu
    </span>
    </div>
    <div className="bigMenu">
    <NavBar/>
    </div>

    <div className="burguerOpen displayNone">
    <NavBar/>
    </div>
    
    </header>

    <main>
    <Router/>
    </main>
      <footer>
      <div className="divLogo">
      <img src="../src/assets/logosportpress.png"/>
    </div>
    <p>
    ® SportPress todos los derechos reservados 
    </p>
      </footer>

    </>
  )
}

export default App
