import './badge.scss';
import { contrastTextColor, hexColorCalculation } from "@/util/util";
import { useMemo } from "react";

interface IBadgeProps {
  text: string;
}

export default function Badge({text}: IBadgeProps) {

  const hex = useMemo(() => hexColorCalculation(text), [text]);
  const textColor = useMemo(() => contrastTextColor(hex), [hex]);

  return (
    <div className={`badge`} style={{backgroundColor: hex, color: textColor}}>
      {text}
    </div>
  );
}
