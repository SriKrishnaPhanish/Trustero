import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TestimonialSection = () => {
  const JWT_TOKEN = localStorage.getItem("JWT_TOKEN");
  const navigate = useNavigate();
  const [DataTable, SetDataTable] = useState([]);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_API + "api/v1/company/testimonials",
          {
            headers: {
              authorization: `Bearer ${JWT_TOKEN}`,
            },
          }
        );
        SetDataTable(response.data.testimonials);
      };
      fetchData();
    } catch (err) {
      if (err.response && err.response.status == 403) {
        navigate("/");
      }
    }
  }, [navigate]);

  return (
    <div className="m-5">
      <div className="font-TitleFont text-5xl font-extrabold text-center mb-5">
        Testimonials
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="w-16 px-4 py-2 text-left font-bold border">
                S.No
              </th>
              <th className="w-52 px-4 py-2 text-left font-bold border">
                Full Name
              </th>
              <th className="w-24 px-4 py-2 text-left font-bold border">
                Rating
              </th>
              <th className="px-4 py-2 text-left font-bold border">
                Testimonial
              </th>
            </tr>
          </thead>
          <tbody>
            {DataTable &&
              DataTable.map((item, index) => {
                return (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="w-16 px-4 py-2 border">{index + 1}</td>
                    <td className="w-52 px-4 py-2 border">{item.fullName}</td>
                    <td className="w-24 px-4 py-2 border">{item.rating}</td>
                    <td className="px-4 py-2 border">{item.testimonial}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
