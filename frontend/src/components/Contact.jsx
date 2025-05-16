import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { use } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  //
  const [Landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  //
  const onchange = (e) => {
    setMessage(e.target.value);
  };
  //
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);
  //!
  return (
    <>
      s
      {Landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{Landlord.name}</span>for
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onchange}
            placeholder="Enter Your Message"
            className="w-full border p-3 rounded-lg"
          ></textarea>
          {/* <Link
            to={`mailto:${Landlord.email}?Subject=Regarding${listing.name}&body=${message}`}
            className="bg-slate-600 text-white text-center p-3 rounded-lg hover:opacity-95"
          >
            Send a message
          </Link> */}
          <a
            href={`mailto:${Landlord.email}?subject=${encodeURIComponent(
              "Regarding " + listing.name
            )}&body=${encodeURIComponent(message)}`}
            className="bg-slate-600 text-white text-center p-3 rounded-lg hover:opacity-95"
          >
            Send a message
          </a>
        </div>
      )}
    </>
  );
};

export default Contact;
