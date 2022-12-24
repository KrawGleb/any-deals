import "./Header.scss";
import React, { SyntheticEvent, useState } from "react";
import PanelTab from "../../common/tab-panel/Tab";
import PanelTabs from "../../common/tab-panel/Tabs";

export default function Header() {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="header__root">
      <div className="header__container">
        <div className="logo"></div>
        <PanelTabs value={value} onChange={handleChange}>
          <PanelTab label="Adverts" />
          <PanelTab label="About" />
        </PanelTabs>
        <div className="actions"></div>
      </div>
    </div>
  );
}
