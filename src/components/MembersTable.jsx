import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MembersTable = ({
  filteredMembers,
  loading,
  deletingMemberId,
  deleteMember,
  setShowEditModal,
  setSelectedMember,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [selectedMemberName, setSelectedMemberName] = useState('');

  // Function to handle delete confirmation
  const handleDeleteClick = (memberId, firstName, middleName, lastName) => {
    const fullName = `${firstName} ${middleName} ${lastName}`;
    setSelectedMemberId(memberId);
    setSelectedMemberName(fullName);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    deleteMember(selectedMemberId);
    setShowConfirmModal(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
  };

  return (
    <div>
      {/* Table for displaying members */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Department</th>
              <th>Graduating Year</th>
              <th>Sex</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <span className="loading loading-spinner loading-xl"></span>
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td>{member.studentId}</td>
                  <td>{`${member.firstName} ${member.middleName} ${member.lastName}`}</td>
                  <td>{member.phoneNumber}</td>
                  <td>{member.email}</td>
                  <td>{member.department}</td>
                  <td>{member.graduatingYear}</td>
                  <td>{member.sex}</td>
                  <td className="flex items-center space-x-2">
                    {/* Edit Button */}
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => {
                        setSelectedMember(member);
                        setShowEditModal(true);
                      }}
                    >
                      <FaEdit className="text-white" />
                    </button>

                    {/* Delete Button */}
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteClick(member.id, member.firstName, member.middleName, member.lastName)} // Pass full name
                      disabled={deletingMemberId === member.id}
                    >
                      {deletingMemberId === member.id ? (
                        <span className="loading loading-spinner loading-sm text-error" />
                      ) : (
                        <FaTrash className="text-white" />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-lg mb-4">Are you sure you want to delete <span className='text-warning'>{selectedMemberName}</span> ?</h2>
            <div className="flex space-x-4">
              <button onClick={handleConfirmDelete} className="btn btn-sm btn-error">
                Yes, Delete
              </button>
              <button onClick={handleCancelDelete} className="btn btn-sm btn-info">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersTable;