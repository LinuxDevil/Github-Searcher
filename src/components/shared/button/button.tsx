import './button.scss';
import Image from "next/image";

interface IButtonProps {
  text: string;
  icon?: string;
  isDisabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({text, icon, isDisabled=false, onClick}: IButtonProps) {
  return (
    <button className='button' disabled={isDisabled} onClick={onClick}>
      {icon && <Image src={icon} alt={`${text} button icon`} width={16} height={16} className='button__icon' />}
      {text}
    </button>
  );
}
