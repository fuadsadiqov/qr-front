import { useState, useEffect } from "react";
import { environment } from "../environment/environment.prod";
import { fetchApi } from "../utils/fetch";
import { TEAM_URL } from "../constants/url";
import { ApiMethods } from "../interfaces/method";
import { useNavigate } from "react-router-dom";
import { Team } from '../interfaces/method'


function AllTeams() {
  const [teams, setTeams] = useState<Team[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      environment.apiUrl + TEAM_URL.GET,
      fetchApi(ApiMethods.GET, undefined)
    )
      .then((res) => res.json())
      .then((data) => setTeams(data));
  }, []);

  return (
    <div className="p-[64px] max-md:p-[20px]">
      <div className="font-Inter">
        <p className="font-Inter text-gega-main text-[25px] font-semibold mb-5">
          Komandalar
        </p>
        <div>
          {teams?.map((team) => (
            <div
              key={team._id}
              className="w-full bg-gega-main mt-6 flex justify-between items-center py-4 px-6 rounded-3xl"
            >
              <p className="text-white text-2xl font-medium">{team.name}</p>
              <button
                className="border border-white px-10 py-3 text-xl text-white hover:bg-white hover:text-gega-main transition-colors font-medium rounded-2xl"
                onClick={() => navigate(`/teamId/${team._id}`)}
              >
                Səs verin
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllTeams;
