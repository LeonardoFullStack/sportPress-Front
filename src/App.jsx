import { Login } from "./components/Login"
import { NavBar } from "./components/NavBar"
import {Router} from './routers/Router'


function App() {
  

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

      </footer>
    </>
  )
}

export default App
