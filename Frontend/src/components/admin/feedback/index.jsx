import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../lib/constant";
import { showLocalString } from "../../lib/commonFunctions";
import Pagination from "../../app/Pagination";

const ViewFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    <>
      <div className="py-4 sm:ml-64">
        <div className="mt-10">
          <div className="h-20 flex justify-between items-center mb-2 px-4 bg-blue-100">
            <h3 className="text-2xl font-medium font-serif text-blue-500">
              Feedback Details
            </h3>
          </div>
          <div className="flex justify-center bg-white mx-3 py-4">
            <table className="w-[95%] text-left rounded-lg ">
              <thead className="border-b-[2px] ">
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
    </>
  );
};

export default ViewFeedback;
