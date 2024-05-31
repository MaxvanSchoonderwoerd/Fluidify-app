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

  const handleButtonClicked = (buttonType: string) => {
    switch (buttonType) {
      case "minus":
        props.removeFluid(props.volume);
        if (ammount >= 1) setAmmount(ammount - 1);
        break;
      case "plus":
        props.addFluid(props.volume);
        setAmmount(ammount + 1);
    }
  };

  return (
    <div className="bg-blue-500 w-64 p-4 m-4 grid place-items-center rounded-lg">
      <p className="font-medium text-white">
        {props.name} ({props.volume}ml)
      </p>
      <div className="w-1/2 flex flex-row justify-between mt-2 ">
        <button className="bg-white hover:bg-slate-200 w-8 h-8 rounded-lg font-extrabold text-blue-500" onClick={() => handleButtonClicked("minus")}>
          - 1
        </button>
        <p className="text-white">{ammount}</p>
        <button className="bg-white hover:bg-slate-200 w-8 h-8 rounded-lg font-extrabold text-blue-500" onClick={() => handleButtonClicked("plus")}>
          + 1
        </button>
      </div>
    </div>
  );
}
