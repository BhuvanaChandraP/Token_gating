import nft1 from "../../assests/nft1.jpeg";
import nft2 from "../../assests/nft2.jpeg";
import nft3 from "../../assests/nft3.jpeg";
import nft4 from "../../assests/nft4.jpeg";
import nft5 from "../../assests/nft5.jpeg";
import nft6 from "../../assests/nft6.jpeg";
import "./style.css";
const Nft = () => {
  
  return (
    <div class = "top-level" >
      <img src={nft1} alt="nft1" width="300px" height="300px" />
      <img src={nft2} alt="nft2" width="300px" height="300px" />
      <img src={nft3} alt="nft3" width="300px" height="300px" />
      <img src={nft4} alt="nft4" width="300px" height="300px" />
      <img src={nft5} alt="nft5" width="300px" height="300px" />
      <img src={nft6} alt="nft6" width="300px" height="300px" />
      <img src={nft2} alt="nft2" width="300px" height="300px" />
      <img src={nft1} alt="nft1" width="300px" height="300px" />
    </div>
  );
};

export default Nft;
