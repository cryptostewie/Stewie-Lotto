import React from 'react'
import Image from 'next/image'
import Text from '../Text/text'

interface LogoProps {
    header?: boolean;
}

const Logo: React.FC<LogoProps> = ({ header }) => {
    return <div className="flex items-center">
        <Image src="/logo.svg" width={40} height={40} />
        <Text variant="h5" className={`ml-4 text-primary ${header && "hidden"} md:block`}>LOGOTYPE</Text>
    </div>
}

export default Logo