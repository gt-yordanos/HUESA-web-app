import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MembersTable = ({ filteredMembers, loading, deletingMemberId, deleteMember, setShowEditModal, setSelectedMember }) => {
  return (
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
                <span className="loading loading-spinner loading-xl"></span> {/* Spinner in tbody */}
              </td>
            </tr>
          ) : (
            filteredMembers.map((member) => (
              <tr key={member.id}>
                <td>{member.studentId}</td>
                <td>{`${member.firstName} ${member.lastName}`}</td>
                <td>{member.phoneNumber}</td>
                <td>{member.email}</td>
                <td>{member.department}</td>
                <td>{member.graduatingYear}</td>
                <td>{member.sex}</td>
                <td className="flex items-center space-x-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => {
                      setSelectedMember(member);
                      setShowEditModal(true);
                    }}
                  >
                    <FaEdit className="text-white" />
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => deleteMember(member.id)}
                    disabled={deletingMemberId === member.id} // Disable button if deleting
                  >
                    {deletingMemberId === member.id ? (
                      <span className="loading loading-spinner loading-sm text-error" /> // Spinner for delete button
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
  );
};

export default MembersTable;