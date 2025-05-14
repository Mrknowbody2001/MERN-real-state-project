import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { register } from "swiper/element/bundle";
register();

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //
  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success == false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl"> loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl"> Something went wrong...</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation modules={[Navigation]} className="w-full">
            {listing.imageUrls.map((url, index) => (
              <SwiperSlide key={index}>
                <div
                  className="w-full"
                  style={{
                    backgroundImage: `url(${url})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "500px",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </main>
  );
};

export default Listing;
