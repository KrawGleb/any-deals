import "./Header.scss";
import React, { SyntheticEvent, useState } from "react";
import PanelTab from "./tabPanel/PanelTab";
import PanelTabs from "./tabPanel/PanelTabs";
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../features/store/store";
import { signinRedirect } from "../../../features/api/auth/userService";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const authState = useSelector((state: RootState) => state.auth);
  const isLoggedIn = !!authState.user;
  const isAdmin = authState.isAdmin;

  const handleLogout = () => {
    // TODO: Logout
    console.log("Logout here");
    navigate("/");
  };

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const myAdvertsTab = isLoggedIn ? (
    <PanelTab label="My adverts" to="/adverts/my" />
  ) : undefined;

  return (
    <div className="spacer">
      <Box className="header">
        <div className="header__container">
          <div className="logo">Any Deals</div>
          <PanelTabs value={value} onChange={handleChange}>
            <PanelTab label="Adverts" to="/adverts/search" />
            {myAdvertsTab}
            <PanelTab label="About" to="/about" />
          </PanelTabs>
          <div className="actions">
            {isLoggedIn ? (
              <>
                <Box className="dropdown">
                  <Typography className="dropdown__text">
                    {authState.user!.profile.preferred_username}
                  </Typography>
                  <List className="dropdown__content">
                    {isAdmin ? (
                      <ListItemButton onClick={() => navigate("/moderation")}>
                        <ListItemText>Moderation</ListItemText>
                      </ListItemButton>
                    ) : (
                      <></>
                    )}

                    <ListItemButton onClick={handleLogout}>
                      <ListItemText color="error">Logout</ListItemText>
                    </ListItemButton>
                  </List>
                </Box>
              </>
            ) : (
              <>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="actions__signup"
                  onClick={() => navigate("/signup-oidc")}
                >
                  Signup
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="actions__login"
                  onClick={() => signinRedirect()}
                >
                  Signin
                </Button>
              </>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
}
