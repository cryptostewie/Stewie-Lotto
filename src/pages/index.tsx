import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, ErrorMessage } from "../components";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import APIClient from "../service/api-clients";
import { ResParam } from "../types/res-params";
import apiConfig from "../config/index";
import { getUserInfo } from "../utils/api";

import { useIsAuthenticated } from "../providers/Auth";
import { useAuth } from "../providers/Auth";
import withoutAuth from "../hocs/withoutAuth";
import Cookies from "js-cookie";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: 669,
    height: 420,
    backgroundColor: "#3E4577",
  },
};

const Index = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [ticketAmount, setTiecktAmount] = useState(null);
  const [errTicketAmount, setErrTicketAmount] = useState(false);
  const [errMsgTicketAmount, setErrMsgTicketAmount] = useState(null);
  const [remainingTicketAmount, setRemainingTicketAmount] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  let subtitle;

  const apiClient = APIClient.getInstance();

  const isAuthenticated = useIsAuthenticated();
  const { setAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      try {
        getUserInfo(Cookies.get("session"))
          .then((response) => {
            if (response.data.success) {
              setUserInfo(response.data.user);
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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  };

  const onPlayNow = async () => {
    const res = await apiClient.post<ResParam>(apiConfig.CURRENT_LOTTO, {
      id: 3,
    });
    console.log("__current_lotto", res.data);
    if (res.data) {
      Cookies.set("lottoId", res.data.id);
      Cookies.set("lottoAvailableTicketCount", res.data.availableTicketCount);
      setRemainingTicketAmount(res.data.availableTicketCount);
    }
    openModal();
  };

  const validate = () => {
    setErrTicketAmount(true);
    if (!ticketAmount || ticketAmount === 0) {
      setErrMsgTicketAmount("Ticket Amount is required");
    }
    if (ticketAmount > remainingTicketAmount)
      setErrMsgTicketAmount("No enough tickets");

    return !(
      !ticketAmount ||
      ticketAmount === 0 ||
      ticketAmount > remainingTicketAmount
    );
  };

  const purchase = async () => {
    if (validate()) {
      const lottoId = Cookies.get("lottoId");
      const lottoAvailableTicketCount = Cookies.get(
        "lottoAvailableTicketCount"
      );
      const data = {
        lottoId: lottoId,
        userId: userInfo.id,
        ticketCount: parseInt(ticketAmount),
        availableTicketCount: lottoAvailableTicketCount - ticketAmount,
      };
      console.log("__data", data);
      const res = await apiClient.post<ResParam>(apiConfig.PURCHASE, data);
      console.log("__purchase", res.data);
      Cookies.set("lottoAvailableTicketCount", res.data.availableTicketCount);
      setRemainingTicketAmount(res.data.availableTicketCount);
    }
  };

  console.log("__ticketAmount", ticketAmount);

  return (
    <>
      <ToastContainer />
      <Head>
        <title>Stewie's Lotto</title>
      </Head>
      <Modal
        // className="bg-primary "
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div>
          <Image src={"/back-arrow.svg"} width={10} height={10} />
          <button onClick={closeModal} className="text-sm text-gray1">
            back
          </button>
          <div className="p-5">
            <div className="flex items-center">
              <div>
                <div className="text-sm text-gray1">Amount of tickets</div>
                <input
                  type="text"
                  className="bg-dark py-1 px-3 rounded mt-2 text-sm text-gray1"
                  value={ticketAmount}
                  onChange={(event) => setTiecktAmount(event.target.value)}
                />
                <ErrorMessage
                  isVisible={errTicketAmount}
                  content={errMsgTicketAmount}
                />
              </div>
              <div className="flex text-gray1">
                <Image src="/tickets.svg" width={33} height={33} />
                {remainingTicketAmount && (
                  <div className="text-3xl text-gray1">
                    {remainingTicketAmount}
                  </div>
                )}
              </div>
            </div>
            <div className="text-xl mt-5 text-gray1">Payment</div>
            <div className="text-sm text-gray1">Insert payment details</div>
            <div className="flex space-x-2 my-5">
              <div className="hover:bg-transparent duration-300 rounded-md cursor-pointer">
                <Image src="/creditcard.svg" width={89} height={31} />
              </div>
              <div className="hover:bg-transparent duration-300 rounded-md cursor-pointer">
                <Image src="/cashapp.svg" width={74} height={31} />
              </div>
              <div className="hover:bg-transparent duration-300 rounded-md cursor-pointer">
                <Image src="/crypto.svg" width={74} height={31} />
              </div>
              <div className="hover:bg-transparent duration-300 rounded-md cursor-pointer">
                <Image src="/venmo.svg" width={74} height={31} />
              </div>
              <div className="hover:bg-transparent duration-300 rounded-md cursor-pointer">
                <Image src="/apple.svg" width={74} height={31} />
              </div>
            </div>
            <div className="text-gray1 text-md">Total</div>
            <div className="flex items-center justify-items-end">
              <div className="text-gray1 text-2xl font-semibold">$ 428.00</div>
              <Button className="w-32" onClick={purchase}>
                Purchase
              </Button>
            </div>
          </div>
        </div>
      </Modal>
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
                  <div className="px-2" style={{ color: "white" }}>
                    {username && `${username} `}
                  </div>
                  |
                  <Button
                    onClick={async (event) => {
                      event.preventDefault();
                      const magic = new Magic(
                        process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY,
                        {
                          extensions: [new OAuthExtension()],
                        }
                      );
                      await magic.user.logout();
                      Cookies.remove("session");
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
              <Button onClick={onPlayNow} className="w-40">
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
