import React, { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CapatainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data.captain);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;

// this is a wrapper component that protects the captain's routes. It checks if the user is logged in by checking the token in local storage. If the token is not present, it redirects the user to the login page. If the token is present, it fetches the captain's profile data from the server and sets it in the context. If there is an error while fetching the data, it removes the token from local storage and redirects the user to the login page. The component uses useEffect hook to perform side effects and useContext hook to access the context data. The component is exported as default.
