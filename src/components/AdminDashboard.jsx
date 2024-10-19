"use client";
import { useState, useEffect } from 'react';
import AllUsers from '@/app/actions/getAllUsers';
import deleteUser from '@/app/actions/deleteUser';
import updateUserRole from '@/app/actions/editUser';
import { toast, Toaster } from 'react-hot-toast';
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

function AdminDashboard() {
  const [allUsers, setAllUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await AllUsers();
      setAllUsers(users);
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    const response = await deleteUser(userId);
    if (response.success) {
      setAllUsers(allUsers.filter(user => user.id !== userId));
      toast.success("Deleted successfully");
    } else {
      toast.error("Error deleting user");
    }
  };

  const handleSaveRole = async () => {
    if (!newRole) {
      toast.error("Please select a role");
      return;
    }
    const response = await updateUserRole({ editingUserId, newRole });
    if (response.error) {
      toast.error("Error updating role");
    } else {
      toast.success("Role updated successfully");
      setIsModalOpen(false);
      setNewRole('');
    }
  };

  const openEditModal = (userId, role) => {
    setEditingUserId(userId);
    setNewRole(role);
    setIsModalOpen(true);
  };

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-3">
      <div className="w-full flex flex-col md:flex-row justify-between my-2 md:my-4 items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full max-w-md"
        />
      </div>

      <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Role</th>
            <th className="border px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <MdOutlineDelete
                  className="h-6 w-6 cursor-pointer text-red-500 inline mr-2"
                  onClick={() => handleDeleteUser(user.id)}
                />
                <FaRegEdit
                  className="h-6 w-6 cursor-pointer text-blue-500 inline"
                  onClick={() => openEditModal(user.id, user.role)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-lg font-semibold mb-4">Edit User Role</h2>
            <label className="block mb-2">Select New Role:</label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="border px-4 py-2 mb-4 w-full"
            >
              <option value="">Select role</option>
              <option value="ADMIN">ADMIN</option>
              <option value="DOCTOR">DOCTOR</option>
              <option value="PATIENT">PATIENT</option>
            </select>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSaveRole}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster position="top-center" />
    </div>
  );
}

export default AdminDashboard;
