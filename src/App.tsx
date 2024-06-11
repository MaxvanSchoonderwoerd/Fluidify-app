import { useEffect, useState } from "react";
import "./App.css";
import FluidContainerComponent from "./components/FluidContainerComponent";
import "./index.css";
import Containers from "./assets/data/containers.json";
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
  const [fluidLimit, setFluidLimit] = useState<number>(2000);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  // Example usage
  const options = {
    body: "Je hebt je drink-doel bereikt! Let op: je kunt vandaag niet meer drinken",
    icon: "./icons/icon-192x192.png",
    badge: "./icons/icon-192x192.png",
    data: {
      url: "https://your-url.com",
    },
  };

  const showLocalNotification = (title: string, options: object) => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          registration.showNotification(title, options);
        }
      });
    } else {
      new Notification(title, options);
    }
  };

  useEffect(() => {
    loadContainersJson();
    askNotificationPermission();
  }, []);

  useEffect(() => {
    if (totalFluidBalance >= fluidLimit) {
      setIsConfettiActive(true);
      showLocalNotification("Goed bezig!", options);
    }
  }, [totalFluidBalance, fluidLimit]);

  const loadContainersJson = () => {
    setContainers(Containers);
  };
  const askNotificationPermission = () => {
    if ("Notification" in window && navigator.serviceWorker) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      });
    }
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
      <HeaderComponent />
      <div className="w-full grid grid-rows-1 place-items-center sm:grid-cols-1 lg:grid-cols-2">
        <div className="w-full">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 place-items-center">
            {containers.map((container: TContainer) => (
              <FluidContainerComponent key={container.id} id={container.id} name={container.name} volume={container.volume} addFluid={addFluid} removeFluid={removeFluid} />
            ))}
          </div>
        </div>
        <div className="w-full">
          <MascotComponent totalFluidBalance={totalFluidBalance} fluidLimit={fluidLimit} isConfettiActive={isConfettiActive} />
        </div>
      </div>
    </div>
  );
}

export default App;
