import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Input, SocialButton } from "../components";

import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import withoutAuth from "../hocs/withoutAuth";

import { useIsAuthenticated } from "../providers/Auth";
import { useAuth } from "../providers/Auth";

const Register = () => {
  const [emailError, setEmailError] = React.useState(undefined);
  const [passwordError, setPasswordError] = React.useState(undefined);
  const [passwordConfirmError, setPasswordConfirmError] = React.useState(
    undefined
  );
  const { setAuthenticated } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const router = useRouter();

  const googleSignUp = async (event) => {
    event.preventDefault();
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
      extensions: [new OAuthExtension()],
    });
    await magic.oauth.loginWithRedirect({
      provider: "google" /* 'google', 'facebook', 'apple', or 'github' */,
      redirectURI: "http://localhost:3000/verifyregister",
      // scope: ["user:email"] /* optional */,
    });
  };

  const render = async () => {
    let html = "";
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
      extensions: [new OAuthExtension()],
    });
    location.href=`/verifyEmailRegister`;
    /*
      For this tutorial, our callback route is simply "/callback"
    */
    // if (window.location.pathname === "/") {
    //   try {
    //     /* Complete the "authentication callback" */
    //     await magic.auth.loginWithCredential();

    //     /* Get user metadata including email */
    //     const userMetadata = await magic.user.getMetadata();

    //     html = `
    //       <h1>Current user: ${userMetadata.email}</h1>
    //       <button onclick="handleLogout()">Logout</button>
    //     `;
    //   } catch {
    //     /* In the event of an error, we'll go back to the login page */
    //     window.location.href = window.location.origin;
    //   }
    // } else {
    //   const isLoggedIn = await magic.user.isLoggedIn();

    //   /* Show login form if user is not logged in */
    //   html = `
    //     <h1>Please sign up or login</h1>
    //     <form onsubmit="handleLogin(event)">
    //       <input type="email" name="email" required="required" placeholder="Enter your email" />
    //       <button type="submit">Send</button>
    //     </form>
    //   `;

    //   if (isLoggedIn) {
    //     /* Get user metadata including email */
    //     const userMetadata = await magic.user.getMetadata();
    //     location.href="/verifyEmailRegister";
    //     // html = `
    //     //   <h1>Current user: ${userMetadata.email}</h1>
    //     //   <button onclick="handleLogout">Logout</button>
    //     // `;
    //   }
    // }

    // document.getElementById("_app").innerHTML = html;
  };

  const handleLogin = async (e) => {
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
      extensions: [new OAuthExtension()],
    });
    e.preventDefault();
    const redirectURI = `http://localhost:3000/verifyEmailRegister`; // 👈 This will be our callback URI
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
    <div id="_app">
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
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />

            {/* <Input
              type="password"
              error={passwordError}
              value={password}
              placeholder="Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />

            <Input
              type="password"
              error={passwordConfirmError}
              value={passwordConfirm}
              placeholder="Password Confirmation"
              onChange={(event) => {
                setPasswordConfirm(event.target.value);
              }}
            /> */}

            {/* <div className="text-red-500">This email is already in use</div> */}

            <Button onClick={handleLogin}>Register</Button>
            <SocialButton onClick={googleSignUp}>
              Sign Up with Google
            </SocialButton>
          </div>

          <div className="flex justify-between">
            <div className="text-white">Already have an account?</div>
            <div
              className="text-yellow cursor-pointer"
              onClick={(event) => {
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
    </div>
  );
};

export default withoutAuth(Register);
