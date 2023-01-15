import "./GoalTag.scss";
import React from "react";
import { Goal } from "../../../../models/enums/goal";
import { Box } from "@mui/material";

export default function GoalTag({ goal }: { goal: number }) {
  const getGoalClassName = (goal: number) =>
    goal === 0 ? "goal__request" : "goal__offer";

  return (
    <Box className={"goal " + getGoalClassName(goal)}>{Goal.convert(goal)}</Box>
  );
}
