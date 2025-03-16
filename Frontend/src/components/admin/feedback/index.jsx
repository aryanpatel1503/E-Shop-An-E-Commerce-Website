import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../lib/constant";
import { showLocalString } from "../../lib/commonFunctions";
import Pagination from "../../app/Pagination";
import AdminLayout from "../AdminLayout";

const ViewFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const feedbackData = feedback?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getFeedback = async () => {
    const response = await axios.get(`${API_URL}/feedback`);
    setFeedback(response.data);
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <AdminLayout title="Feedback Details">
      <div className="bg-white py-4 flex flex-col items-center">
        <div className="overflow-x-auto h-[80%] w-[98%]">
          <table className="text-left rounded-lg w-full">
            <thead className="border-b-[2px]">
              <tr className="">
                <th className=" px-3 py-4">ID</th>
                <th className=" px-3 py-4">Username</th>
                <th className=" px-3 py-4">Feedback</th>
                <th className=" px-3 py-4">Feedback Date</th>
                <th className=" px-3 py-4">Product</th>
              </tr>
            </thead>

            <tbody>
              {feedbackData.map((item) => {
                return (
                  <tr
                    key={item.feedback_id}
                    className="border-b-[1px] text-gray-500"
                  >
                    <td className="px-3 py-3">{item.feedback_id}</td>
                    <td className="px-3 py-3">{item.user_name}</td>
                    <td className="px-3 py-3">{item.feedback}</td>
                    <td className="px-3 py-3">
                      {showLocalString(item.feedback_date)}
                    </td>
                    <td className="px-3 py-3">{item.product_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mb-14 flex justify-end w-[98%]">
          <Pagination
            data={feedback}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            alignRight={true}
            buttonName={false}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewFeedback;
