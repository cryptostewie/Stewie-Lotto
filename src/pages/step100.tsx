import Head from "next/head"
import Autocomplete from "react-google-autocomplete"
import { Header, Footer, Text, Container, Button, Input } from '../components'


const Step1: React.FC = () => {
    return (
        <>
            <Head>
                <title>Step1</title>
            </Head>
            <div>
                <Header />

                <div className="text-primary">
                    <div className="h-20"></div>
                    {/* section-1 start*/}
                    <div className="section-1 pt-10 pb-10">
                        <Container>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* left start */}
                                <div className="section-1-left">
                                    <Text variant="body-1">Where is your home?</Text>
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
                                        defaultValue="Amsterdam"
                                    />
                                </div>
                                {/* left end */}

                                {/* right start */}
                                <div className="section-1-right">
                                </div>
                                {/* right end */}
                            </div>
                        </Container>
                    </div>
                    {/* section-1 end*/}

                    {/* section-2 start*/}
                    <div className="section-2 bg-gray pb-6 pt-6">
                        <Container>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <Text variant="body-2" className="flex items-center">Sign Up for our APp to save more money and become more energy efficient.</Text>
                                <Button className="bg-blue text-white md:ml-auto">next</Button>
                            </div>
                        </Container>
                    </div>
                    {/* section-2 end*/}
                </div>

                <Footer />
            </div>
        </>
    )
}

export default Step1