import React, { useState } from "react";
import AddTransactionForm from "./components/AddTransactionForm/AddTransactionForm";
import TransactionList from "./components/TransactionList/TransactionList";

const App = () => {
  const [refresh, setRefresh]  = useState(Math.random());
  return (
    <section className=" h-screen">
      <div className="flex size-full  relative overflow-hidden flex-col">
        <div className="h-fit w-full p-4 border-b flex justify-between border-white/20">
          <div>ASSIGNMENT: 1</div>
          <div>25/12/2024</div>
        </div>
        <div className="size-full flex ">
          <div className="w-1/2 flex h-full shrink-0 items-center justify-center">
            <AddTransactionForm setRefresh={setRefresh} ></AddTransactionForm>
          </div>
          <div className="w-[1px] shrink-0 h-full bg-white/20" ></div>
          <div className="w-full h-full" >
            <TransactionList refresh={refresh} ></TransactionList>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
