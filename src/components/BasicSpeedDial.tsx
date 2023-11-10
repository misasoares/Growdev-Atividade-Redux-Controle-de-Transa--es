import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import WalletIcon from "@mui/icons-material/Wallet";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { addTransaction, transactionsType } from "../store/modules/transactions/transactionsSlice";
import {v4 as uuid} from 'uuid'
import { useAppDispatch } from "../store/hooks";

const actions = [
  { icon: <AddCircleIcon />, name: "Entrada" },
  { icon: <RemoveCircleIcon />, name: "Saída" },
];

export default function BasicSpeedDial() {
  const [open, setOpen] = useState(false);
  const [typeTransaction, setTypeTransaction] = useState("");
  const dispatch = useAppDispatch()

  const handleClickOpen = (action: string) => {
    if (action === "Entrada") {
      setTypeTransaction("Entrada");
    }
    if (action === "Saída") {
      setTypeTransaction("Saída");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTypeTransaction("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = parseFloat(e.currentTarget.transaction.value);
    const description = e.currentTarget.description.value
      
    if(typeTransaction === "Entrada"){
      const transaction:transactionsType = {id:uuid(), description, value, type:"Entrada"}
      dispatch(addTransaction(transaction))
    }
    if(typeTransaction === "Saída" ){
      const transaction:transactionsType = {id:uuid(), description, value, type:"Saída"}
      dispatch(addTransaction(transaction))
    }

    setOpen(false);
  };

  return (
    <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial ariaLabel="SpeedDial basic example" sx={{ position: "absolute", bottom: 30, right: 30 }} icon={<WalletIcon />}>
        {actions.map((action) => (
          <SpeedDialAction onClick={() => handleClickOpen(action.name)} key={action.name} icon={action.icon} tooltipTitle={action.name} />
        ))}
      </SpeedDial>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Transação</DialogTitle>
          <DialogContent>
            <DialogContentText>Faça uma transação.</DialogContentText>

            <TextField
              style={{ minWidth: "400px" }}
              autoFocus
              margin="dense"
              id="name"
              label={typeTransaction === "Entrada" ? "Digite o valor da entrada." : "Digite o valor da saída."}
              type="number"
              fullWidth
              variant="standard"
              name="transaction"
            />
            <TextField
              style={{ minWidth: "400px" }}
              autoFocus
              margin="dense"
              id="name"
              label="Descrição"
              type="text"
              fullWidth
              variant="standard"
              name="description"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit">{typeTransaction === "Entrada" ? "Entrada" : "Saída"}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
