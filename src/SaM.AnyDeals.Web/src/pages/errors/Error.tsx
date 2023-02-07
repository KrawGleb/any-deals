import "./Error.scss";
import React from "react";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { ErrorProps } from "./ErrorProps";

export default function Error({ text }: ErrorProps) {
  return (
    <Box className="error__container">
      <Stack>
        <img
          alt=""
          src="https://firebasestorage.googleapis.com/v0/b/listography-690a0.appspot.com/o/assets%2FNotFound.png?alt=media&token=20ad824c-0969-4994-89bb-45a3287b0c0c"
        />
        <Typography textAlign="center" variant="h4">
          {text}
        </Typography>
        <Link className="error__link" to="/">
          Back to home
        </Link>
      </Stack>
    </Box>
  );
}
