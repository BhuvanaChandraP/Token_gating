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
      <div className="p-2">
        <h1 className="display-1" style={{fontWeight: "350"}}>NFT Gated Token </h1> 
      </div>
      <p className="lead">
        Serve exclusive content to users who own an NFT.
      </p>
      <p className="lead">
      To access the main page buy a token from our collection!
      </p>
      <br/><br/>
      <button onClick={onBuyToken} className="btn btn-primary btn-lg">
        {loading ? "Loading..." : "Buy Token"}
      </button>
    </div>
  );
};

export default LandingPage;
