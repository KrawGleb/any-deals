import "./Header.scss";
import React, { SyntheticEvent, useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../features/store/store";
import {
  signinRedirect,
  signoutRedirect,
} from "../../../features/api/auth/userService";
import { useGetMeQuery } from "../../../features/api/extensions/usersApiExtension";
import { skipToken } from "@reduxjs/toolkit/dist/query";

export default function Header() {
  const navigate = useNavigate();
  const tabsState = useSelector((state: RootState) => state.tabs);
  const [tab, setTab] = useState(0);

  const authState = useSelector((state: RootState) => state.auth);
  const isLoggedIn = !!authState.user;
  const isAdmin = authState.isAdmin;

  const { data: me } = useGetMeQuery(!isLoggedIn ? skipToken : undefined);

  const handleChange = (_event: SyntheticEvent, nextTab: number) => {
    setTab(nextTab);
  };

  useEffect(() => {
    setTab(tabsState.headerTab);
  }, [tabsState]);

  const myAdvertsTab = isLoggedIn ? (
    <PanelTab value={1} label="My adverts" to="/adverts/my" />
  ) : undefined;

  return (
    <div className="spacer">
      <Box className="header">
        <div className="header__container">
          <div className="logo" onClick={() => navigate("/")}>
            Any Deals
          </div>
          <PanelTabs value={tab} onChange={handleChange}>
            <PanelTab value={0} label="Adverts" to="/adverts/search" />
            {myAdvertsTab}
            <PanelTab value={2} label="About" to="/about" />
          </PanelTabs>
          <div className="actions">
            {isLoggedIn ? (
              <>
                <div>
                  <Typography fontWeight="bold" className="actions__balance">
                    {me?.balance}$
                  </Typography>
                </div>
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

                    <ListItemButton
                      onClick={() =>
                        navigate(
                          `/users/${authState.user?.profile.preferred_username}`
                        )
                      }
                    >
                      <ListItemText>Me</ListItemText>
                    </ListItemButton>

                    <ListItemButton
                      onClick={() =>
                        signoutRedirect({
                          id_token_hint: authState.user?.id_token,
                        })
                      }
                    >
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
                  className="actions__login"
                  onClick={() => signinRedirect()}
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
}
