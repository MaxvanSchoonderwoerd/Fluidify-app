/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import image1 from "../assets/druppie/Druppie1.png";
import image2 from "../assets/druppie/Druppie2.png";
import image3 from "../assets/druppie/Druppie3.png";
import image4 from "../assets/druppie/Druppie4.png";
import image5 from "../assets/druppie/Druppie5.png";
import ConfettiExplosion from "react-confetti-explosion";
import ComicTextBoxComponent from "./ComicTextBoxComponent";
import { TMessages } from "../App";

const images = [image1, image2, image3, image4, image5];

type TMascotComponentProps = {
  totalFluidBalance: number;
  fluidLimit: number;
  isConfettiActive: boolean;
  showMessages: boolean;
  messages: TMessages[];
  messageIndex: number;
};

export default function MascotComponent(props: TMascotComponentProps) {
  const [mascotImage, setMascotImage] = useState<string>();
  const [showMessageBox, setShowMessageBox] = useState<boolean>(false);

  const switchMascotImage = () => {
    const part = props.fluidLimit / (images.length - 1);
    images.forEach((image, i) => {
      if (props.totalFluidBalance >= part * i && props.totalFluidBalance < part * (i + 1)) {
        setMascotImage(image);
      }
      if (props.totalFluidBalance >= props.fluidLimit) {
        setMascotImage(images[images.length - 1]);
      }
    });
  };

  useEffect(() => {
    switchMascotImage();
  }, [props.totalFluidBalance]);

  useEffect(() => {
    if (props.showMessages) {
      setShowMessageBox(true);
    } else {
      const timeoutId = setTimeout(() => setShowMessageBox(false), 500); // Match the animation duration
      return () => clearTimeout(timeoutId);
    }
  }, [props.showMessages]);

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="font-semibold text-4xl mt-4 mb-4">
        Balans: {props.totalFluidBalance}ml / {props.fluidLimit}ml
      </h1>
      {props.isConfettiActive && <ConfettiExplosion duration={2800} />}
      <div className="flex transition-all duration-500">
        <img className="max-h-64 max-w-64" src={mascotImage} alt="mascot" />

        <div className={`transition-all duration-500 opacity-0  ${props.showMessages ? "animate-fadeInUp opacity-100" : "animate-fadeOutDown opacity-0"}`}>
          props.showMessages ? <ComicTextBoxComponent messages={props.messages} messageIndex={props.messageIndex} />
        </div>
      </div>
    </div>
  );
}
