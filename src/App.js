import "bootstrap/dist/css/bootstrap.min.css";
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {UserProvider} from "../src/context/index";
import Login from "./login";
import Home from "./home";
import Output from "./components/Output";
import "./style.css"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
function App() {
  return (
    < >
    <UserProvider >
    <Router>
    <Routes>
  <Route path="/home" element={<Home/>} />
  <Route path="/Output" element={<Output/>} />
  <Route path="/" element={ <Login/>} />
  </Routes>
    </Router>
    <ToastContainer />
</UserProvider>
    </>
  );
}

export default App;
