"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import ApiIcon from "@mui/icons-material/Api";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ContactsIcon from "@mui/icons-material/Contacts";
import { Typography } from "@mui/material";

export default function SideBar() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const getIcon = (text: string) => {
    switch (text) {
      case "API":
        return <ApiIcon />;
      case "Services":
        return <MiscellaneousServicesIcon />;
      case "Contact":
        return <ContactsIcon />;
      default:
        return null;
    }
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <Typography
        variant="h6"
        className="text-center"
        noWrap
        component="div"
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <img
          src="hm-lock.svg"
          alt=""
          width={30}
          style={{ marginLeft: 100, marginTop: 20 }}
        />
      </Typography>
      <List>
        {[
          "Buy Crypto",
          "Market",
          "Trade",
          "Future",
          "Earn",
          "Square",
          "More",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component="a" href={`/${text.toLowerCase()}`}>
              <ListItemIcon>
                {index % 2 === 0 ? <DashboardIcon /> : <HomeIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["API", "Services", "Contact"].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component="a" href={`/${text.toLowerCase()}`}>
              <ListItemIcon>{getIcon(text)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <MenuIcon onClick={toggleDrawer(true)} className="text-white" />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
