import { Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPayment } from '../State/Payment/Action';

export const PaymentTable = () => {

  const {payment} = useSelector(store => store)
  const jwt= localStorage.getItem("jwt")
  const dispatch=useDispatch()
      console.log("payment", payment)
  useEffect(()=>{
    dispatch(getUserPayment(jwt))
  }, [])
  // console.log("----", payment.payment)

  // const paymentData = Array(4).fill({ id: 1, orderId: 1, date: "25-12-25", amount: "₹ 255", status: "Pending" });

  return (
    <Box width={"100%"}>
      <Card className="mt-1">
        <CardHeader
          title={"Payment Details"}
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table aria-label="payment table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ textAlign: "center" }}>Order Id</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Date</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Amount</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Payment Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payment.payment.map((item, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                >
                  
                  <TableCell sx={{ textAlign: "center" }}>{item.orderId}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                  {new Date(item.createdAt).toLocaleString('en-GB', {
                              dateStyle: 'medium',
                              timeStyle: 'short',
                            })}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>₹ {item.amount/100}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.paymentStatus}</TableCell>
                </TableRow>
              ))} 
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};
