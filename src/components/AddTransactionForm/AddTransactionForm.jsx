import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { addTransaction } from "../../controllers/transactions/transactions.controllers";
import { Timestamp } from "firebase/firestore";

const AddTransactionForm = ({setRefresh}) => {
  const [transaction, setTransaction] = React.useState({
    amount: 0,
    description: "",
    type: "credit",
  });

  async function handleAddTransaction(e) {
    e.preventDefault();
    console.log(transaction);
    await addTransaction({
        ...transaction,
        date: Timestamp.fromDate(new Date())
    });
    setRefresh(Math.random());
  }
  return (
    <>
      <form onSubmit={handleAddTransaction}>
        <Box
          sx={{
            p: 2,
            width: "30vw",
            height: "fit-content",
            bgcolor: "background.default",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography>Create Transaction</Typography>
          <Stack direction={"column"} gap={2} sx={{ mt: 2 }}>
            <TextField
              required
              id="amount"
              type="number"
              slotProps={{ input: { min: 0 } }}
              label="Amount"
              variant="outlined"
              onChange={(e) =>
                setTransaction({ ...transaction, amount: e.target.value })
              }
            ></TextField>
            <TextField
              required
              id="description"
              label="Description"
              variant="outlined"
              onChange={(e) =>
                setTransaction({ ...transaction, description: e.target.value })
              }
            ></TextField>
            <TextField
              select
              id="type"
              defaultValue={"credit"}
              label="Type"
              onChange={(e) =>
                setTransaction({ ...transaction, type: e.target.value })
              }
            >
              <MenuItem value={"credit"}>Credit</MenuItem>
              <MenuItem value={"debit"}>Debit</MenuItem>
            </TextField>

            <Button
                type="submit"
              about="Create a transaction"
              title="Create a transaction"
              variant="outlined"
              sx={{ p: 2, fontWeight: "bold" }}
            >
              Create
            </Button>
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default AddTransactionForm;
