import React from "react";
import { TMessages } from "../App";

interface TComicTextBoxProps {
  messages: TMessages[];
  messageIndex: number;
}

export default function ComicTextBoxComponent(props: TComicTextBoxProps) {
  return (
    <div className="relative flex items-center">
      <div className="ml-4 p-4 bg-white border-2 border-black rounded-lg relative w-96">
        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-black" />
        <div className="absolute -left-3.5 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent border-r-[9px] border-r-white" />
        <span className="font-semibold">{props.messages[props.messageIndex].title}</span> {props.messages[props.messageIndex].body}
      </div>
    </div>
  );
}
