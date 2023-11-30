import { useEffect, useState } from "react";
import { environment } from "../environment/environment.prod";
import { fetchApi } from "../utils/fetch";
import { ApiMethods } from "../interfaces/method";
import { TEAM_URL, VOTE_URL } from "../constants/url";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import { CircularProgress } from "@mui/material";

function Main() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let { id }: any = useParams();
  const [selectedNumber, setSelectedNumber] = useState<number>();
  const [pin, setPin] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [members, setMembers] = useState([]);

  const handleCloseAlert = () => {
    setOpen(false);
    setPin("");
    setSelectedNumber(undefined);
  };

  const handleSubmit = () => {
    sendVote();
    setOpen(true);
  };

  const sendVote = () => {
    let sendVoteBody = {
      voterId: pin,
      rating: selectedNumber,
      teamId: id
    }
    fetch(environment.apiUrl + VOTE_URL.POST, fetchApi(ApiMethods.POST, sendVoteBody))
      .then(res => res.json())
      .then(data => data && setOpen(true))
  }

  useEffect(() => {
    fetch(
      environment.apiUrl + TEAM_URL.PUT(id),
      fetchApi(ApiMethods.GET, undefined)
    )
      .then((res) => res.json())
      .then((data) => setMembers(data.teamMembers));
  }, [id]);
  return (
    <div className="p-[64px] max-md:p-[20px]">
      <div className="font-Inter">
        <p className="font-Inter text-gega-main text-[25px] font-semibold mb-5">
          Təqdimatçılar
        </p>
        <div className="w-full bg-gega-main py-5 rounded-lg flex justify-around items-center flex-wrap text-white max-md:gap-3">
          {members.length ? members.map((member: any, index) => {
            return (
              <div key={index} className="flex items-center gap-5">
                <img
                  src="/biker 1.png"
                  className="rounded-full bg-gega-white"
                  alt=""
                />
                <div>
                  <p className="pb-2 text-[20px] font-medium">{member.type}</p>
                  <p>{member.name}</p>
                </div>
              </div>
            );
          }) : <CircularProgress color="inherit"/>}
        </div>
      </div>
      <div className="font-Inter pt-5">
        <p className="font-Inter text-gega-main text-[25px] font-semibold mb-5">
          Qiymətləndirmə
        </p>
        <div className="w-full bg-gega-main py-10 px-10 rounded-lg flex justify-around text-white">
          <div className="flex justify-around items-center flex-wrap gap-10 w-full">
            {numbers.map((number) => (
              <div
                key={number}
                onClick={() => setSelectedNumber(number)}
                className={`rounded-full w-[50px] h-[50px]  text-black bg-gega-white flex items-center justify-center hover:cursor-pointer ${
                  selectedNumber == number ? "border-4 border-gega-green" : ""
                }`}
              >
                <p className="text-[20px] font-semibold">{number}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full bg-gega-main h-[85px] rounded-lg flex justify-around items-center text-white mt-10">
          <input
            type="text"
            placeholder="Pini daxil edib, təsdiqləyin"
            className="px-5 py-1 w-[300px] text-gega-black outline-none rounded-lg"
            onChange={(e) => setPin(e.target.value)}
            value={pin}
          />
        </div>
        <div className="w-full flex items-center justify-center mt-7 ">
          <button
            className={`bg-gega-main text-white text-xl px-8 py-2 font-semibold rounded-3xl outline-none ${
              pin && selectedNumber ? "" : "opacity-50"
            }`}
            disabled={pin && selectedNumber ? false : true}
            onClick={handleSubmit}
          >
            Təsdiq edin
          </button>
        </div>
        {open && <Modal handleCloseAlert={handleCloseAlert}/>}
      </div>
    </div>
  );
}

export default Main;
