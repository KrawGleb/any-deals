import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useCreateOrderMutation } from "../../../../../features/api/extensions/ordersApiExtension";
import { Response } from "../../../../../models/api/responses/response";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function CheckoutForm({ id }: { id: number }) {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [_email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    const init = async () => {
      if (!stripe) return;

      const clientSecret = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );

      if (!clientSecret) {
        return;
      }

      const { paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      switch (paymentIntent?.status) {
        case "succeeded":
          navigate("/adverts/my/orders");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        case "requires_capture":
          const response = await createOrder({
            advertId: id,
            paymentMethod: 1,
            paymentIntent: paymentIntent.id,
          });
          const info = (response as any).data;
          if ((info as Response).succeeded) {
            navigate("/adverts/my/orders");
          }
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    };

    init();
  }, [stripe]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/adverts/details?id=${id}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.value.email)}
      />
      <PaymentElement
        id="payment-element"
        options={paymentElementOptions}
        className="mb-2"
      />
      <Button
        disabled={isLoading || !stripe || !elements}
        type="submit"
        variant="contained"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
