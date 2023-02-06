import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

export default function NotFound() {
  return (
    <Box className="not-found__container">
      <Stack>
        <img
          alt=""
          src="https://firebasestorage.googleapis.com/v0/b/listography-690a0.appspot.com/o/assets%2FNotFound.png?alt=media&token=20ad824c-0969-4994-89bb-45a3287b0c0c"
        />
        <Typography textAlign="center" variant="h4">
          Not Found
        </Typography>
        <Link className="not-found__link" to="/">
          Back to home
        </Link>
      </Stack>
    </Box>
  );
}
