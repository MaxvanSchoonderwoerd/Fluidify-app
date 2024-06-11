import { useEffect, useState } from "react";
import image1 from "../assets/druppie webp/druppie1.webp";
import image2 from "../assets/druppie webp/druppie2.webp";
import image3 from "../assets/druppie webp/druppie3.webp";
import image4 from "../assets/druppie webp/druppie4.webp";
import image5 from "../assets/druppie webp/druppie5.webp";
import ConfettiExplosion from "react-confetti-explosion";

const images = [image4, image3, image2, image1, image5];

type TMascotComponentProps = {
  totalFluidBalance: number;
  fluidLimit: number;
  isConfettiActive: boolean;
};

export default function MascotComponent(props: TMascotComponentProps) {
  const [mascotImage, setMascotImage] = useState<string>();
  const switchMascotImage = () => {
    const part = props.fluidLimit / images.length;
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
