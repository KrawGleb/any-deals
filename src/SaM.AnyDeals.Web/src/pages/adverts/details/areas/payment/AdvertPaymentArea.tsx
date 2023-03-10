import React, { useEffect, useRef, useState } from "react";
import "./AdvertPaymentArea.scss";

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
    const init = async () => {
      if (!advert) return;

      const response = await createIntent({ advertId: advert.id });
      const { data }: { data: CommonResponse } = response as any;

      if (data.succeeded) {
        setClientSecret(data.body.clientSecret);
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
