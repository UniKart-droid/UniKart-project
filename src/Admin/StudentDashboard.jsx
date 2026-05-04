import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import Footer from "../component/Footer";
import axios from "axios";

const StudentDashboard = () => {
  const [students, setStudents] = useState([]);

  //  ID CARD MODAL STATE
  const [selectedCard, setSelectedCard] = useState(null);

  //  Fetch approved students
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user/approved-students");
      
      setStudents(Array.isArray(res.data.students) ? res.data.students : []);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]); // safety fallback
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this student?");

    if (confirmDelete) {
      try {
        await axios.patch(`http://localhost:8000/api/user/reject-user/${id}`);
        // update UI instantly
        setStudents(students.filter((student) => student._id !== id));
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex flex-1 flex-col md:flex-row">
        <AdminSidebar />

        <div className="flex-1 mt-20 p-4 md:p-8 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
            Student Dashboard
          </h2>

          {/* DESKTOP TABLE - Matching TeacherDashboard Styling */}
          <div className="hidden md:block bg-white rounded-3xl shadow-lg overflow-x-auto border border-gray-100">
            <table className="w-full text-left min-w-full">
              <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wide">
                <tr>
                  <th className="p-5">Name</th>
                  <th className="p-5">Email</th>
                  <th className="p-5">ID Card</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr
                    key={student._id}
                    className="border-t hover:bg-gray-50 transition duration-200"
                  >
                    <td className="p-5 font-semibold text-gray-800">
                      {student.name}
                    </td>
                    <td className="p-5 text-gray-600">{student.email}</td>

                    {/*  ID CARD BUTTON */}
                    <td className="p-5">
                      {student.id_card ? (
                        <button
                          onClick={() => setSelectedCard(student.id_card)}
                          className="px-4 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                        >
                          View ID Card
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">No ID Card</span>
                      )}
                    </td>

                    <td className="p-5 flex justify-center gap-3">
                      <button className="px-4 py-1.5 text-sm bg-orange-500 text-white rounded-lg">
                        View
                      </button>
                      <button className="px-4 py-1.5 text-sm border border-blue-400 text-blue-500 rounded-lg">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="px-4 py-1.5 text-sm border border-red-400 text-red-500 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE VIEW - Matching TeacherDashboard Styling */}
          <div className="md:hidden flex flex-col gap-4">
            {students.map((student) => (
              <div
                key={student._id}
                className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
              >
                <h3 className="font-semibold text-lg text-gray-800">
                  {student.name}
                </h3>
                <p className="text-gray-600 text-sm">{student.email}</p>

                {/*  ID CARD BUTTON */}
                <div className="mt-2">
                  {student.id_card ? (
                    <button
                      onClick={() => setSelectedCard(student.id_card)}
                      className="px-3 py-1 text-sm bg-purple-600 text-white rounded"
                    >
                      View ID Card
                    </button>
                  ) : (
                    <span className="text-gray-400 text-xs italic">No ID Card</span>
                  )}
                </div>

                <div className="flex gap-2 mt-3 flex-wrap">
                  <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded">
                    View
                  </button>
                  <button className="px-3 py-1 text-sm border border-blue-400 text-blue-500 rounded">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student._id)}
                    className="px-3 py-1 text-sm border border-red-400 text-red-500 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/*  ID CARD MODAL */}
          {selectedCard && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedCard(null)}
            >
              <div
                className="bg-white p-4 rounded-3xl shadow-2xl max-w-2xl w-[90%]"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={`http://localhost:8000/${selectedCard.replace(/\\/g, "/")}`}
                  alt="ID Card"
                  className="w-full max-h-[70vh] object-contain rounded-xl"
                />

                <button
                  onClick={() => setSelectedCard(null)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl w-full font-semibold hover:bg-red-700 transition"
                >
                  Close Preview
                </button>
              </div>
            </div>
          )}

          {students.length === 0 && (
            <p className="text-gray-500 mt-6 text-center">
              No approved students available.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentDashboard;