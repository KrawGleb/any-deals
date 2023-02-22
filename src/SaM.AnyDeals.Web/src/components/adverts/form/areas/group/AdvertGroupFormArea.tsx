import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import ControlledInput from "../../../../common/controlledInput/ControlledInput";
import { AreaProps } from "../AreaProps";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentIcon from "@mui/icons-material/Payment";
import FormHelperText from "@mui/material/FormHelperText";

export default function AdvertGroupFormArea({
  control,
  errors,
  watch,
}: AreaProps) {
  const watchInterest = watch!("interest", 0);

  const watchAllowedCashPayment = watch!("allowedCashPayment", true);
  const watchAllowedCardPayment = watch!("allowedCardPayment", true);

  const error =
    [watchAllowedCardPayment, watchAllowedCashPayment].filter((v) => v).length <
    1;

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
        <Box className="mb-2">
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
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="Social"
                />
              </RadioGroup>
            )}
          />
        </Box>
        {+watchInterest === 0 ? (
          <>
            <Typography variant="subtitle2">Allowed payment methods</Typography>
            <Stack direction="row" gap="20px">
              <FormControl required error={error}>
                <Stack direction="row" gap="20px">
                  <Stack direction="column">
                    <FormControlLabel
                      control={
                        <Controller
                          name="allowedCashPayment"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              {...field}
                              checked={!!field.value}
                              icon={<AccountBalanceWalletIcon />}
                              checkedIcon={<AccountBalanceWalletIcon />}
                            />
                          )}
                        />
                      }
                      label="Cash"
                    />
                    <FormControlLabel
                      control={
                        <Controller
                          name="allowedCardPayment"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              {...field}
                              checked={!!field.value}
                              icon={<PaymentIcon />}
                              checkedIcon={<PaymentIcon />}
                            />
                          )}
                        />
                      }
                      label="Card"
                    />
                  </Stack>

                  <Stack
                    direction="row"
                    alignItems="center"
                    gap="4px"
                    width="6.5rem"
                  >
                    <ControlledInput
                      control={control}
                      name="price"
                      label="Price"
                      error={!!errors.price}
                    />
                    <Typography>$</Typography>
                  </Stack>
                </Stack>

                <FormHelperText>
                  Select at least one payment method
                </FormHelperText>
              </FormControl>
            </Stack>
          </>
        ) : (
          <></>
        )}
      </Box>
    </Paper>
  );
}
