import React, { useEffect, useRef, useState } from "react";
import "./AdvertPaymentArea.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Typography, Paper } from "@mui/material";

import { Advert } from "../../../../../models/api/advert";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { stripePromise } from "../../../../../features/services/stripeService";
import { CommonResponse } from "../../../../../models/api/responses/commonResponse";
import { useCreateIntentMutation } from "../../../../../features/api/extensions/paymentApiExtension";

export default function AdvertPaymentArea({ advert }: { advert: Advert }) {
  const [clientSecret, setClientSecret] = useState("");
  const [createIntent] = useCreateIntentMutation();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (advert) {
      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );

      if (clientSecret) {
        (scrollRef?.current! as Element).scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }

      createIntent({ advertId: advert.id }).then((res: any) => {
        const { data }: { data: CommonResponse } = res;

        if (data.succeeded) {
          console.log(data.body.clientSecret);
          setClientSecret(data.body.clientSecret);
        }
      });
    }
  }, [advert]);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <Paper className="advert-details__payment__area">
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        className="mb-2"
      >
        Order now!
      </Typography>

      <div className="advert-details__payment__container" ref={scrollRef}>
        {clientSecret ? (
          <Elements options={options as any} stripe={stripePromise}>
            <CheckoutForm id={advert.id} />
          </Elements>
        ) : (
          <></>
        )}
      </div>
    </Paper>
  );
}
