import { Box } from "@mui/material";
import Modal from "../components/BasicSpeedDial";
import CustomizedTables from "../components/CustomizedTables";
import { useAppSelector } from "../store/hooks";

export default function Home() {
  const transactionsRedux = useAppSelector((state) => state.transactions);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100vw", height: "100vh" }}>
        <h1>Transações</h1>

        <h2>
          Total em caixa:{" "}
          {transactionsRedux.reduce((acc, val) => {
            if (val.type === "Entrada") {
              return acc + val.value;
            } else {
              return acc - val.value;
            }
          }, 0)}
        </h2>
       
        <div style={{ width: "80vw", height: "80vh" }}>
          <CustomizedTables />
        </div>
      </Box>
      <Modal />
    </>
  );
}
