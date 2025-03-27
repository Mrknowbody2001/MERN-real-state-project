import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../fireBase";
import { useDispatch } from "react-redux";
import { signInSuccess, signInFailure } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/profile");
    } catch (error) {
      console.log("could not sign in with google", error);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-500 text-white p-3 rounded-lg uppercase"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
