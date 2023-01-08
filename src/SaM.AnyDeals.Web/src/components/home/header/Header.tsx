import "./Header.scss";
import React, { SyntheticEvent, useState } from "react";
import PanelTab from "../../common/tabPanel/Tab";
import PanelTabs from "../../common/tabPanel/Tabs";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { userInfo } = useSelector((state: any) => state.auth);

  return (
    <>
      <div className="spacer">
        <Box className="header">
          <div className="header__container">
            <div className="logo">Any Deals</div>
            <PanelTabs value={value} onChange={handleChange}>
              <PanelTab label="Adverts" to="/adverts/search" />
              <PanelTab label="My adverts" to="/adverts/my" />
              <PanelTab label="About" to="/about" />
            </PanelTabs>
            <div className="actions">
              {userInfo.username ? (
                <Typography>{userInfo.username}</Typography>
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
