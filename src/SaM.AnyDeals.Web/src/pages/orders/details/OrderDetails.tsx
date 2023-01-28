import "./OrderDetails.scss";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import {
  useApproveOrderMutation,
  useArchivateOrderMutation,
  useGetOrderByIdQuery,
} from "../../../features/api/extensions/ordersApiExtension";
import useQuery from "../../../features/hooks/useQuery";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/store/store";
import { Box, Stack } from "@mui/system";
import Button from "@mui/material/Button";
import ReviewDialog from "../../../components/dialogs/review/ReviewDialog";
import { Review } from "../../../models/api/review";
import { useCreateReviewMutation } from "../../../features/api/extensions/reviewsApiExtension";
import OrderChat from "../../../components/orders/chat/OrderChat";

export default function OrderDetails() {
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const query = useQuery() as any;
  const orderId: number = +query.get("id");
  const { data: order } = useGetOrderByIdQuery(orderId);

  const [approveOrderCompletion] = useApproveOrderMutation();
  const [createReview] = useCreateReviewMutation();
  const [archivateOrder] = useArchivateOrderMutation();

  const [isUserCustomer, setIsUserCustomer] = useState<boolean>();
  const [hasCustomerApproval, setHasCustomerApproval] = useState<boolean>();
  const [isUserExecutor, setIsUserExecutor] = useState<boolean>();
  const [hasExecutorApproval, setHasExecutorApproval] = useState<boolean>();

  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const onApproveClick = () => {
    const approveAction = approveOrderCompletion({ id: orderId });
    approveAction.then((response: any) => {
      if (response.data.succeeded) {
        setHasCustomerApproval((curr) => (isUserCustomer ? true : curr));
        setHasExecutorApproval((curr) => (isUserExecutor ? true : curr));
      }
    });
  };

  const handleArchiveClick = () => {
    if (isUserCustomer) {
      setIsReviewDialogOpen(true);
    } else if (isUserExecutor) {
      const archivateOrderAction = archivateOrder({ id: orderId });
      archivateOrderAction.then((response: any) => {
        if (response.data.succeeded) {
          navigate("/adverts/my");
        }
      });
    }
  };

  const handleReviewCancelClick = () => {
    setIsReviewDialogOpen(false);
  };

  const handleReviewSubmitClick = (review: Review) => {
    setIsReviewDialogOpen(false);

    review.advertId = order?.advert.id;

    const createReviewAction = createReview(review);
    createReviewAction.then((response: any) => {
      if (response.data.succeeded) {
        const archivateOrderAction = archivateOrder({ id: orderId });
        archivateOrderAction.then((response: any) => {
          if (response.data.succeeded) {
            navigate("/adverts/my");
          }
        });
      }
    });
  };

  useEffect(() => {
    setHasExecutorApproval(!!order?.hasExecutorApproval);
    setHasCustomerApproval(!!order?.hasCustomerApproval);

    setIsUserCustomer(order?.customer.id === userInfo.id);
    setIsUserExecutor(order?.executor.id === userInfo.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  return (
    <>
      <ReviewDialog
        open={isReviewDialogOpen}
        handleCancel={handleReviewCancelClick}
        handleSubmit={handleReviewSubmitClick}
      />

      {!!order ? (
        <div className="order-details">
          <Paper className="order-details__body">
            <Typography
              className="order-details__body__title"
              variant="h5"
              textAlign="center"
              fontWeight="bold"
            >
              {order.advert.title}
            </Typography>
            <div className="order-details__body__content">
              <Stack spacing={3}>
                <Box className="order-details__body__person">
                  <PersonIcon />
                  <Typography fontWeight={isUserCustomer ? "bold" : ""}>
                    {`Customer: ${order.customer.userName}`}
                  </Typography>
                  {hasCustomerApproval ? (
                    <DoneIcon color="success" />
                  ) : (
                    <CloseIcon color="error" />
                  )}
                </Box>
                <Box className="order-details__body__person">
                  <PersonIcon />
                  <Typography fontWeight={isUserExecutor ? "bold" : ""}>
                    {`Executor: ${order.executor.userName}`}
                  </Typography>
                  {hasExecutorApproval ? (
                    <DoneIcon color="success" />
                  ) : (
                    <CloseIcon color="error" />
                  )}
                </Box>
              </Stack>
            </div>
            {(isUserCustomer && order.archivatedByCustomer) ||
            (isUserExecutor && order.archivatedByExecutor) ? (
              <></>
            ) : (
              <div className="order-details__body__footer">
                <Button
                  variant="contained"
                  disabled={!(hasCustomerApproval && hasExecutorApproval)}
                  onClick={handleArchiveClick}
                >
                  {isUserCustomer ? " Leave review and archivate" : "Archivate"}
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  onClick={onApproveClick}
                  disabled={
                    (isUserCustomer && hasCustomerApproval) ||
                    (isUserExecutor && hasExecutorApproval)
                  }
                >
                  Approve completion
                </Button>
              </div>
            )}
          </Paper>
          <Paper className="order-chat">
            <OrderChat
              orderId={orderId}
              customerId={order.customer.id}
              executorId={order.executor.id}
            />
          </Paper>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
