import { useState, useEffect } from "react";
import { environment } from "../../environment/environment.prod";
import { TEAM_URL } from "../../constants/url";
import { fetchApi } from "../../utils/fetch";
import { ApiMethods } from "../../interfaces/method";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";
import Button from "@mui/material/Button";
import TeamDrawer from "../../components/TeamDrawer";

interface Team {
  name: string;
  _id: number;
  teamMembers: {
    name: string;
    type: string;
  }[];
}

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    fetch(
      environment.apiUrl + TEAM_URL.GET,
      fetchApi(ApiMethods.GET, undefined)
    )
      .then((res) => res.json())
      .then((data) => setTeams(data));
  }, []);


  return (
    <div>
      <div className="flex w-full items-center gap-32">
        <p>Teams</p>
        <Button variant="contained" onClick={toggleDrawer}>
          Add team
        </Button>
      </div>
      {teams.map((team) => (
        <div key={team._id} className="mt-10 border-1 rounded-md p-3">
          <p>{team.name}</p>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {team.teamMembers.map((member, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img src="/biker 1.png" alt="" width={30} height={30} />
                  </TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>{member.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
      <TeamDrawer open={isDrawerOpen} onClose={toggleDrawer} />
    </div>
  );
}
export default Teams;
