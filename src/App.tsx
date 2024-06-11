/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import "./index.css";
import { useEffect, useState } from "react";
import FluidContainerComponent from "./components/FluidContainerComponent";
import Containers from "./assets/data/containers.json";
import Notifications from "./assets/data/notifications.json";
import HeaderComponent from "./components/HeaderComponent";
import MascotComponent from "./components/MascotComponent";

type TContainer = {
  id: number;
  name: string;
  volume: number;
};

type TNotification = {
  id: number;
  title: string;
  body: string;
  icon: string;
  badge: string;
};

function App() {
  const [containers, setContainers] = useState<TContainer[]>(Containers);
  const [notifications, setNotifications] = useState<TNotification[]>(Notifications);

  const [totalFluidBalance, setTotalFluidBalance] = useState<number>(0);
  const [fluidLimit, setFluidLimit] = useState<number>(2000);

  const [isConfettiActive, setIsConfettiActive] = useState(false);

  useEffect(() => {
    askNotificationPermission();
    document.addEventListener("keypress", (e) => handleKeyPress(e));
  }, []);

  useEffect(() => {
    if (totalFluidBalance >= fluidLimit) {
      setIsConfettiActive(true);
      showLocalNotification(notifications[0]);
    }
  }, [totalFluidBalance, fluidLimit]);

  // Function to handle keypress events
  const handleKeyPress = (event: any) => {
    const key = event.key;

    switch (key) {
      case "1":
        showLocalNotification(notifications[0]);
        break;
      case "2":
        showLocalNotification(notifications[1]);
        break;
      case "3":
        showLocalNotification(notifications[2]);
        break;
      case "4":
        showLocalNotification(notifications[3]);
        break;
      case "5":
        showLocalNotification(notifications[4]);
        break;
      default:
        // Handle other keys if necessary
        break;
    }
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

  const showLocalNotification = (notification: TNotification) => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          registration.showNotification(notification.title, notification);
        }
      });
    } else {
      new Notification(notification.title, notification);
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
