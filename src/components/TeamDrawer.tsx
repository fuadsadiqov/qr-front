import { useState } from "react";
import { environment } from "../environment/environment.prod";
import { fetchApi } from "../utils/fetch";
import {
  ApiMethods,
  SnackbarInterface,
  SnackbarStatus,
  UserType,
} from "../interfaces/method";
import { IMAGE_URL, TEAM_URL } from "../constants/url";
import { getBase64 } from "../helpers/getBase64";
import { FaRegTrashAlt } from "react-icons/fa";
import { Formik, Form, FieldArray } from "formik";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import { Input, MenuItem, Select } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import CustomizedSnackbars from "./Snackbar";

interface TeamDrawerProps {
  open: boolean;
  onClose: () => void;
  setNewTeamFetching: (value: boolean) => void;
  newTeamFetching: boolean;
}

export default function TeamDrawer({
  open,
  onClose,
  setNewTeamFetching,
  newTeamFetching,
}: TeamDrawerProps) {
  const [snackbar, setSnackbar] = useState<SnackbarInterface>({
    status: null,
    opened: false,
    message: "",
  });
  const resetSnackbar = () => {
    setSnackbar({
      message: "",
      status: null,
      opened: false,
    });
  };
  const sendImage = async (base64Image: any) => {
    try {
      let fileName = "";
      const response = await fetch(
        environment.apiUrl + IMAGE_URL.POST,
        fetchApi(ApiMethods.POST, base64Image)
      );
      const responseJson = await response.json();
      fileName = await responseJson.fileName;
      return fileName;
    } catch (error) {
      setSnackbar({
        opened: true,
        status: SnackbarStatus.UNSUCCESSFULL,
        message: "Please add another image",
      });
      setTimeout(() => {
        resetSnackbar();
      }, 3000);
      console.error("Error sendind image: ", error);
    }
  };
  const onFileUpload = async (e: any) => {
    const file = e;
    let response: string | undefined = "";
    if (file) {
      try {
        const data = await getBase64(file);
        const res = await sendImage({ base64Image: data });
        response = res;
        return response;
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleSubmit = (values: any) => {
    fetch(environment.apiUrl + TEAM_URL.POST, fetchApi(ApiMethods.POST, values))
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSnackbar({
            opened: true,
            status: SnackbarStatus.SUCCESSFULL,
            message: "Team added successfully",
          });
          setNewTeamFetching(!newTeamFetching);
          onClose();
          setTimeout(() => {
            resetSnackbar();
          }, 1000);
        }
      });
  };

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <div className="p-5 flex flex-col">
        <div className="flex justify-between items-center">
          <h1 className="font-medium mb-2 text-2xl">Add new team</h1>
          <IoMdClose onClick={onClose} className="text-3xl cursor-pointer" />
        </div>
        <Formik
          initialValues={{
            name: "",
            teamMembers: [{ name: "", type: UserType.VIEWER, image: "" }],
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <TextField
                required
                label="Team name"
                name="name"
                value={values.name}
                onChange={handleChange}
              />

              <FieldArray name="teamMembers">
                {({ push, remove }) => (
                  <>
                    {values.teamMembers.map((member, index) => (
                      <div key={index} className="my-5 flex gap-3 items-center">
                        <TextField
                          required
                          label={`Member Name`}
                          name={`teamMembers.${index}.name`}
                          value={member.name}
                          onChange={handleChange}
                        />
                        <Select
                          required
                          label={`Member Type`}
                          name={`teamMembers.${index}.type`}
                          value={member.type}
                          onChange={handleChange}
                        >
                          <MenuItem value={UserType.VIEWER}>Viewer</MenuItem>
                          <MenuItem value={UserType.PRESENTER}>
                            Presenter
                          </MenuItem>
                        </Select>
                        <Input
                          onChange={async (e: any) => {
                            try {
                              const result = await onFileUpload(
                                e.target.files[0]
                              );
                              setFieldValue(
                                `teamMembers.${index}.image`,
                                result
                              );
                            } catch (error) {
                              console.error("Error:", error);
                            }
                          }}
                          required
                          type="file"
                          className="w-[200px]"
                        />
                        {values.teamMembers[index].image && (
                          <img
                            className="w-12 h-12 object-cover"
                            src={`${
                              environment.apiUrl +
                              "uploads/" +
                              values.teamMembers[index].image
                            }`}
                            alt=""
                          />
                        )}
                        <FaRegTrashAlt
                          className="hover:text-red-500 transition-colors cursor-pointer"
                          onClick={() =>
                            values.teamMembers.length != 1 && remove(index)
                          }
                        />
                      </div>
                    ))}
                    <Button
                      variant="contained"
                      onClick={() =>
                        push({ name: "", type: UserType.VIEWER, image: "" })
                      }
                      sx={{ marginRight: "10px" }}
                    >
                      Add Member
                    </Button>
                  </>
                )}
              </FieldArray>
              <Button
                type="submit"
                color="success"
                variant="contained"
                className="mt-5"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      {snackbar.opened && (
        <CustomizedSnackbars open={snackbar} setOpen={setSnackbar} />
      )}
    </Drawer>
  );
}
