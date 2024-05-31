import React, { useEffect, useState } from "react";
import "./App.css";
import FluidContainerComponent from "./components/FluidContainerComponent";
import "./index.css"; // Import your Tailwind CSS here
import Containers from "./assets/containers.json";
import HeaderComponent from "./components/HeaderComponent";

type TContainer = {
  id: number;
  name: string;
  volume: number;
};

function App() {
  const [containers, setContainers] = useState<TContainer[]>([]);
  const [totalFluidBalance, setTotalFluidBalance] = useState<number>(0);

  useEffect(() => {
    loadContainersJson();
  }, []);

  const loadContainersJson = () => {
    setContainers(Containers);
  };

  const addFluid = (volume: number) => {
    setTotalFluidBalance(totalFluidBalance + volume);
  };

  const removeFluid = (volume: number) => {
    if (totalFluidBalance >= volume) {
      setTotalFluidBalance(totalFluidBalance - volume);
    } else {
      setTotalFluidBalance(0);
    }
  };

  return (
    <div className="App grid place-items-center">
      <HeaderComponent page="Registratie" />
      <div className="w-full grid grid-cols-2 grid-rows-1 place-items-center">
        <div className="w-full">
          <h1 className="font-semibold text-4xl mt-4 mb-4">Balans: {totalFluidBalance}ml</h1>
          <div className="grid grid-cols-2 place-items-center">
            {containers.map((container: TContainer) => (
              <FluidContainerComponent key={container.id} id={container.id} name={container.name} volume={container.volume} addFluid={addFluid} removeFluid={removeFluid} />
            ))}
          </div>
        </div>
        <div className="w-full bg-red-400">druppie de druiper hier</div>
      </div>
    </div>
  );
}

export default App;
