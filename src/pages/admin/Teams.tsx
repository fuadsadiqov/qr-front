import { useState, useEffect, useRef } from "react";
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
  CircularProgress,
} from "@mui/material";
import Button from "@mui/material/Button";
import TeamDrawer from "../../components/TeamDrawer";
import { TeamWithMembers } from "../../interfaces/method";
import { FaRegTrashAlt } from "react-icons/fa";
import CustomizedSnackbars from "../../components/Snackbar";
import SureDialog from "../../components/SureDialog";
import QRModal from "../../components/QR-modal";
import { QRModalInterface } from "../../interfaces/method";

function Teams() {
  const [teams, setTeams] = useState<TeamWithMembers[]>([]);
  const [qrModalOpen, setQrModalOpen] = useState<QRModalInterface>({
    open: false,
    value: "",
    name: "",
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newTeamFetching, setNewTeamFetching] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({
    opened: false,
    status: null,
    message: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleteConfirmed, setDeleteConfirmed] = useState(false);
  const trashClickIdRef = useRef<string | null>(null);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleTrashClick = (id: string) => {
    trashClickIdRef.current = id;
    setOpenDialog(true);
  };

  useEffect(() => {
    if (isDeleteConfirmed && trashClickIdRef.current) {
      removeTeam(trashClickIdRef.current);
      setDeleteConfirmed(false);
    }
  }, [isDeleteConfirmed, trashClickIdRef]);

  const removeTeam = async (teamId: string) => {
    fetch(
      environment.apiUrl + TEAM_URL.DELETE(teamId),
      fetchApi(ApiMethods.DELETE, undefined)
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSnackbar({
            opened: true,
            status: SnackbarStatus.SUCCESSFULL,
            message: "Team removed successfully!",
          });
          setNewTeamFetching(!newTeamFetching);
        }
      });
  };

  const createQR = ({ id, name }: { id: string; name: string }) => {
    const url = window.location.origin + "/teamId/" + id;
    console.log(url);
    console.log(name);

    setQrModalOpen({
      open: true,
      value: url,
      name: name,
    });
  };

  useEffect(() => {
    fetch(
      environment.apiUrl + TEAM_URL.GET,
      fetchApi(ApiMethods.GET, undefined)
    )
      .then((res) => res.json())
      .then((data) => setTeams(data));
  }, [newTeamFetching]);

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-medium">Teams</h1>
        <Button variant="contained" onClick={toggleDrawer}>
          Add team
        </Button>
      </div>
      {teams.length ? (
        teams.map((team) => (
          <div key={team.id} className="mt-10 p-3">
            <div className="flex items-center justify-between mb-2">
              <h4>{team.name}</h4>
              <div className="flex gap-2 items-center">
                <img
                  onClick={() => createQR({ id: team.id, name: team.name })}
                  width={35}
                  src="/qr-icon.svg"
                  className="cursor-pointer"
                  alt="QR icon"
                  title="Create QR"
                />
                <FaRegTrashAlt
                  className="text-xl cursor-pointer hover:text-red-500"
                  onClick={() => handleTrashClick(team.id)}
                />
              </div>
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
        ))
      ) : (
        <div className="flex justify-center">
          <CircularProgress color="info" />
        </div>
      )}
      {snackbar.opened && (
        <CustomizedSnackbars open={snackbar} setOpen={setSnackbar} />
      )}
      <QRModal
        open={qrModalOpen}
        onClose={() => setQrModalOpen({ open: false, value: "", name: "" })}
      />
      <TeamDrawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        setNewTeamFetching={setNewTeamFetching}
        newTeamFetching={newTeamFetching}
      />
      <SureDialog
        open={openDialog}
        handleClose={toggleDialog}
        setDelete={setDeleteConfirmed}
      />
    </div>
  );
}
export default Teams;
