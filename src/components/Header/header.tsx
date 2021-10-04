import React from 'react'
import Container from '../Container/container'
import Text from '../Text/text'
import Logo from '../Logo/logo'

const Header = () => {
    return <div className="h-20 border-solid border-b-2 border-primary flex items-center fixed w-full z-10 bg-white text-primary">
        <Container>
            <div className="flex items-center justify-between">
                <Logo header />

                <div className="items-center hidden md:flex">
                    <Text variant="body-1" className="ml-20">SIGN UP</Text>
                    <Text variant="body-1" className="ml-20">LEARN MORE</Text>
                    <Text variant="body-1" className="ml-20">FAQ</Text>
                    <Text variant="body-1" className="ml-20">ABOUT</Text>
                </div>
            </div>
        </Container>
    </div>
}

export default Header;