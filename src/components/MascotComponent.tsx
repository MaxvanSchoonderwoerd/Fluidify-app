import { useEffect, useState } from "react";
import image1 from "../assets/smily1.png";
import image2 from "../assets/smily2.png";
import image3 from "../assets/smily3.png";
import image4 from "../assets/smily4.png";
import image5 from "../assets/smily5.png";

type TMascotComponentProps = {
  totalFluidBalance: number;
};

export default function MascotComponent(props: TMascotComponentProps) {
  const [mascotImage, setMascotImage] = useState<string>();

  const fluidLimit: number = 2000;

  useEffect(() => {
    const quartile = fluidLimit / 4;

    switch (true) {
      case props.totalFluidBalance <= 0:
        setMascotImage(image1);
        break;
      case props.totalFluidBalance >= quartile * 1 && props.totalFluidBalance < quartile * 2:
        setMascotImage(image2);
        break;
      case props.totalFluidBalance >= quartile * 2 && props.totalFluidBalance < quartile * 3:
        setMascotImage(image3);
        break;
      case props.totalFluidBalance >= quartile * 3 && props.totalFluidBalance < fluidLimit:
        setMascotImage(image4);
        break;
      case props.totalFluidBalance >= fluidLimit:
        setMascotImage(image5);
        break;
      default:
        setMascotImage(image1); // Fallback
        break;
    }
  }, [props.totalFluidBalance, fluidLimit]);

  return (
    <>
      <h1 className="font-semibold text-4xl mt-4 mb-4">Balans: {props.totalFluidBalance}ml</h1>
      <img src={mascotImage} alt="mascot" />
    </>
  );
}
