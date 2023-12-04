import { useState } from "react";
import { environment } from "../environment/environment.prod";
import { fetchApi } from "../utils/fetch";
import { ApiMethods } from "../interfaces/method";
import { IMAGE_URL, TEAM_URL } from "../constants/url";
import { getBase64 } from "../helpers/getBase64";
import { FaRegTrashAlt } from "react-icons/fa";
import { Formik, Form, FieldArray } from "formik";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import { Input } from "@mui/material";
import { IoMdClose } from "react-icons/io";

interface TeamDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function TeamDrawer({ open, onClose }: TeamDrawerProps) {
  const [fileName, setFileName] = useState("");
  const imageBase64: any = {
    base64Image: "",
  };

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(fileName => fileName = file.name);
      getBase64(file).then((data: any) => (imageBase64.base64Image = data));
      console.log(file.name);
    }
  };

  const sendImage = () => {
    fetch(
      environment.apiUrl + IMAGE_URL.POST,
      fetchApi(ApiMethods.POST, imageBase64)
    )
      .then((res) => res.json())
      .then((data) => setFileName(data.fileName));
  };

  const handleSubmit = (values: any) => {
    fetch(environment.apiUrl + TEAM_URL.POST, fetchApi(ApiMethods.POST, values))
      .then((res) => res.json())
      .then((data) => console.log(data));
    console.log(values);
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
            teamName: "",
            members: [{ memberName: "", memberType: "", file: null }],
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form>
              <TextField
                required
                label="Team name"
                name="teamName"
                value={values.teamName}
                onChange={handleChange}
              />

              <FieldArray name="members">
                {({ push, remove }) => (
                  <>
                    {values.members.map((member, index) => (
                      <div
                        key={index}
                        className="my-5 flex gap-3 items-center justify-center"
                      >
                        <TextField
                          label={`Member Name`}
                          name={`members.${index}.memberName`}
                          value={member.memberName}
                          onChange={handleChange}
                        />
                        <TextField
                          label={`Member Type`}
                          name={`members.${index}.memberType`}
                          value={member.memberType}
                          onChange={handleChange}
                        />
                        <Input
                          onChange={(e: any): any => {
                            onFileUpload(e);
                            setFieldValue(
                              `members.${index}.file`,
                              e.target.files?.[0]
                            );
                            sendImage();
                          }}
                          type="file"
                          className="w-[200px]"
                        />
                        <FaRegTrashAlt onClick={() => remove(index)} />
                      </div>
                    ))}
                    <Button
                      variant="contained"
                      onClick={() =>
                        push({ memberName: "", memberType: "", file: null })
                      }
                      sx={{ marginRight: "10px" }}
                    >
                      Add Member
                    </Button>
                  </>
                )}
              </FieldArray>

              <Button type="submit" variant="contained" className="mt-3 m-5">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Drawer>
  );
}
