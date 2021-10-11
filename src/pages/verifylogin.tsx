import React from "react";
import { useEffect, useState } from "react";

import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth";
import { ToastContainer, toast } from "react-toastify";
import Loader from "react-loader-spinner";

import APIClient from "../service/api-clients";
import { SignResParam } from "../types/sign-params";
import apiConfig from "../config/index";

import { useIsAuthenticated } from "../providers/Auth";
import { useAuth } from "../providers/Auth";
import withoutAuth from "../hocs/withoutAuth";
import Cookies from "js-cookie";

const verifylogin = () => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#FFFFFF");
  const apiClient = APIClient.getInstance();
  const API_URL = apiConfig.GOOGLE_SIGN_IN;

  const isAuthenticated = useIsAuthenticated();
  const { setAuthenticated } = useAuth();

  const func = async () => {
    setLoading(true);
    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY, {
        extensions: [new OAuthExtension()],
      });
      const result = await magic.oauth.getRedirectResult();
      console.log("__signinRes", result);
      const res = await apiClient.post<SignResParam>(API_URL, {
        email: result.oauth.userInfo.email,
      });
      if (res.success && res.token) {
        Cookies.set("session", res.token);
        setAuthenticated(true);
        toast("Successfully logged in!", {
          type: toast.TYPE.SUCCESS,
          hideProgressBar: true,
        });
        location.href = "/";
      } else if (res.message) {
        console.error(res.message);
        toast.error(res.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };
  useEffect(() => {
    func();
  }, []);
  return (
    <>
      <ToastContainer />
      <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          visible={loading}
        />
      </div>
    </>
  );
};

export default verifylogin;
