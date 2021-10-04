import Head from "next/head"
import Image from 'next/image';
import { Header, Footer, Text, Container, Button } from '../components';


export default function Home() {
  return (
    <>
      <Head>
        <title>Homely project</title>
      </Head>
      <div>
        <Header />

        <div className="text-primary">
          <div className="h-20"></div>
          {/* index-section-1 start*/}
          <div className="index-section-1 pt-10 pb-10">
            <Container>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* left start */}
                <div className="section-1-left">
                  <Text variant="h1" className="mb-10 text-center md:text-left">Energy <br /> Auditing Tool</Text>
                  <Text variant="body-2" className="mb-10">
                    Climate change is an issue we should all be doing our part to address. We don't sell products, instead we recommend what is best for you, the homeowner, and suggest the best ways for you to save money on energy.
                    <br />
                    <br />
                    Inviting, Homely, allowing for a larger font family to make better use of the material design aesthetic.</Text>
                  <Button className="bg-yellow">start assessment</Button>
                </div>
                {/* left end */}

                {/* right start */}
                <div className="section-1-right">
                  <Image src="/section-1.png" width={1000} height={1000} />
                </div>
                {/* right end */}
              </div>
            </Container>
          </div>
          {/* index-section-1 end*/}

          {/* index-section-2 start */}
          <div className="index-section-4 bg-yellow pt-10 pb-10">
            <Container>
              <Text variant="h2" className="mb-10 text-center">ARE YOU READY?</Text>
              <Text variant="body-2" className="mb-10">we help homeowners like you save money on their energy bils and become more energy efficient. Climate Change is an issue we should all be doing our part to address. Start Your Assessment today, and don't forget to Sign-Up to our App so you can save even more.</Text>
              <Button className="bg-white text-primary m-auto">start assessment</Button>
            </Container>
          </div>
          {/* index-section-2 end */}
        </div>

        <Footer />
      </div>
    </>
  )
}
