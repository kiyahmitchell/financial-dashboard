import React from "react";
import Income from "../widgets/Income";
import Expenses from "../widgets/Expenses";
import Debt from "../widgets/Debt";

function Dashboard({ transactions }) {
  return (
    <div>
      <Income transactions={transactions} />
      <Expenses transactions={transactions} />
      <Debt transactions={transactions} />
    </div>
  );
}

export default Dashboard;
