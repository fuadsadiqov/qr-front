import { useEffect, useState } from "react";
import { environment } from "../../environment/environment.prod";
import { VOTE_URL } from "../../constants/url";
import { fetchApi } from "../../utils/fetch";
import { ApiMethods } from "../../interfaces/method";
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";


interface Vote {
  _id: string;
  voterId: string;
  teamId: string;
  rating: number;
}

function Votes() {
  const [votes, setVotes] = useState<Vote[]>([]); // Initialize as an empty array

  useEffect(() => {
    fetch(
      environment.apiUrl + VOTE_URL.GET,
      fetchApi(ApiMethods.GET, undefined)
    )
      .then((res) => res.json())
      .then((data) => setVotes(data));
  }, []);

  return (
    <div>
      <p>Votes</p>
      <div className="border-1 p-3 rounded-md mt-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Voter id</TableCell>
              <TableCell>Team id</TableCell>
              <TableCell>Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {votes !== undefined &&
              votes.map((vote) => (
                <TableRow key={vote._id}>
                  <TableCell>{vote.voterId}</TableCell>
                  <TableCell>{vote.teamId}</TableCell>
                  <TableCell>{vote.rating}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Votes;
