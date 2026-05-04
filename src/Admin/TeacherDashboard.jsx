import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import Footer from "../component/Footer";
import axios from "axios";

const TeacherDashboard = () => {

  const [teachers, setTeachers] = useState([]);

  //  Fetch approved teachers
  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user/approved-teachers");

     
      setTeachers(Array.isArray(res.data.teachers) ? res.data.teachers : []);

    } catch (error) {
      console.error("Error fetching teachers:", error);
      setTeachers([]); // safety fallback
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

 
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure to delete this teacher?");

    if (confirmDelete) {
      try {
        await axios.patch(`http://localhost:8000/api/user/reject-user/${id}`);

        
        setTeachers(teachers.filter((teacher) => teacher._id !== id));
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      <div className="flex flex-1 flex-col md:flex-row">
        <AdminSidebar />

        <div className="flex-1 mt-20 p-4 md:p-8 w-full">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">
            Teacher Dashboard
          </h2>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block bg-white rounded-3xl shadow-lg overflow-x-auto border border-gray-100">
            <table className="w-full text-left min-w-full">

              <thead className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wide">
                <tr>
                  <th className="p-5">Name</th>
                  <th className="p-5">Email</th>
                  <th className="p-5">ID Number</th> 
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(teachers) && teachers.map((teacher) => (
                  <tr
                    key={teacher._id}
                    className="border-t hover:bg-gray-50 transition duration-200"
                  >
                    <td className="p-5 font-semibold text-gray-800">
                      {teacher.name}
                    </td>

                    <td className="p-5 text-gray-600">
                      {teacher.email}
                    </td>

                    {/*  ID Number column */}
                    <td className="p-5 font-mono text-sm text-orange-600 font-bold">
                      {teacher.teacherId || teacher._id.slice(-6).toUpperCase()}
                    </td>

                    <td className="p-5 flex justify-center gap-3">
                      <button className="px-4 py-1.5 text-sm bg-orange-500 text-white rounded-lg">
                        View
                      </button>

                      <button className="px-4 py-1.5 text-sm border border-blue-400 text-blue-500 rounded-lg">
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(teacher._id)}
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

          {/* MOBILE VIEW */}
          <div className="md:hidden flex flex-col gap-4">
            {Array.isArray(teachers) && teachers.map((teacher) => (
              <div
                key={teacher._id}
                className="bg-white p-5 rounded-xl shadow-md border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {teacher.name}
                  </h3>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded font-bold">
                    ID: {teacher.teacherId || teacher._id.slice(-6).toUpperCase()}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mt-1">
                  {teacher.email}
                </p>

                <div className="flex gap-2 mt-4 flex-wrap">
                  <button className="flex-1 px-3 py-1.5 bg-orange-500 text-white rounded-lg text-sm">
                    View
                  </button>

                  <button className="flex-1 px-3 py-1.5 border border-blue-400 text-blue-500 rounded-lg text-sm">
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(teacher._id)}
                    className="flex-1 px-3 py-1.5 border border-red-400 text-red-500 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {(!Array.isArray(teachers) || teachers.length === 0) && (
            <p className="text-gray-500 mt-6 text-center">
              No approved teachers available.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TeacherDashboard;