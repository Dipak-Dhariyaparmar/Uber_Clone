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
// this component is a CaptainProtectWrapper related

// this component is a wrapper for the captain's pages that checks if the captain is logged in and has a valid token. If not, it redirects to the login page. It also fetches the captain's profile data and stores it in the context for use in other components.
// it uses the CaptainDataContext to access and set the captain's data, and it uses axios to make API requests to the backend. If the token is invalid or expired, it removes the token from local storage and redirects to the login page.
// it is used to protect the captain's routes and ensure that only authenticated captains can access them.
