import React, { useState, useEffect, useRef } from "react";
import { environment } from "../../environment/environment.prod";
import { VOTER_URL } from "../../constants/url";
import { fetchApi } from "../../utils/fetch";
import { ApiMethods, SnackbarStatus } from "../../interfaces/method";
import { CircularProgress, Button, TextField } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaRegTrashAlt } from "react-icons/fa";
import { Voter } from "../../interfaces/method";
import { SnackbarInterface } from "../../interfaces/method";
import CustomizedSnackbars from "../../components/Snackbar";
import VoterModal from "../../components/VoterModal";
import SureDialog from "../../components/SureDialog";
import { DataGrid } from "@mui/x-data-grid";

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
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value: number) => {
    setAnchorEl(null);
    if (value) {
      generateMultipleVoter(value);
    }
  };

  const generateMultipleVoter = (count: number) => {
    const generatedVotersArray = [];

    for (let i = 0; i < count; i++) {
      const randomPin = Math.floor(100000 + Math.random() * Date.now())
        .toString()
        .slice(4, 8);
      const generatedVoter = {
        pin: randomPin.toString(),
        name: `Member ${randomPin}`,
      };
      generatedVotersArray.push(generatedVoter);
    }
    addMultipleVoters(generatedVotersArray);
  };

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

  useEffect(() => {
    if (isDeleteConfirmed && selectedIds.length) {
      removeMultiVoters(selectedIds);
      setDeleteConfirmed(false);
      setSelectedIds([]);
    }
  }, [isDeleteConfirmed, selectedIds]);

  const addMultipleVoters = async (
    generatedVoters: { pin: string; name: string }[]
  ) => {
    fetch(
      environment.apiUrl + VOTER_URL.ADDMULTIPLE,
      fetchApi(ApiMethods.POST, { generatedVoters: generatedVoters })
    )
      .then((res) => res.json())
      .then(
        (data) =>
          data &&
          (setNewVoterFetching((prevVoterFetching) => !prevVoterFetching),
          setSnackbar({
            opened: true,
            status: SnackbarStatus.SUCCESSFULL,
            message: "Votes removed successfully",
          }))
      );
  };

  const removeMultiVoters = async (ids: string[]) => {
    const selectedRows = rows.filter((vote: any) => ids.includes(vote.id));
    const deleteIds = selectedRows.map((row) => row._id);

    fetch(
      environment.apiUrl + VOTER_URL.REMOVE_MULTIPLE,
      fetchApi(ApiMethods.POST, { ids: deleteIds })
    )
      .then((res) => res.json())
      .then(
        (data) =>
          data &&
          (setNewVoterFetching((prevVoterFetching) => !prevVoterFetching),
          setSnackbar({
            opened: true,
            status: SnackbarStatus.SUCCESSFULL,
            message: "Votes removed successfully",
          }))
      );
  };

  const removeVoter = async (voterId: string) => {
    fetch(
      environment.apiUrl + VOTER_URL.DELETE(voterId),
      fetchApi(ApiMethods.DELETE, undefined)
    )
      .then((res) => res.json())
      .then(
        (data) =>
          data && setNewVoterFetching((prevVoterFetching) => !prevVoterFetching)
      );
  };

  useEffect(() => {
    fetch(
      environment.apiUrl + VOTER_URL.GET,
      fetchApi(ApiMethods.GET, undefined)
    )
      .then((res) => res.json())
      .then((data) => setVoters(data));
  }, [newVoterFetching]);

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "pin", headerName: "Pin", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params: any) => (
        <FaRegTrashAlt
          className="cursor-pointer hover:text-red-500 text-lg"
          onClick={() => handleTrashClick(params.row._id)}
        />
      ),
    },
  ];
  const filteredVoters = voters.filter((voter) => {
    const pinIncludes = voter.pin
      .toLocaleLowerCase()
      .includes(searchValue.toLocaleLowerCase());
    const nameIncludes = voter.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    return pinIncludes || nameIncludes;
  });

  const rows = filteredVoters.map((voter, index) => ({
    id: index + 1,
    ...voter,
  }));

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-medium">Voters</h1>
        <div className="flex items-center justify-center gap-4">
          {selectedIds.length >= 1 && (
            <FaRegTrashAlt
              className="cursor-pointer hover:text-red-500 text-lg"
              onClick={() => setOpenDialog(true)}
            />
          )}
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
          <Button
            variant="contained"
            sx={{ height: "48px" }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Add multiple voters
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleClose(10)}>10</MenuItem>
            <MenuItem onClick={() => handleClose(20)}>20</MenuItem>
            <MenuItem onClick={() => handleClose(50)}>50</MenuItem>
            <MenuItem onClick={() => handleClose(100)}>100</MenuItem>
          </Menu>
        </div>
      </div>

      <div style={{ height: "auto", width: "100%", marginTop: "20px" }}>
        {voters.length ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10, 20]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
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
        selectedIds={selectedIds}
      />
    </div>
  );
}

export default Voters;
