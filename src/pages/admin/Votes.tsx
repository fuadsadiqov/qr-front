import { useEffect, useState, useRef } from "react";
import { environment } from "../../environment/environment.prod";
import { VOTE_URL } from "../../constants/url";
import { fetchApi } from "../../utils/fetch";
import { ApiMethods, SnackbarStatus } from "../../interfaces/method";
import { FaRegTrashAlt } from "react-icons/fa";
import SureDialog from "../../components/SureDialog";
import { SnackbarInterface } from "../../interfaces/method";
import CustomizedSnackbars from "../../components/Snackbar";

import { DataGrid } from "@mui/x-data-grid";
import { TextField, CircularProgress } from "@mui/material";

interface Vote {
  _id: string;
  voterId: string;
  teamId: string;
  teamName: string;
  rating: number;
}

function Votes() {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleteConfirmed, setDeleteConfirmed] = useState(false);
  const [newVoteFetching, setNewVoteFetching] = useState(false);
  const trashClickIdRef = useRef<string | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({
    opened: false,
    status: null,
    message: "",
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleTrashClick = (id: string) => {
    setOpenDialog(true);
    trashClickIdRef.current = id;
  };

  useEffect(() => {
    if (isDeleteConfirmed && trashClickIdRef.current) {
      removeVote(trashClickIdRef.current);
      setDeleteConfirmed(false);
    }
  }, [isDeleteConfirmed, trashClickIdRef]);

  const removeVote = async (voteId: string) => {
    fetch(
      environment.apiUrl + VOTE_URL.DELETE(voteId),
      fetchApi(ApiMethods.DELETE, undefined)
    )
      .then((res) => res.json())
      .then(
        (data) =>
          data &&
          (setNewVoteFetching((prevVoteFetching) => !prevVoteFetching),
          setSnackbar({
            opened: true,
            status: SnackbarStatus.SUCCESSFULL,
            message: "Voter removed successfully",
          }))
      );
  };

  useEffect(() => {
    fetch(
      environment.apiUrl + VOTE_URL.GET,
      fetchApi(ApiMethods.GET, undefined)
    )
      .then((res) => res.json())
      .then((data) => setVotes(data));
  }, [newVoteFetching]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "voterId", headerName: "Voter ID", flex: 1 },
    { field: "teamName", headerName: "Team Name", flex: 1 },
    { field: "rating", headerName: "Rating", width: 100 },
    {
      field: "actions",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: (params: any) => (
        <FaRegTrashAlt
          className="cursor-pointer hover:text-red-500 text-lg"
          onClick={() => handleTrashClick(params.row._id)}
        />
      ),
    },
  ];
  const filteredVotes = votes.filter((vote) => {
    const voterIdIncludes = vote.voterId
      .toLocaleLowerCase()
      .includes(searchValue.toLocaleLowerCase());
    const teamIdIncludes = vote.teamName
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const ratingIncludes = vote.rating.toString().includes(searchValue);
    return voterIdIncludes || teamIdIncludes || ratingIncludes;
  });
  const rows = filteredVotes.map((vote, index) => ({ id: index + 1, ...vote }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Votes</h1>
        <div className="flex items-center justify-center gap-3">
          {selectedIds.length >= 1 && (
            <FaRegTrashAlt className="cursor-pointer hover:text-red-500 text-lg" />
          )}
          <TextField
            id="pin"
            name="pin"
            label="Search voter"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{ height: "48px" }}
          />
        </div>
      </div>

      <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
        {votes.length ? (
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 6,
                },
              },
            }}
            checkboxSelection
            onRowSelectionModelChange={(id: any) => {
              setSelectedIds(id);
            }}
            rowSelectionModel={selectedIds}
          />
        ) : (
          <div className="flex justify-center">
            <CircularProgress color="info" />
          </div>
        )}
      </div>
      <CustomizedSnackbars open={snackbar} setOpen={setSnackbar} />
      <SureDialog
        open={openDialog}
        handleClose={toggleDialog}
        setDelete={setDeleteConfirmed}
      />
    </div>
  );
}

export default Votes;
