import { Routes, Route } from "react-router-dom";
import Main from "../components/Main";
import AllTeams from "./AllTeams";

function Home() {
  return (
    <div>
      <div className="flex items-center justify-center flex-nowrap gap-[100px] max-md:gap-0">
        <img
          src="/ascca-logo.jpg"
          width={150}
          alt=""
          className="max-2xl:w-350"
        />
        <img src="/dka-logo.webp" width={170} alt="" className="max-2xl:w-370" />
      </div>
      <Routes>
        <Route path="/" element={<AllTeams />} />
        <Route path="/teamId/:id" element={<Main />} />
      </Routes>
    </div>
  );
}

export default Home;
