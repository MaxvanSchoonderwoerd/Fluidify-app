import React, { useState } from "react";
import "./App.css";

function App() {
  const [fluidBalance, setFluidBalance] = useState<number>(0);

  const addFluid = (ammount: number) => {
    setFluidBalance(fluidBalance + ammount);
  };

  const removeFluid = (ammount: number) => {
    if (fluidBalance >= ammount) {
      setFluidBalance(fluidBalance - ammount);
    } else {
      setFluidBalance(0);
    }
  };

  return (
    <div className="App">
      <p>Balance: {fluidBalance}ml</p>
      <p>Blikje (330ml)</p>
      <button onClick={() => removeFluid(330)}>-</button>
      <button onClick={() => addFluid(330)}>+</button>
    </div>
  );
}

export default App;
