import { useState, useEffect } from "react";
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
} from "@mui/material";
import Button from "@mui/material/Button";
import { FaRegTrashAlt } from "react-icons/fa";
import { Voter } from "../../interfaces/method";
import { SnackbarInterface } from "../../interfaces/method";
import CustomizedSnackbars from "../../components/Snackbar";
import VoterModal from "../../components/VoterModal";

function Voters() {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({
    opened: false,
    status: null,
    message: "",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  

  const removeVoter = async (voterId: string) => {
    fetch(
      environment.apiUrl + VOTER_URL.DELETE(voterId),
      fetchApi(ApiMethods.DELETE, undefined)
    )
      .then((res) => res.json())
      .then(
        (data) =>
          data &&
          setSnackbar({
            opened: true,
            status: SnackbarStatus.SUCCCESSFULL,
            message: "Voter remove successfully",
          })
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

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-medium">Voters</h1>
        <Button variant="contained" onClick={toggleModal}>
          Add Voter
        </Button>
      </div>

      <div className="mt-10 p-3">
        <Table className="border-1 rounded-md">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Option</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {voters.map((voter) => (
              <TableRow key={voter.voterId}>
                <TableCell>{voter.voterId}</TableCell>
                <TableCell>{voter.name}</TableCell>
                <TableCell>
                  <FaRegTrashAlt
                    onClick={() => {
                      removeVoter(voter.voterId);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {snackbar.opened && (
        <CustomizedSnackbars open={snackbar} setOpen={setSnackbar} />
      )}
      <VoterModal
        open={isModalOpen}
        onClose={toggleModal}
      />
    </div>
  );
}
export default Voters;
