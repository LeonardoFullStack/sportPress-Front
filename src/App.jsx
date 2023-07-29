import { useDispatch, useSelector } from "react-redux"
import { Login } from "./components/Login"
import { NavBar } from "./components/NavBar"
import {Router} from './routers/Router'
import { useEffect, useState } from "react"
import { checkCookie } from "./store/slices/users/thunk"
import { CreateUser2 } from "./components/CreateUser2"
import { ChangePass } from "./components/ChangePass"


function App() {
  const { email } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const [logged, setLogged] = useState('')

  const clearPage = () => {
    const mainContainer = document.querySelector('main');
    const loginForm = document.querySelector('.loginForm');
    const registerForm = document.querySelector('.register');
    const changePassForm = document.querySelector('.changePassDiv');
    mainContainer.classList.remove('tapao')
    loginForm.classList.add('displayNone')
    registerForm.classList.add('displayNone')
    changePassForm.classList.add('displayNone')
  }

  useEffect(() => {


    if (!email) {
      dispatch(checkCookie(document.cookie, setLogged))
    }
    
  },[])

  return (
    <>
    <header>
    <div className="divLogo">
    <img alt="logo de la empresa" src="images/logoonlyletters.png"/>
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

    <p>
    ® SportPress todos los derechos reservados 
    </p>
      </footer>

        <Login clearPage={clearPage}/> 
        <CreateUser2 clearPage={clearPage}/> 
        <ChangePass clearPage={clearPage}/>

    </>
  )
}

export default App
