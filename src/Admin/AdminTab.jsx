import React, { useEffect, useState } from 'react'
import AdminViewNotice from './AdminViewNotice'
import AdminSidebar from './AdminSidebar';
import axios from "axios";

const AdminTab = () => {

  const [users, setUsers] = useState([]);

  
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user/pending-users");

      setUsers(Array.isArray(res.data?.users) ? res.data.users : []);

    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/api/user/approve-user/${id}`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/user/reject-user/${id}`);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      <AdminSidebar />

     
      <div className="flex-1 mt-24 px-8 py-6 w-full">

        
        <h2 className="text-4xl font-extrabold mb-8 text-gray-800">Pending User Requests</h2>

        {users.length === 0 ? (
          <p className="text-gray-500 text-lg">No pending requests</p>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user._id}
                className="p-4 bg-white border rounded-lg flex justify-between items-center shadow"
              >
                <div>
                  <p className="font-semibold text-black">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    Role: {user.role}
                  </p>

                  
                  {user.role === "student" && user.id_card && (
                    <div className="mt-2">
                      <img
                        src={`http://localhost:8000/${user.id_card.replace(/\\/g, "/")}`}
                        alt="Student ID Card"
                        className="w-40 h-24 object-cover border rounded shadow cursor-pointer"
                        onClick={() => setSelectedImage(user.id_card)}
                      />
                    </div>
                  )}

                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(user._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(user._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >

            
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"></div>

            {/* MODAL BOX */}
            <div
              className="relative bg-white rounded-2xl shadow-2xl p-3 max-w-3xl w-[90%] animate-zoomIn"
              onClick={(e) => e.stopPropagation()}
            >

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-3 -right-3 bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
              >
                ✕
              </button>

              {/* IMAGE */}
              <img
                src={`http://localhost:8000/${selectedImage.replace(/\\/g, "/")}`}
                alt="ID Card Preview"
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />

            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default AdminTab;