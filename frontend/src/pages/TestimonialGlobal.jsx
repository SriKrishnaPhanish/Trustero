import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorWarning } from "../components/ErrorWarning";

export const TestimonialGlobal = () => {
  const { companyName } = useParams();
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [rating, setRating] = useState("");
  const [hiddenflag, setHiddenFlag] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_API
          }api/v1/testimonials/${companyName}`
        );
        console.log(response);
      } catch (err) {
        if (err.response && err.response.status == 404) {
          setNotFound(true);
        }
      }
    };
    if (companyName) {
      fetchData();
    }
  }, [companyName]);
  if (notFound) {
    navigate("/notfound");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl mx-auto p-6 bg-transparent rounded-lg shadow-md space-y-6">
        <div>
          <div className="text-center">
            <ErrorWarning label={errorMsg} isHidden={hiddenflag} />
          </div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full h-10 border border-gray-300 rounded-md flex items-center px-3 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="James Bond"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            className="w-full h-10 px-3 border text-gray-500  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          >
            <option value="" className="">
              Select rating
            </option>
            <option value="1">★☆☆☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="3">★★★☆☆</option>
            <option value="4">★★★★☆</option>
            <option value="5">★★★★★</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Testimonial
          </label>
          <textarea
            id="testimonial"
            name="testimonial"
            placeholder="Write your testimonial here..."
            className="w-[530px] min-h-[150px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={testimonial}
            onChange={(e) => {
              setTestimonial(e.target.value);
            }}
          />
        </div>

        <div className="pt-2">
          <button
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            onClick={async () => {
              try {
                const response = await axios.post(
                  `${
                    import.meta.env.VITE_BACKEND_API
                  }api/v1/testimonials/${companyName}`,
                  {
                    testimonial: testimonial,
                    rating: Number(rating),
                    fullName: fullName,
                  }
                );
              } catch (err) {
                if (err.response && err.response.status == 422) {
                  setFullName("");
                  setRating("");
                  setTestimonial("");
                  setErrorMsg(err.response.data.message);
                  setHiddenFlag(false);
                }
              }
            }}
          >
            Submit Testimonial
          </button>
        </div>
      </div>
    </div>
  );
};
