import Image from "next/image";
import { MouseEventHandler } from "react";

interface ButtonProps {
    title: string;
    type: 'button' | 'submit';
    leftIcon?: string | null;
    isSubmitting?: boolean;
    rightIcon?: string | null;
    handleClick?: MouseEventHandler;
    bgColor?: string;
    textColor?: string | null;
}

const Button = ({title, type, textColor, leftIcon, isSubmitting, handleClick, bgColor, rightIcon}: ButtonProps) => {
  return (
    <button onClick={handleClick} type={type || "button"} disabled={isSubmitting} className={`flexCenter gap-3 py-3 px-4 ${textColor || 'text-white'} ${isSubmitting ? 'bg-black/50' : bgColor || 'bg-blue-600'} rounded-xl text-sm max-md:w-full font-medium`}>
        {leftIcon && (<Image src={leftIcon} alt="left-icon" width={15} height={15}  />)}
        {title}
        {rightIcon && (<Image src={rightIcon} alt="right-icon" width={15} height={15}  />)}
    </button>
  )
}

export default Button