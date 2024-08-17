import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth-pages/Login";
import Dashboard from "./pages/Dashboard";
import "./styles/main.scss";
import { useSelector } from "react-redux";

function App() {


  const token = useSelector((state) => state.authReducer.token);
  

  // console.log('_____________token____',token)
  // console.log('_____________userImage____',userImage)

  return (
    <div className="app-container">
      <Routes>
        {
          token?
          <Route exact path="/*" element={<Dashboard />} />
          :
          <Route path="/" element={<Login />} />
        }
      </Routes>
    </div>
  );
}

export default App;
