import {
  Box,
  FormControlLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import ControlledInput from "../../../../common/controlledInput/ControlledInput";
import { AreaProps } from "../AreaProps";

export default function AdvertGroupFormArea({ control, errors }: AreaProps) {
  return (
    <Paper sx={{ padding: "16px" }}>
      <Typography variant="h6">Advertisement's group</Typography>
      <Typography variant="subtitle1" className="mb-3" color="gray">
        In which section would you like to place your ad?
      </Typography>
      <Box className="mb-2">
        <ControlledInput
          control={control}
          name="group"
          required
          select
          label="Group"
          defaultValue=""
          error={!!errors.group}
          helperMessage={errors?.group?.message}
        >
          <MenuItem key={0} value={0}>
            Services nearby
          </MenuItem>
          <MenuItem key={1} value={1}>
            Online services
          </MenuItem>
          <MenuItem key={2} value={2}>
            Events and places
          </MenuItem>
        </ControlledInput>
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          Advertisement's goal
        </Typography>
        <Controller
          name="goal"
          control={control}
          render={({ field }) => (
            <RadioGroup row defaultValue={0} {...field}>
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="I'm looking for"
              />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="I suggest"
              />
            </RadioGroup>
          )}
        />
      </Box>

      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          My interest
        </Typography>
        <Controller
          name="interest"
          control={control}
          render={({ field }) => (
            <RadioGroup row {...field}>
              <FormControlLabel
                value={0}
                control={<Radio />}
                label="Commercial"
              />
              <FormControlLabel value={1} control={<Radio />} label="Social" />
            </RadioGroup>
          )}
        />
      </Box>
    </Paper>
  );
}
