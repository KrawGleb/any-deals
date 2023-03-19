import "./AdvertDetails.scss";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useGetAdvertByIdQuery } from "../../../features/api/extensions/advertsApiExtension";
import useQuery from "../../../features/hooks/useQuery";
import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
} from "@mui/material";
import AdvertDetailsArea from "./areas/details/AdvertDetailsArea";
import AdvertReviewsArea from "./areas/reviews/AdvertReviewsArea";
import AdvertPaymentArea from "./areas/payment/AdvertPaymentArea";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentIcon from "@mui/icons-material/Payment";
import { Interest } from "../../../models/enums/interest";
import { useCreateOrderMutation } from "../../../features/api/extensions/ordersApiExtension";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/store/store";

export default function AdvertsDetails() {
  const [hasClientSecret, setHasClientSecret] = useState(false);
  const query = useQuery() as any;
  const scrollRef = useRef(null);

  const navigate = useNavigate();
  const advertId: number = +query.get("id");
  const { data: advert } = useGetAdvertByIdQuery(advertId);
  const [paymentMethod, setPaymentMethod] = useState<number | undefined>(0);
  const [createOrder] = useCreateOrderMutation();

  const authState = useSelector((state: RootState) => state.auth);
  const isAuthorize = !!authState.user;
  const isOwner =
    isAuthorize && advert?.creator.id === authState.user?.profile.sub;

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (clientSecret) {
      setHasClientSecret(true);
      setPaymentMethod(1);
    }
  }, []);

  useEffect(() => {
    if (advert?.interest === Interest.Social) {
      setPaymentMethod(undefined);
      return;
    }

    if (hasClientSecret) {
      (scrollRef?.current! as Element)?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      return;
    }

    if (advert?.allowedCashPayment) setPaymentMethod(0);
    else if (advert?.allowedCardPayment) setPaymentMethod(1);
  }, [advert, hasClientSecret]);

  const handleOrderClick = async () => {
    if (paymentMethod === 1) {
      scrollToPayment();
      return;
    }

    await createOrder({ advertId, paymentMethod: 0 });
    navigate("/adverts/my/orders");
  };

  const handlePaymentMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
    const method = +e.target.value;
    setPaymentMethod(method);
  };

  const scrollToPayment = () => {
    (scrollRef?.current! as Element).scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  return (
    <>
      {!!advert ? (
        <div className="advert-details">
          <div className="advert-details__container">
            <div className="advert-details__slide advert-details__slide__details">
              <div className="advert-details__slide__container">
                <AdvertDetailsArea advert={advert} />
              </div>
            </div>
            <div className="advert-details__slide advert-details__slide__reviews">
              <div className="advert-details__slide__container">
                <AdvertReviewsArea id={advert.id} />
              </div>
            </div>
            {paymentMethod === 1 ? (
              <div className="advert-details__slide advert-details__slide__payment">
                <div
                  className="advert-details__slide__container"
                  ref={scrollRef}
                >
                  <AdvertPaymentArea advert={advert} />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          {isAuthorize ? (
            <Paper className="advert-details__footer">
              <Box className="advert-details__footer__container">
                <Box className="advert-details__footer__price">
                  {advert?.price ? <p>{advert?.price} $</p> : <></>}

                  <Box className="advert-details__footer__method">
                    {advert?.interest === Interest.Commercial &&
                    advert.allowedCardPayment &&
                    advert.allowedCashPayment &&
                    !isOwner ? (
                      <RadioGroup
                        row
                        defaultValue={0}
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                      >
                        <FormControlLabel
                          value={0}
                          control={
                            <Radio
                              icon={<AccountBalanceWalletIcon />}
                              checkedIcon={<AccountBalanceWalletIcon />}
                            />
                          }
                          label=""
                        />

                        <FormControlLabel
                          value={1}
                          control={
                            <Radio
                              icon={<PaymentIcon />}
                              checkedIcon={<PaymentIcon />}
                            />
                          }
                          label=""
                        />
                      </RadioGroup>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Box>
                <Box className="advert-details__footer__order">
                  <Button
                    style={{ textTransform: "none" }}
                    variant="contained"
                    color="success"
                    onClick={handleOrderClick}
                    disabled={isOwner}
                  >
                    Order
                  </Button>
                </Box>
              </Box>
            </Paper>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
