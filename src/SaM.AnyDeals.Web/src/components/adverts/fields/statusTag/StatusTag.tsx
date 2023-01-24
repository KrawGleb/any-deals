import "./StatusTag.scss";
import React from "react";
import { Box } from "@mui/material";
import { Status } from "../../../../models/enums/status";

export default function StatusTag({ status }: { status: number }) {
  const statusClassNames = new Map<number, string>([
    [Status.Accepted, "status__accepted"],
    [Status.OnModeration, "status__onmoderation"],
    [Status.Rejected, "status__rejected"],
  ]);

  return (
    <Box className={"status " + statusClassNames.get(status)}>
      {Status.convert(status)}
    </Box>
  );
}
