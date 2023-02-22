import React, { useEffect, useState } from "react";
import "./OrderConfirmationDialog.scss";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,
  Dialog,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { OrderConfirmationDialogProps } from "./OrderConfirmationDialogProps";
import { useForm } from "react-hook-form";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentIcon from "@mui/icons-material/Payment";
import { Interest } from "../../../models/enums/interest";
import { useCreateIntentMutation } from "../../../features/api/extensions/paymentApiExtension";
import { CommonResponse } from "../../../models/api/responses/commonResponse";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../features/services/stripeService";
import CheckoutForm from "./checkoutForm/CheckoutForm";

const schema = yup.object().shape({
  paymentMethod: yup.number().label("Payment Method").default(0),
});

export default function OrderConfirmationDialog({
  open,
  handleCancel,
  advert,
}: OrderConfirmationDialogProps) {
  const [clientSecret, setClientSecret] = useState("");
  const [createIntent] = useCreateIntentMutation();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { isDirty, isValid, errors },
  } = useForm({
    defaultValues: schema.getDefault() as any,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (advert) {
      console.log(advert);
      createIntent({ advertId: advert.id }).then((res: any) => {
        console.log(res);
        const { data }: { data: CommonResponse } = res;
        console.log(data);

        if (data.succeeded) {
          setClientSecret(data.body.clientSecret);
        }
      });
    }
  }, [advert]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return advert ? (
    <Dialog open={open}>
      <form
        className="order-confirmation__container"
        onSubmit={handleSubmit(onSubmit, onSubmit)}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Order Confirmation
        </Typography>

        {advert?.interest === Interest.Commercial ? (
          <>
            <FormControl>
              <Typography variant="h6">Payment method</Typography>

              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <RadioGroup defaultValue={0} {...field}>
                    <FormControlLabel
                      value={0}
                      control={
                        <Radio
                          icon={<AccountBalanceWalletIcon />}
                          checkedIcon={<AccountBalanceWalletIcon />}
                        />
                      }
                      label="Cash"
                    />
                    <FormControlLabel
                      value={1}
                      control={
                        <Radio
                          icon={<PaymentIcon />}
                          checkedIcon={<PaymentIcon />}
                        />
                      }
                      label="Card"
                    />
                  </RadioGroup>
                )}
              />
            </FormControl>
          </>
        ) : (
          <></>
        )}

        <Box className="order-confirmation__actions">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button variant="contained" color="success" type="submit">
            Confirm
          </Button>
        </Box>
      </form>
      <Elements options={options as any} stripe={stripePromise}>
        <CheckoutForm id={advert!.id} />
      </Elements>
    </Dialog>
  ) : (
    <></>
  );
}
