import React from 'react'
import Image from 'next/image'
import Container from '../Container/container'
import Text from '../Text/text'
import Button from '../Button/button'
import Logo from '../Logo/logo'

const Footer = () => {
    return <div>
        <Container>
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-20 pt-10 pb-10 text-primary">
                <div>
                    <Logo />
                    <div className="h-2" />
                    <Text variant="body-2" className="mb-10">
                        Climate change is an issue we should all be doing our part to address. We don't sell products, instead we recommend what is best for you, the homeowner, and suggest the best ways for you to save money on energy.
                    </Text>

                    <div className="flex">
                        <div className="mr-20">
                            <Image src="/doc.svg" width={30} height={30} className="mr-20" />
                        </div>

                        <div className="mr-20">
                            <Image src="/alert.svg" width={30} height={30} className="mr-20" />
                        </div>

                        <div className="mr-20">
                            <Image src="/add.svg" width={30} height={30} className="mr-20" />
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-6">
                        <Text variant="body-1">SIGN UP</Text>
                        <Text variant="body-1">LEARN MORE</Text>
                        <Text variant="body-1">FAQ</Text>
                        <Text variant="body-1">ABOUT</Text>
                    </div>

                    <Text variant="body-2" className="mb-6">
                        Climate change is an issue we should all be doing our part to address. We don't sell products, instead we recommend what is best for you, the homeowner, and suggest the best ways for you to save money on energy.
                    </Text>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <Text variant="body-1" className="text-primary flex items-center">Sign Up for our App</Text>
                        <Button className="bg-blue text-white md:ml-auto">sign up</Button>
                    </div>
                </div>
            </div>
        </Container>
    </div>
}

export default Footer;