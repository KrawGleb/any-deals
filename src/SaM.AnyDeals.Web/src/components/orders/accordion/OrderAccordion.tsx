import React from "react";
import "./OrderAccordion.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import { Order } from "../../../models/api/order";
import GoalTag from "../../adverts/fields/goalTag/GoalTag";
import InterestTag from "../../adverts/fields/interestTag/InterestTag";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function OrderAccordion({
  key,
  orders,
  onCardClick,
}: {
  key: number;
  orders: Order[];
  onCardClick: (order: Order) => void;
}) {
  if (!orders || orders.length === 0) return null;

  const advert = orders[0].advert;

  return (
    <Accordion className="order-accordion" key={key}>
      <AccordionSummary>
        <Box className="order-accordion__summary">
          <Box className="order-accordion__summary__header">
            <GoalTag goal={advert.goal} />
            <InterestTag interest={advert.interest} />
          </Box>
          <Box className="order-accordion__summary__content">
            <Typography className="order-accordion__summary__title">
              {advert.title}
              <ExpandMoreIcon fontSize="large" />
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {orders.map((order, index) => (
          <Box
            className="order-accordion__details"
            key={index}
            onClick={() => onCardClick(order)}
          >
            <Box className="order-accordion__details__header">
              <Typography
                className="order-accordion__details__header__id"
                variant="h6"
              >
                №{order.id}
              </Typography>
              <Typography color="gray">
                {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </Box>
            <Box className="order-accordion__details__person">
              <Typography variant="subtitle1">
                For: {order.customer.userName}
              </Typography>
            </Box>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
