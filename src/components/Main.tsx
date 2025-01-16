import { useEffect, useState } from "react";
import { environment } from "../environment/environment.prod";
import { fetchApi } from "../utils/fetch";
import { ApiMethods, SnackbarStatus } from "../interfaces/method";
import { TEAM_URL, VOTE_URL } from "../constants/url";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import { CircularProgress } from "@mui/material";
import CustomizedSnackbars from "./Snackbar";

function Main() {
  let { id }: any = useParams();
  const [selectedNumber, setSelectedNumber] = useState<number>();
  const [pin, setPin] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<any>(false);
  const [team, setTeam] = useState({
    name: '',
    teamMembers: []
  });

  const handleCloseAlert = () => {
    setOpen(false);
    setPin("");
    setSelectedNumber(undefined);
  };

  const handleSubmit = () => {
    sendVote();
  };

  const handleVote = (event: any) => {
    const point = event.target.value;
    setSelectedNumber(point)
  }

  const sendVote = () => {
    let sendVoteBody = {
      voterId: pin,
      rating: selectedNumber,
      teamId: id,
      teamName: team.name
    }
    if(selectedNumber && selectedNumber >= 0 && selectedNumber <= 50)
    {
      fetch(environment.apiUrl + VOTE_URL.POST, fetchApi(ApiMethods.POST, sendVoteBody))
      .then(res => res.json())
      .then(data => {
        if(data.error){
          setSnackbar({
            opened: true,
            status: SnackbarStatus.UNSUCCESSFULL,
            message: data.error,
          })
        }else{
          data && setOpen(true)
          setTimeout(() => {
            setOpen(false);
            location.reload();
          }, 3000);
        }
      })
    }else{
      setSnackbar({
        opened: true,
        status: SnackbarStatus.UNSUCCESSFULL,
        message: "0 la 50 arasında bal daxil edilməlidir",
      })
    }
  }

  useEffect(() => {
    fetch(environment.apiUrl + TEAM_URL.PUT(id), fetchApi(ApiMethods.GET, undefined))
      .then((res) => res.json())
      .then((data) => {
        const teamMembers = data.teamMembers.map((member: any) => JSON.parse(member));
  
        setTeam({ ...data, teamMembers });
      })
      .catch((error) => {
        console.error("Error fetching team data:", error);
      });
  }, [id]);
  
  return (
    <div className="p-[64px] max-md:p-[20px]">
      <div className="font-Inter">
        <p className="font-Inter text-gega-main text-[25px] font-semibold mb-5">
          Təqdimatçılar
        </p>
        <div className="w-full bg-gega-main py-5 rounded-lg flex md:justify-around md:flex-wrap md:flex-row flex-col justify-center items-center text-white max-md:gap-3">
          {team.teamMembers.length ? team.teamMembers.map((member: any, index) => {
            return (
              <div key={index} className="flex items-center md:pl-0 pl-10 md:w-max w-full gap-5">
                <img
                  src={`${member.image ? environment.apiUrl+'uploads/'+member.image : "/biker 1.png"}`}
                  className="rounded-md bg-gega-white w-20 h-20 object-cover"
                  alt=""
                />
                <div>
                  <p className="pb-2 text-[20px] font-medium">{member.type == 1 ? "Təqdimatçı" : "İzləyici"}</p>
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
            <div className="flex flex-col gap-1 items-center justify-center">
              <input type="number" placeholder="Bal (0-50)" className="text-black py-2 px-3 w-32" min="0" max="50" onChange={() => handleVote(event)} />
            </div>
            {/* {numbers.map((number) => (
              <div
                key={number}
                onClick={() => setSelectedNumber(number)}
                className={`rounded-full w-[50px] h-[50px]  text-black bg-gega-white flex items-center justify-center hover:cursor-pointer ${
                  selectedNumber == number ? "border-4 border-gega-green" : ""
                }`}
              >
                <p className="text-[20px] font-semibold">{number}</p>
              </div>
            ))} */}
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
        <Modal handleCloseAlert={handleCloseAlert} open={open}/>
        <CustomizedSnackbars open={snackbar} setOpen={setSnackbar} />
      </div>
    </div>
  );
}

export default Main;
