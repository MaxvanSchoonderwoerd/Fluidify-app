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
  const [imagePath, setImagePath] = useState<string>();

  const fluidLimit: number = 2000;

  useEffect(() => {
    const quartile = fluidLimit / 4;

    switch (true) {
      case props.totalFluidBalance <= 0:
        setImagePath(image1);
        break;
      case props.totalFluidBalance >= quartile * 1 && props.totalFluidBalance < quartile * 2:
        setImagePath(image2);
        break;
      case props.totalFluidBalance >= quartile * 2 && props.totalFluidBalance < quartile * 3:
        setImagePath(image3);
        break;
      case props.totalFluidBalance >= quartile * 3 && props.totalFluidBalance < fluidLimit:
        setImagePath(image4);
        break;
      case props.totalFluidBalance >= fluidLimit:
        setImagePath(image5);
        break;
      default:
        setImagePath(image1); // Fallback
        break;
    }
  }, [props.totalFluidBalance, fluidLimit]);

  return (
    <>
      <h1 className="font-semibold text-4xl mt-4 mb-4">Balans: {props.totalFluidBalance}ml</h1>
      <img src={imagePath} alt="mascot" />
    </>
  );
}
