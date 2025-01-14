import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "../components/Main";
import AllTeams from "./AllTeams";

function Home() {

  const navigate = useNavigate();
  
  return (
    <div>
      <div className="flex items-center justify-center flex-nowrap gap-[100px] max-md:gap-0">
        <img
          src="/ascca-logo.jpg"
          width={150}
          onClick={() => navigate(`/`)}
          alt=""
          className="max-2xl:w-350 cursor-pointer"
        />
        <img src="/dka-logo.webp" width={170} alt="" onClick={() => navigate(`/`)} className="max-2xl:w-370 cursor-pointer" />
      </div>
      <Routes>
        <Route path="/" element={<AllTeams />} />
        <Route path="/teamId/:id" element={<Main />} />
      </Routes>
    </div>
  );
}

export default Home;
