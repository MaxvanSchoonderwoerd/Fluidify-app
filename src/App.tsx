import React, { useEffect, useState } from "react";
import "./App.css";
import FluidContainerComponent from "./components/FluidContainerComponent";
import "./index.css"; // Import your Tailwind CSS here
import Containers from "./assets/containers.json";
import HeaderComponent from "./components/HeaderComponent";
import MascotComponent from "./components/MascotComponent";

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
      <div className="w-full grid grid-rows-1 place-items-center sm:grid-cols-1 lg:grid-cols-2">
        <div className="w-full">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 place-items-center">
            {containers.map((container: TContainer) => (
              <FluidContainerComponent key={container.id} id={container.id} name={container.name} volume={container.volume} addFluid={addFluid} removeFluid={removeFluid} />
            ))}
          </div>
        </div>
        <div className="w-full">
          <MascotComponent totalFluidBalance={totalFluidBalance} />
          <p>druppie de druiper hier</p>
        </div>
      </div>
    </div>
  );
}

export default App;
