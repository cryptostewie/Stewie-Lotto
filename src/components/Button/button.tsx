import React from 'react'
import Text from '../Text/text'

interface ButtonProps {
    className: string;
}

const Button: React.FC<ButtonProps> = ({ children, className }) => {
    return <div className={`${className} cursor-pointer md:w-60 h-14 flex justify-center items-center rounded uppercase font-bold sm:w-full hover:bg-purple-700 hover:text-white duration-300 ease-in-out`}>
        <Text variant="button">{children}</Text>
    </div>
}

export default Button;