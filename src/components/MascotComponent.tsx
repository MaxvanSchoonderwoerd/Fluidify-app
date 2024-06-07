import { useEffect, useState } from "react";
import image1 from "../assets/druppie-04.svg";
import image2 from "../assets/druppie-03.svg";
import image3 from "../assets/druppie-02.svg";
import image4 from "../assets/druppie-01.svg";

const images = [image1, image2, image3, image4];

type TMascotComponentProps = {
  totalFluidBalance: number;
};

export default function MascotComponent(props: TMascotComponentProps) {
  const [mascotImage, setMascotImage] = useState<string>();
  const size: number = 200;
  const fluidLimit: number = 2000;
  const switchMascotImage = () => {
    const part = fluidLimit / images.length;
    images.forEach((image, i) => {
      if (props.totalFluidBalance >= part * i && props.totalFluidBalance < part * (i + 1)) {
        setMascotImage(image);
      }
      //shitty fix, please change this
      if (props.totalFluidBalance >= fluidLimit) {
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
        Balans: {props.totalFluidBalance}ml / {fluidLimit}ml
      </h1>
      <img className="max-h-64 max-w-64" src={mascotImage} alt="mascot" />
    </div>
  );
}
