import "./App.css";
import Home from './pages/Home'
import Search from './pages/Search'
import {Route, Routes} from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route
        path="/search"
        element=<Search/>
      >
      </Route>
      <Route
        path="*" 
        element=<Home/>
      ></Route>
    </Routes>
  )
}

export default App;
