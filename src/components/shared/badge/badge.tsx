import './badge.scss';
import { contrastTextColor, hexColorCalculation } from "@/util/util";
import { useMemo } from "react";

interface IBadge {
  text: string;
}

export default function Badge({text}: IBadge) {

  const hex = useMemo(() => hexColorCalculation(text), [text]);
  const textColor = useMemo(() => contrastTextColor(hex), [hex]);

  return (
    <div className={`badge`} style={{backgroundColor: hex, color: textColor}}>
      {text}
    </div>
  );
}
