/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import "./index.css";
import FluidContainerComponent from "./components/FluidContainerComponent";
import Containers from "./assets/data/containers.json";
import Messages from "./assets/data/messages.json";
import HeaderComponent from "./components/HeaderComponent";
import MascotComponent from "./components/MascotComponent";

type TContainer = {
  id: number;
  name: string;
  volume: number;
};

export type TMessages = {
  id: number;
  title: string;
  body: string;
};

function App() {
  const [containers, setContainers] = useState<TContainer[]>(Containers);
  const [messages, setMessages] = useState<TMessages[]>(Messages);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showMessages, setShowMessages] = useState(false);

  const [totalFluidBalance, setTotalFluidBalance] = useState<number>(0);
  const [fluidLimit, setFluidLimit] = useState<number>(2000);

  const [isConfettiActive, setIsConfettiActive] = useState(false);

  useEffect(() => {
    askNotificationPermission();
  }, []);

  useEffect(() => {
    if (totalFluidBalance >= fluidLimit) {
      setIsConfettiActive(true);
      showMessage(0);
      showLocalNotification(messages[0]);
    }
  }, [totalFluidBalance, fluidLimit, messages]);

  const showMessage = (index: number) => {
    setMessageIndex(index);
    setShowMessages(true);

    setTimeout(() => {
      setShowMessages(false);
    }, 4000); // 4000 milliseconds = 4 seconds
  };

  // Function to handle keypress events
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;

      switch (key) {
        case "1":
          showLocalNotification(messages[0]);
          break;
        case "2":
          showLocalNotification(messages[1]);
          break;
        case "3":
          showLocalNotification(messages[2]);
          break;
        case "4":
          showLocalNotification(messages[3]);
          break;
        case "5":
          showLocalNotification(messages[4]);
          break;
        case "6":
          showMessage(0);
          break;
        case "7":
          showMessage(1);
          break;
        case "8":
          showMessage(2);
          break;
        case "9":
          showMessage(3);
          break;
        case "0":
          showMessage(4);
          break;
        default:
          // Handle other keys if necessary
          break;
      }
    },
    [messages]
  );

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleKeyPress]);

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

  const showLocalNotification = (notification: TMessages) => {
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
      <div className="w-full grid place-items-center">
        <div className="w-full">
          <div className="w-full relative">
            <MascotComponent totalFluidBalance={totalFluidBalance} fluidLimit={fluidLimit} isConfettiActive={isConfettiActive} showMessages={showMessages} messages={messages} messageIndex={messageIndex} />
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-4 place-items-center mt-32">
            {containers.map((container: TContainer) => (
              <FluidContainerComponent key={container.id} id={container.id} name={container.name} volume={container.volume} addFluid={addFluid} removeFluid={removeFluid} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
