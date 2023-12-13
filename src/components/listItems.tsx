import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from "@mui/icons-material/BarChart";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/admin">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/admin/teams">
      <ListItemIcon>
        <GroupsIcon />
      </ListItemIcon>
      <ListItemText primary="Teams" />
    </ListItemButton>
    <ListItemButton component={Link} to="/admin/voters">
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="Voters" />
    </ListItemButton>
    <ListItemButton component={Link} to="/admin/votes">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Votes" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = <React.Fragment></React.Fragment>;
