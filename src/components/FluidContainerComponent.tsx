import { useState } from "react";
import "../index.css";

type TFluidContainerProps = {
  id: number;
  name: string;
  volume: number;
  removeFluid: Function;
  addFluid: Function;
};

export default function FluidContainerComponent(props: TFluidContainerProps) {
  const [ammount, setAmmount] = useState<number>(0);

  const handleButtonClicked = (buttonType: string, currentAmmount: number) => {
    switch (buttonType) {
      case "minus":
        if (ammount <= 0) return;
        props.removeFluid(props.volume * currentAmmount);
        if (ammount >= currentAmmount) setAmmount(ammount - currentAmmount);
        break;
      case "plus":
        props.addFluid(props.volume * currentAmmount);
        setAmmount(ammount + currentAmmount);
    }
  };

  return (
    <div className="bg-blue-500 w-64 p-4 m-4 grid place-items-center rounded-lg">
      <p className="font-medium text-white">
        {props.name} ({props.volume}ml)
      </p>
      <div className="w-full flex flex-row justify-between mt-2 ">
        <button className="bg-white size-10 text-blue-500 disabled:bg-gray-300 disabled:text-gray-500" onClick={() => handleButtonClicked("minus", 1)} disabled={ammount < 1}>
          - 1
        </button>
        <button className="bg-white size-10 text-blue-500 disabled:bg-gray-300 disabled:text-gray-500" onClick={() => handleButtonClicked("minus", 0.5)} disabled={ammount < 0.5}>
          - 0.5
        </button>
        <p className="bg-white size-10 text-blue-500 text-center place-items-center">{ammount}</p>
        <button className="bg-white size-10 text-blue-500" onClick={() => handleButtonClicked("plus", 0.5)}>
          + 0.5
        </button>
        <button className="bg-white size-10 text-blue-500" onClick={() => handleButtonClicked("plus", 1)}>
          + 1
        </button>
      </div>
    </div>
  );
}
