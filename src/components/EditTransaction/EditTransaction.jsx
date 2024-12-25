import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";
import { editTransaction } from "../../controllers/transactions/transactions.controllers";

const EditTransaction = ({ open, setOpen, initialTransaction, setRefresh }) => {
  const [transaction, setTransaction] = useState(initialTransaction);


  async function handleEditTransaction(e) {
    e.preventDefault();
    await editTransaction(transaction.id, {
      ...transaction,
    
    });
    setRefresh(Math.random());
    setOpen(false);
}

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleEditTransaction}>
        <Box
          sx={{
            width: "30vw",
            height: "fit-content",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.default",
            borderRadius: "10px",
            p: 2,
          }}
        >
          <Typography>Edit Transaction</Typography>
          <Stack direction={"column"} gap={2} sx={{ mt: 2 }}>
            <TextField
              disabled
              value={transaction.id}
              label="Transaction ID"
            ></TextField>
            <TextField
              required
              id="amount"
              inputProps={{type: "number", step:"any"}}
              label="Amount"
              variant="outlined"
              defaultValue={transaction.amount}
              onChange={(e) =>
                setTransaction({ ...transaction, amount: Number(e.target.value) })
              }
            ></TextField>
            <TextField
              required
              id="description"
              label="Description"
              variant="outlined"
              defaultValue={transaction.description}
              onChange={(e) =>
                setTransaction({ ...transaction, description: e.target.value })
              }
            ></TextField>
            <TextField
              select
              id="type"
              label="Type"
              defaultValue={transaction.type}
              onChange={(e) =>
                setTransaction({ ...transaction, type: e.target.value })
              }
            >
              <MenuItem value={"credit"}>Credit</MenuItem>
              <MenuItem value={"debit"}>Debit</MenuItem>
            </TextField>
            <DateTimePicker
                onChange={(e) => {
                    
                    setTransaction({ ...transaction, date: e.toDate() })
                }}
              defaultValue={
                new dayjs(
                  new Timestamp(
                    transaction.date.seconds,
                    transaction.date.nanoseconds
                  ).toDate()
                )
              }
              label="Date"
            ></DateTimePicker>

            <Button
              type="submit"
              about="Create a transaction"
              title="Create a transaction"
              variant="outlined"
              sx={{ p: 2, fontWeight: "bold" }}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </form>
    </Modal>
  );
};

export default EditTransaction;
