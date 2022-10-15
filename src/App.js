import { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Navbar from "./components/Navbar";

// import { fetchStorage } from "./utils/tzkt";
import Nft from "./pages/nft/nft.jsx";
import LandingPage from "./pages/landingPage.jsx";

const App = () => {
  
  
  useEffect(() => {
    document.title = "Token gatting";
  }, [])
  

  

  return (
    <>
    <Navbar />
    <div className="h-100">
      {/* <Navbar /> */}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/nft" element={<Nft />}></Route>
        
      </Routes>
      </BrowserRouter>
      
      {/* <div className="d-flex flex-column justify-content-center align-items-center h-100">
        
        
          <button onClick={onBuyToken} className="btn btn-primary btn-lg">
           
            {loading ? "Loading..." : "Buy Token"}
          </button>
        
      
      </div> */}
    </div>
    </>
  );
};

export default App;
