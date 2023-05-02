import { Login } from "./components/Login"
import {Router} from './routers/Router'


function App() {
  

  return (
    <>
    <header>
    <div className="divLogo">
      <img src="../src/assets/logosportpress.png"/>
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
