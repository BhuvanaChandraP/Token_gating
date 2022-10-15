import { useState } from "react";
import { buyTicketOperation } from "../utils/operation";
const LandingPage = () => {
    const [loading, setLoading] = useState(false);

    
    const onBuyToken = async () => {
      try {
        setLoading(true);
        await buyTicketOperation();
        alert("Transaction succesful!");
      } catch (err) {
        alert(err.message);
      }
      setLoading(false);
    };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100">
   
    
        <button onClick={onBuyToken} className="btn btn-primary btn-lg">
       
            {loading ? "Loading..." : "Buy Token"}
        </button>
    
  
    </div>
  );
};

export default LandingPage;
