import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router'
import { Button, Input } from "../components";

const Register = () => {
  const [emailError, setEmailError] = React.useState(undefined);
  const [passwordError, setPasswordError] = React.useState(undefined);
  const [passwordConfirmError, setPasswordConfirmError] = React.useState(
    undefined
  );

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const router = useRouter();

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen">
        <div className="col-span-1 lg:col-span-2 bg-primary h-full px-4 py-20 md:px-32 md:py-0 flex flex-col space-y-10 justify-center">
          <div className="flex items-center space-x-4">
            <Image src="/coins.svg" width={75} height={75} />
            <div className="text-white text-2xl font-black">Stewie's Lotto</div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="text-white">Register</div>

            <Input
              error={emailError}
              value={email}
              placeholder="Email"
              onChange={event => {
                event.preventDefault();
              }}
            />

            <Input
              error={passwordError}
              value={password}
              placeholder="Password"
              onChange={event => {
                event.preventDefault();
              }}
            />

            <Input
              error={passwordConfirmError}
              value={passwordConfirm}
              placeholder="Password Confirmation"
              onChange={event => {
                event.preventDefault();
              }}
            />

            <div className="text-red-500">This email is already in use</div>

            <Button
              onClick={event => {
                event.preventDefault();
              }}
            >
              Register
            </Button>
          </div>

          <div className="flex justify-between">
            <div className="text-white">Already have an account?</div>
            <div
              className="text-yellow cursor-pointer"
              onClick={event => {
                event.preventDefault();
                router.push("/login");
              }}
            >
              Login
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3 bg-secondary h-full flex flex-col items-center justify-center">
          <div className="text-white mb-20 text-4xl font-black">Join Us</div>
          <Image src="/roulette.svg" width={250} height={250} />
        </div>
      </div>
    </>
  );
};

export default Register;
