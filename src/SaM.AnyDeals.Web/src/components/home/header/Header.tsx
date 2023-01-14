import "./Header.scss";
import React, { SyntheticEvent, useState } from "react";
import PanelTab from "../../common/tabPanel/Tab";
import PanelTabs from "../../common/tabPanel/Tabs";
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
import { logout } from "../../../features/api/auth/authSlice";
import Divider from "@mui/material/Divider";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { userInfo }: any = useSelector((state: RootState) => state.auth);

  const isLoggedIn = !!userInfo.username;
  let myAdvertsTab = undefined;
  if (isLoggedIn) {
    myAdvertsTab = <PanelTab label="My adverts" to="/adverts/my" />;
  }

  return (
    <>
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
                      {userInfo.username}
                    </Typography>
                    <List className="dropdown__content">
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
                    onClick={() => navigate("/signup")}
                  >
                    Signup
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="actions__login"
                    onClick={() => navigate("/signin")}
                  >
                    Signin
                  </Button>
                </>
              )}
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}
