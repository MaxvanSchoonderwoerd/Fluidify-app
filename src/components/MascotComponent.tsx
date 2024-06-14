import { useEffect, useState } from "react";
import image1 from "../assets/druppie/Druppie1.png";
import image2 from "../assets/druppie/Druppie2.png";
import image3 from "../assets/druppie/Druppie3.png";
import image4 from "../assets/druppie/Druppie4.png";
import image5 from "../assets/druppie/Druppie5.png";
import ConfettiExplosion from "react-confetti-explosion";

const images = [image1, image2, image3, image4, image5];

type TMascotComponentProps = {
  totalFluidBalance: number;
  fluidLimit: number;
  isConfettiActive: boolean;
};

export default function MascotComponent(props: TMascotComponentProps) {
  const [mascotImage, setMascotImage] = useState<string>();
  const switchMascotImage = () => {
    const part = props.fluidLimit / (images.length - 1);
    console.log(part);
    images.forEach((image, i) => {
      if (props.totalFluidBalance >= part * i && props.totalFluidBalance < part * (i + 1)) {
        setMascotImage(image);
      }
      //shitty fix, please change this
      if (props.totalFluidBalance >= props.fluidLimit) {
        setMascotImage(images[images.length - 1]);
      }
    });
  };

  useEffect(() => {
    switchMascotImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.totalFluidBalance]);

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="font-semibold text-4xl mt-4 mb-4">
        Balans: {props.totalFluidBalance}ml / {props.fluidLimit}ml
      </h1>
      {props.isConfettiActive && <ConfettiExplosion duration={2800} />}
      <img className="max-h-64 max-w-64" src={mascotImage} alt="mascot" />
    </div>
  );
}
