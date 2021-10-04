import React from 'react'
import Text from '../Text/text'

interface InputProps {
    label?: string;
}

const Input: React.FC<InputProps> = ({ label }) => {
    return <div>
        {label && <Text variant="body-1" className="mb-2">{label}</Text>}
        <input className="rounded-lg border border-gray outline-none h-10 w-full shadow-md p-2" />
    </div>
}

export default Input