import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewFeedback = () => {
  const [feedback, setFeedback] = useState([]);

  const getFeedback = async () => {
    const response = await axios.get("http://localhost:3001/feedbacks");
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
                  <th className=" px-3 py-4">Fullname</th>
                  <th className=" px-3 py-4">Email</th>
                  <th className=" px-3 py-4">Mobile</th>
                  <th className="px-3 py-4">Password</th>
                </tr>
              </thead>

              <tbody>
                {feedback.map((curVal) => {
                  return (
                    <tr
                      key={curVal.user_id}
                      className="border-b-[1px] text-gray-500"
                    >
                      <td className="px-3 py-3">{curVal.user_id}</td>
                      <td className="px-3 py-3">{curVal.username}</td>
                      <td className="px-3 py-3">{curVal.fullname}</td>
                      <td className="px-3 py-3">{curVal.email}</td>
                      <td className="px-3 py-3">{curVal.mobile}</td>
                      <td className="px-3 py-3">{curVal.password}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewFeedback;
