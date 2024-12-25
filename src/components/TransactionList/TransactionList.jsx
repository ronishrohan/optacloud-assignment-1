import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useTransition } from "react";
import { parseDate } from "../helper/date.helper";
import {
  deleteTransaction,
  readTransactions,
} from "../../controllers/transactions/transactions.controllers";
import {
 
  Delete,
  Edit,
  HourglassBottom,
  Refresh,
} from "@mui/icons-material";
import EditTransaction from "../EditTransaction/EditTransaction";

const TransactionList = ({ refresh }) => {
  const [trigger, setTrigger] = useState(0);
  const [loading, startLoading] = useTransition();
  const [transactions, setTransactions] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  useEffect(() => {
    ``;
    startLoading(async () => {
      const data = await readTransactions();
      setTransactions(data);
    });
  }, [trigger + refresh]);

  function handleOpenModal(transaction) {
    setSelectedTransaction(transaction);
    setOpen(true);
  }

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);
  return (
    // <Stack sx={{ p: 0 }}>
    //   <Transaction></Transaction>
    // </Stack>
    <>
      {open && (
        <>
          <EditTransaction
            open={open}
            setOpen={setOpen}
            key={selectedTransaction}
            setRefresh={setTrigger}
            initialTransaction={selectedTransaction}
          ></EditTransaction>
        </>
      )}
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          gap: 2,
        }}
      >
        <div className="flex justify-between">
          <Typography>Transactions</Typography>
          <IconButton onClick={() => setTrigger(Math.random())}>
            <Refresh></Refresh>
          </IconButton>
        </div>
        <TableContainer
          component={Box}
          overflow={"auto"}
          sx={{
            width: "100%",
            height: "100%",
            maxHeight: "80vh",
            bgcolor: "background.default",
            borderRadius: "10px",
            overflowX: "hidden",
          }}
        >
          {transactions || !loading ? (
            <>
              <Table
                sx={{ overflowX: "show" }}
                stickyHeader
                key={"table" + refresh + trigger}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>DATE</TableCell>
                    <TableCell>TYPE</TableCell>
                    <TableCell>DESCRIPTION</TableCell>
                    <TableCell align="right">AMOUNT</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody sx={{ position: "relative" }}>
                  {transactions?.map((transaction) => (
                    <Transaction
                      setTrigger={setTrigger}
                      key={transaction.id}
                      transaction={transaction}
                      modalOpen={handleOpenModal}
                    ></Transaction>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <div className="flex size-full flex-col gap-2 items-center justify-center">
              <div>LOADING</div>
              <div className="animate-spin">
                <HourglassBottom></HourglassBottom>
              </div>
            </div>
          )}
        </TableContainer>
      </Box>
    </>
  );
};

const Transaction = ({ transaction, setTrigger, modalOpen }) => {
  const [hovered, setHovered] = useState(false);

  async function handleDeleteTransaction() {
    await deleteTransaction(transaction.id);
    setTrigger(Math.random());
  }

  function handleOpenModal() {
    modalOpen(transaction);
  }
  return (
    <>
      <Box
        elevation={0}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          position: "absolute",
          right: "0px",
          height: "8vh",

          opacity: hovered ? 1 : 0,
          transition: "60ms ease-out",
          display: "flex",
          overflow: "hidden",
          bgcolor: "background.default",
          zIndex: "10",
        }}
      >
        <IconButton
          onClick={handleOpenModal}
          sx={{ height: "100%", aspectRatio: "1/1", borderRadius: "0" }}
        >
          <Edit></Edit>
        </IconButton>
        <IconButton
          onClick={handleDeleteTransaction}
          sx={{
            height: "100%",
            aspectRatio: "1/1",
            borderRadius: "0",
            bgcolor: "error.dark",
            ":hover": {
              bgcolor: "error.main",
            },
          }}
        >
          <Delete></Delete>
        </IconButton>
      </Box>

      <Tooltip title={`ID: ${transaction.id}`} placement="left">
        <TableRow
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          hover
          title={`ID: ${transaction.id}`}
          sx={{
            ":hover": {
              bgcolor: "#111111",
            },
            height: "8vh",
          }}
        >
          <TableCell
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              maxWidth: "200px",
              minWidth: "0px",
            }}
          >
            {parseDate(transaction.date)}
          </TableCell>
          <TableCell>{transaction.type.toUpperCase()}</TableCell>
          <TableCell
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              maxWidth: "200px",
            }}
          >
            {transaction.description}
          </TableCell>
          <TableCell align="right">
            <div>{transaction.amount}</div>
          </TableCell>
        </TableRow>
      </Tooltip>
    </>
  );
};

export default TransactionList;
