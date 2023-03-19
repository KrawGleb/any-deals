import { Box, Typography } from "@mui/material";
import React from "react";
import AnimatedBox from "../animated/box/AnimatedBox";
import "./Placeholder.scss";

export default function Placeholder() {
  return (
    <Box className="empty-placeholder">
      <AnimatedBox delay={0.1}>
        <Typography fontSize={24} color="gray">
          There's nothing yet.
        </Typography>
      </AnimatedBox>
    </Box>
  );
}
