import { useEffect, useState } from "react";
import image1 from "../assets/smily1.png";
import image2 from "../assets/smily2.png";
import image3 from "../assets/smily3.png";
import image4 from "../assets/smily4.png";
import image5 from "../assets/smily5.png";

const images = [image1, image2, image3, image4, image5];

type TMascotComponentProps = {
  totalFluidBalance: number;
};

export default function MascotComponent(props: TMascotComponentProps) {
  const [mascotImage, setMascotImage] = useState<string>();

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
    <>
      <h1 className="font-semibold text-4xl mt-4 mb-4 text-primary">
        Balans: {props.totalFluidBalance}ml / {fluidLimit}ml
      </h1>
      <img src={mascotImage} alt="mascot" />
    </>
  );
}
