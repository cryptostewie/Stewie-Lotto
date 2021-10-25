import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";

import { Input, Button, SocialButton } from "../components";
import withoutAuth from "../hocs/withoutAuth";

const Login = () => {
  const [emailError, setEmailError] = React.useState(undefined);
  const [passwordError, setPasswordError] = React.useState(undefined);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();

  const googleSignIn = async (event) => {
    event.preventDefault();
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
      extensions: [new OAuthExtension()],
    });
    await magic.oauth.loginWithRedirect({
      provider: "google" /* 'google', 'facebook', 'apple', or 'github' */,
      redirectURI: `https://warm-thicket-75973.herokuapp.com/${process.env.FRONT_URL}/verifylogin`,
      // scope: ["user:email"] /* optional */,
    });
  };

  const render = async () => {
    let html = "";
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
      extensions: [new OAuthExtension()],
    });
    location.href = `/verifyEmailLogin`;
  };

  const handleLogin = async (e) => {
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
      extensions: [new OAuthExtension()],
    });
    e.preventDefault();
    const redirectURI = `https://warm-thicket-75973.herokuapp.com/${process.env.FRONT_URL}/verifyEmailLogin`; // 👈 This will be our callback URI
    if (email) {
      /* One-liner login 🤯 */
      await magic.auth.loginWithMagicLink({ email, redirectURI }); // 👈 Notice the additional parameter!
      render();
    }
  };

  const handleLogout = async () => {
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
      extensions: [new OAuthExtension()],
    });
    await magic.user.logout();
    render();
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-5 min-h-screen">
        <div className="col-span-1 lg:col-span-2 bg-primary h-full px-4 py-20 md:px-32 md:py-0 flex flex-col space-y-10 justify-center">
          <div className="flex items-center space-x-4">
            <Image src="/coins.svg" width={75} height={75} />
            <div className="text-white text-2xl font-black">Stewie's Lotto</div>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="text-white">Login</div>

            <Input
              error={emailError}
              value={email}
              placeholder="Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            {/* 
            <Input
              type="password"
              error={passwordError}
              value={password}
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            /> */}

            <div className="text-white">Forgot your password?</div>

            <Button onClick={handleLogin}>Login</Button>
            <SocialButton onClick={googleSignIn}>
              Sign In with Google
            </SocialButton>
          </div>

          <div className="flex justify-between">
            <div className="text-white">Don't you have account?</div>
            <div
              className="text-yellow cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                router.push("/register");
              }}
            >
              Register
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-3 bg-secondary py-20 md:py-0 h-full flex flex-col items-center justify-center">
          <div className="text-white mb-20 text-4xl font-black">
            Welcome back
          </div>
          <Image src="/roulette.svg" width={250} height={250} />
        </div>
      </div>
    </>
  );
};

export default withoutAuth(Login);
