import "./InterestTag.scss";
import React from "react";
import { Box } from "@mui/material";
import { Interest } from "../../../../models/enums/interest";

export default function InterestTag({ interest }: { interest: number }) {
  const getInterestClassName = (interest: number) =>
    interest === 0 ? "interest__commercial" : "interest__social";

  return (
    <Box className={"interest " + getInterestClassName(interest)}>
      {Interest.convert(interest)}
    </Box>
  );
}
