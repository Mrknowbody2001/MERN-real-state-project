import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../fireBase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
} from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(null);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  //!
  const dispatch = useDispatch();
  const navigate = useNavigate(); //navigate
  console.log(file);
  console.log(filePercent);
  //!
  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);
  //!
  const handleFileUpload = async () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
      },
      (error) => {
        setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({
            ...formData,
            avatar: downloadURL,
          });
        });
      }
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };
  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate("/signin", {
        replace: true,
      });
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  //!
  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch(`/api/auth/signout`, {
        method: "get",
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        // console.log(data);
        return;
      }
      dispatch(signOutSuccess(data));
      navigate("/signin", {
        replace: true,
      });
    } catch (error) {
      dispatch(signOutFailure(error.message));
      // console.log(error);
    }
  };
  return (
    //fire base
    // allow read;
    //   allow write: if request.resource.size < 2 * 1024* 1024 && request.resource.contentType.matches('image/.*');
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          // src=""
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser?.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="self-center">
          {fileError ? (
            <span className="text-red-600">Error Image upload</span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className="text-green-600">{`Uploading ${filePercent}%`}</span>
          ) : filePercent === 100 ? (
            <span className="text-green-600">
              Image Successfully Uploaded..!
            </span>
          ) : null}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser?.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser?.email}
          placeholder="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-600 text-white p-3 rounded-lg uppercase hover:opacity-95"
        >
          {loading ? "loading..." : "update"}
        </button>
        <Link  className="bg-green-600 text-white text-center p-3 rounded-lg uppercase hover:opacity-95 "to={"/create-listing"} >
        Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-600 cursor-pointer">
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-600 cursor-pointer">
          Sign-out
        </span>
      </div>

      <p className="text-red-600 mt-5">{error ? error : ""}</p>
      <p className="text-green-600 mt-5">
        {updateSuccess ? "Successfully updated" : ""}
      </p>
    </div>
  );
};

export default Profile;
