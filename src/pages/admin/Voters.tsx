import { useState, useEffect, useRef } from "react";
import { environment } from "../../environment/environment.prod";
import { VOTER_URL } from "../../constants/url";
import { fetchApi } from "../../utils/fetch";
import { ApiMethods, SnackbarStatus } from "../../interfaces/method";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TextField,
  CircularProgress,
} from "@mui/material";
import Button from "@mui/material/Button";
import { FaRegTrashAlt } from "react-icons/fa";
import { Voter } from "../../interfaces/method";
import { SnackbarInterface } from "../../interfaces/method";
import CustomizedSnackbars from "../../components/Snackbar";
import VoterModal from "../../components/VoterModal";
import SureDialog from "../../components/SureDialog";

function Voters() {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVoterFetching, setNewVoterFetching] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({
    opened: false,
    status: null,
    message: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleteConfirmed, setDeleteConfirmed] = useState(false);
  const trashClickIdRef = useRef<string | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleTrashClick = (id: string) => {
    setOpenDialog(true);
    trashClickIdRef.current = id;
  };

  useEffect(() => {
    if (isDeleteConfirmed && trashClickIdRef.current) {
      removeVoter(trashClickIdRef.current);
      setDeleteConfirmed(false);
    }
  }, [isDeleteConfirmed, trashClickIdRef]);

  const removeVoter = async (voterId: string) => {
    fetch(
      environment.apiUrl + VOTER_URL.DELETE(voterId),
      fetchApi(ApiMethods.DELETE, undefined)
    )
      .then((res) => res.json())
      .then(
        (data) =>
          data &&
          (setNewVoterFetching(
            (prevVoterFetching) => (prevVoterFetching = !prevVoterFetching)
          ),
          setSnackbar({
            opened: true,
            status: SnackbarStatus.UNSUCCESSFULL,
            message: "Voter removed successfully",
          }))
      );
  };

  useEffect(() => {
    fetch(
      environment.apiUrl + VOTER_URL.GET,
      fetchApi(ApiMethods.GET, undefined)
    )
      .then((res) => res.json())
      .then((data) => setVoters(data));
  }, []);

  useEffect(() => {
    fetch(
      environment.apiUrl + VOTER_URL.GET,
      fetchApi(ApiMethods.GET, undefined)
    )
      .then((res) => res.json())
      .then((data) => setVoters(data));
  }, [newVoterFetching]);

  const filteredVoters = voters.filter((voter) => {
    const pinIncludes = voter.pin
      .toLocaleLowerCase()
      .includes(searchValue.toLocaleLowerCase());
    const nameIncludes = voter.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    return pinIncludes || nameIncludes;
  });

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-medium">Voters</h1>
        <div className="flex items-center justify-center gap-4">
          <TextField
            id="pin"
            name="pin"
            label="Search voter"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ height: "48px" }}
          />
          <Button
            variant="contained"
            onClick={toggleModal}
            sx={{ height: "48px" }}
          >
            Add Voter
          </Button>
        </div>
      </div>

      <div className="mt-10 p-3">
        {filteredVoters.length ? (
          <Table className="border-1 rounded-md">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVoters.map((voter) => (
              <TableRow key={voter._id}>
                <TableCell>{voter.pin}</TableCell>
                <TableCell>{voter.name}</TableCell>
                <TableCell>
                  <FaRegTrashAlt
                    className="cursor-pointer hover:text-red-500 text-lg"
                    onClick={() => handleTrashClick(voter._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>) : <div className="flex justify-center"><CircularProgress color="info"/></div>}
      </div>

      {snackbar.opened && (
        <CustomizedSnackbars open={snackbar} setOpen={setSnackbar} />
      )}
      <VoterModal
        setChanges={setNewVoterFetching}
        open={isModalOpen}
        onClose={toggleModal}
      />
      <SureDialog
        open={openDialog}
        handleClose={toggleDialog}
        setDelete={setDeleteConfirmed}
      />
    </div>
  );
}
export default Voters;
