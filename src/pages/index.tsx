import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "../components";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import APIClient from "../service/api-clients";
import { SignResParam } from "../types/sign-params";
import apiConfig from "../config/index";
import { getUserInfo } from "../utils/api";

import { useIsAuthenticated } from "../providers/Auth";
import { useAuth } from "../providers/Auth";
import withoutAuth from "../hocs/withoutAuth";
import Cookies from "js-cookie";

const Index = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const isAuthenticated = useIsAuthenticated();
  const { setAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      try {
        getUserInfo(Cookies.get("session"))
          .then((response) => {
            if (response.data.success) {
              setUsername(response.data.user.username);
            } else if (
              !response.data.success &&
              response.data.message === "jwt expired"
            ) {
              console.error(response.data.message);
              toast("Token Expired, please log in again!", {
                type: toast.TYPE.WARNING,
                hideProgressBar: true,
              });
              setAuthenticated(false);
            } else {
              console.error("err_getuserinfo");
            }
          })
          .catch((err) => {
            console.error("__errGetUserInfo", err.message);
            toast("Unauthourized User!", {
              type: toast.TYPE.WARNING,
              hideProgressBar: true,
            });
            // location.href = "/logout";
          });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Head>
        <title>Stewie's Lotto</title>
      </Head>

      <div>
        <div className="bg-gradient-to-b from-primary to-secondary px-4 md:px-32 py-20">
          <div className="bg-secondary p-2 flex items-center justify-between rounded-xl">
            <div className="flex items-center space-x-4">
              <Image src="/coins.svg" width={42} height={42} />
              <div className="text-white text-xl">Stewie's Lotto</div>
            </div>
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  <div
                    className="px-2"
                    style={{ color: "white" }}
                  >{`${username} `}</div>
                  |
                  <Button
                    onClick={async (event) => {
                      event.preventDefault();
                      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
                        extensions: [new OAuthExtension()],
                      });
                      await magic.user.logout();
                      Cookies.remove('session');
                      setAuthenticated(false);
                      // router.push("/logout");
                    }}
                    className="bg-primary hover:bg-secondary duration-300 px-6"
                  >
                    {"Logout"}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      router.push("/login");
                    }}
                    className="bg-primary hover:bg-secondary duration-300 px-6"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={(event) => {
                      event.preventDefault();
                      router.push("/register");
                    }}
                    className="bg-primary hover:bg-secondary duration-300 px-6"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gradient-to-b from-primary to-secondary">
            <div className="col-span-1 flex items-center justify-center">
              <Image src="/treasure-box.svg" width={200} height={200} />
            </div>
            <div className="col-span-1 flex flex-col space-y-10 items-center justify-center py-4">
              <div className="flex flex-col space-y-2 items-center">
                <div className="text-white">Current prize pool</div>
                <div className="flex items-center justify-center space-x-2 text-white">
                  <div className="w-10 h-10 flex items-center justify-center rounded bg-primary">
                    1
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center rounded bg-primary">
                    2
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center rounded bg-primary">
                    3
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center rounded bg-primary">
                    4
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center rounded bg-primary">
                    $
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="text-yellow text-center">
                  Welcome Stewie's Lotto
                </div>
                <div className="text-center text-white text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec dui tincidunt, laoreet ante quis, malesuada
                  elit.
                </div>
              </div>
              <Button onClick={() => {}} className="w-40">
                Play Now
              </Button>
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <Image src="/money-bag.svg" width={200} height={200} />
            </div>
          </div>
          <div className="flex items-center justify-between bg-primary p-4 text-white text-xs">
            <div>Last winner : username1</div>
            <div>|</div>
            <div>highest win : username1</div>
            <div>|</div>
            <div>Biggest deposit : anonymous1</div>
            <div>|</div>
            <div>Curent prize pool : $ 1234</div>
            <div>|</div>
            <div>Total raffled : $ 1203423</div>
            <div>|</div>
            <div>Most wins : username1</div>
          </div>

          <div className="">
            <div className="text-white text-center text-4xl my-10">
              How it works
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-20 text-white">
              <div className="col-span-1 bg-gradient-to-t from-primary to-secondary rounded-xl p-8 flex flex-col items-center justify-center space-y-4">
                <Image src="/croupier.svg" width={100} height={100} />
                <div className="w-6 h-6 rounded-full text-white bg-secondary flex items-center justify-center">
                  1
                </div>
                <div className="font-black">Buy Your Ticker</div>
                <div className="text-center text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec dui tincidunt
                </div>
              </div>
              <div className="col-span-1 bg-gradient-to-t from-primary to-secondary rounded-xl p-8 flex flex-col items-center justify-center space-y-4">
                <Image src="/roulette.svg" width={100} height={100} />
                <div className="w-6 h-6 rounded-full text-white bg-secondary flex items-center justify-center">
                  2
                </div>
                <div className="">Ticker funds go into prize pool</div>
                <div className="text-center text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec dui tincidunt
                </div>
              </div>
              <div className="col-span-1 bg-gradient-to-t from-primary to-secondary rounded-xl p-8 flex flex-col items-center justify-center space-y-4">
                <Image src="/jackpot.svg" width={100} height={100} />
                <div className="w-6 h-6 rounded-full text-white bg-secondary flex items-center justify-center">
                  3
                </div>
                <div className="">Random user winds Jackpot</div>
                <div className="text-center text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Phasellus nec dui tincidunt
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary h-20 flex items-center justify-between px-4 md:px-32">
          <div className="text-white">
            2021 Stewies' Lotto. Inc. All right reversed
          </div>
          <Image src="/discord.svg" width={20} height={20} />
        </div>
      </div>
    </>
  );
};

export default Index;
