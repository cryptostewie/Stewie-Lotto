import React from 'react'
import Head from "next/head"
import Image from 'next/image'
import Autocomplete from "react-google-autocomplete"
import { Header, Footer, Text, Container, Button } from '../../components'

const Step1:React.FC = () => {
    return (
        <>
          <Head>
            <title>Step1</title>
          </Head>
          <div>
            <Header />
    
            <div className="text-primary">
                <div className="h-20"></div>

                {/* step-1-section start */}
                <div className="step-1-section pt-10 pb-10">
                    <Container>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {/* left start */}
                            <div className="section-1-left col-span-1">
                                <Text variant="h1" className="mb-10 text-center md:text-left">Location</Text>
                                <Autocomplete
                                    apiKey="AIzaSyBdabMKnnjEKg4xVEquTImFH-ngPsOMGOA"
                                    style={{
                                        width: '100%',
                                        height: 40,
                                        borderRadius: 5,
                                        boxShadow: '0px 2px 6px gray',
                                        padding: 5,
                                        paddingLeft: 10,
                                        outline: 'none',
                                        marginTop: 10,
                                    }}
                                />
                                <Text variant="body-2" className="mb-10 mt-10">
                                    From Texas to Alaska, New York to California.
                                    <br/>
                                    Wherever you are in the U.S. we can help you.
                                    <br/>
                                    <br/>
                                    The location of you house will allow us to compare your home to other homes in your area. Where you are in the world dictates how much you spend on energy.
                                    <br/>
                                    <br/>
                                    With you location, we can help you seek out the apportunities that will provide the most bang for your buck, and guide you through the changes that are a bit more difficult to implement
                                </Text>
                                <Button className="bg-yellow">Continue</Button>
                            </div>
                            {/* left end */}

                            {/* right start */}
                            <div className="section-1-right col-span-2">
                                <Image src="/section-1.png" width={1000} height={1000} />
                            </div>
                            {/* right end */}
                        </div>
                    </Container>
                </div>
                {/* step-1-section end */}
            </div>
    
            <Footer />
          </div>
        </>
      )
}

export default Step1