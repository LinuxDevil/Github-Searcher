import "./card.scss";
import { ReactNode } from "react";

interface ICardProps {
  children: ReactNode;
}

export default function Card({ children }: ICardProps) {
  return (
    <div className="card">
      {children}
    </div>
  );
}
