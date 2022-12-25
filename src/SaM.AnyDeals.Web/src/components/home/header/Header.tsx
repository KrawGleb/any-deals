import "./Header.scss";
import React, { SyntheticEvent, useState } from "react";
import PanelTab from "../../common/tab-panel/Tab";
import PanelTabs from "../../common/tab-panel/Tabs";
import PrimaryButton from "../../common/PrimaryButton";
import Filters from "../filters/Filters";
import { Box } from "@mui/material";

export default function Header() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const navigate = (url: string) => (window.location.href = url);

  return (
    <>
      <div className="filler">
        <Box className="header">
          <div className="header__container">
            <div className="logo">Any Deals</div>
            <PanelTabs value={value} onChange={handleChange}>
              <PanelTab label="Adverts" />
              <PanelTab label="About" />
            </PanelTabs>
            <div className="actions">
              <PrimaryButton
                className="actions__signup"
                onClick={() => navigate("/signup")}
              >
                Signup
              </PrimaryButton>
              <PrimaryButton
                className="actions__login"
                onClick={() => navigate("/signin")}
              >
                Login
              </PrimaryButton>
            </div>
          </div>
        </Box>
      </div>
      <Filters></Filters>
    </>
  );
}
