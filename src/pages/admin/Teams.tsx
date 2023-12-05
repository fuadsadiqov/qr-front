import { useState, useEffect } from "react";
import { environment } from "../../environment/environment.prod";
import { TEAM_URL } from "../../constants/url";
import { fetchApi } from "../../utils/fetch";
import {
  ApiMethods,
  SnackbarInterface,
  SnackbarStatus,
} from "../../interfaces/method";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";
import Button from "@mui/material/Button";
import TeamDrawer from "../../components/TeamDrawer";
import { TeamWithMembers } from "../../interfaces/method";
import { FaRegTrashAlt } from "react-icons/fa";
import CustomizedSnackbars from "../../components/Snackbar";

function Teams() {
  const [teams, setTeams] = useState<TeamWithMembers[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newTeamFetching, setNewTeamFetching] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({
    opened: false,
    status: null,
    message: "",
  });

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const removeTeam = async (teamId: string) => {
    fetch(
      environment.apiUrl + TEAM_URL.DELETE(teamId),
      fetchApi(ApiMethods.DELETE, undefined)
    )
      .then((res) => res.json())
      .then(
        (data) =>
          data &&
          setSnackbar({
            opened: true,
            status: SnackbarStatus.UNSUCCESSFULL,
            message: "Team remove successfully!",
          })
      );
  };

  useEffect(() => {
    fetch(
      environment.apiUrl + TEAM_URL.GET,
      fetchApi(ApiMethods.GET, undefined)
    )
      .then((res) => res.json())
      .then((data) => setTeams(data));
  }, [newTeamFetching]);

  console.log(newTeamFetching);
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-medium">Teams</h1>
        <Button variant="contained" onClick={toggleDrawer}>
          Add team
        </Button>
      </div>
      {teams.map((team) => (
        <div key={team._id} className="mt-10 p-3">
          <div className="flex items-center justify-between mb-2">
            <h4>{team.name}</h4>
            <FaRegTrashAlt
              className="text-xl cursor-pointer hover:text-red-500"
              onClick={() => {
                removeTeam(team._id);
                setNewTeamFetching(!newTeamFetching);
              }}
            />
          </div>
          <Table className="border-1 rounded-md">
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
                    <img
                      src={`${
                        member.image
                          ? environment.apiUrl + "uploads/" + member.image
                          : "/biker 1.png"
                      }`}
                      alt=""
                      width={30}
                      height={30}
                    />
                  </TableCell>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>
                    {member.type == 1 ? "Təqdimatçı" : "İzləyici"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
      {snackbar.opened && (
        <CustomizedSnackbars open={snackbar} setOpen={setSnackbar} />
      )}
      <TeamDrawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        setNewTeamFetching={setNewTeamFetching}
        newTeamFetching={newTeamFetching}
      />
    </div>
  );
}
export default Teams;
