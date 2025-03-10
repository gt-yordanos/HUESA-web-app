import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaPlus, FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { AddMember, EditMember } from '../components/AddMemberEditComponents'; // Import the Add and Edit components
import MembersTable from '../components/MembersTable';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // State for loading
  const [deletingMemberId, setDeletingMemberId] = useState(null); // State for deleting member
  const [showAddModal, setShowAddModal] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        const membersRef = collection(db, 'members');
        const snapshot = await getDocs(membersRef);
        const membersList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setMembers(membersList);
        setFilteredMembers(membersList);
      } catch (error) {
        toast.error('Error fetching members');
        console.error('Error fetching members:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchMembers();
  }, []);

  const filterMembers = () => {
    let filtered = members;

    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMembers(filtered);
  };

  useEffect(() => {
    filterMembers();
  }, [searchTerm]);

  const deleteMember = async (id) => {
    setDeletingMemberId(id); // Set the deleting member id
    try {
      await deleteDoc(doc(db, 'members', id));
      setMembers(members.filter((member) => member.id !== id));
      setFilteredMembers(filteredMembers.filter((member) => member.id !== id));
      toast.success('Member deleted!');
    } catch (error) {
      toast.error('Error deleting member');
      console.error('Error deleting member:', error);
    } finally {
      setDeletingMemberId(null); // Reset the deleting member id
    }
  };

  const exportToExcel = () => {
    const dataToExport = filteredMembers.map((member) => ({
      'Student ID': member.studentId,
      FirstName: member.firstName,
      LastName: member.lastName,
      Phone: member.phoneNumber,
      Email: member.email,
      Department: member.department,
      'Graduating Year': member.graduatingYear,
      Sex: member.sex,
      FocusArea: member.focusArea,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Members');
    const fileName = 'members.xlsx';
    const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    const blob = new Blob([s2ab(excelFile)], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  };

  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  };

  return (
    <>
      <div className="sticky z-10 lg:p-4">
        <h3 className="lg:text-4xl text-2xl font-semibold mb-4">Members Management</h3>
        <p className="mb-6">Manage all the student members here.</p>
        <div className="my-4 flex justify-between flex-wrap">
          <button onClick={() => setShowAddModal(true)} className="btn btn-success flex items-center text-white">
            <FaPlus className="mr-2" />
            Add Member
          </button>
          <button onClick={exportToExcel} className="btn btn-primary flex items-center text-white">
            <FaFileExcel className="mr-2" />
            Export to Excel
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-1/3"
          />
        </div>
      </div>

      <MembersTable
        filteredMembers={filteredMembers}
        loading={loading} // Pass loading state
        deletingMemberId={deletingMemberId} // Pass deleting member id
        deleteMember={deleteMember} // Pass delete function
        setShowEditModal={setShowEditModal}
        setSelectedMember={setSelectedMember}
      />

      {showAddModal && <AddMember onClose={() => setShowAddModal(false)} onSubmit={() => setShowAddModal(false)} />}
      {showEditModal && selectedMember && (
        <EditMember member={selectedMember} onClose={() => setShowEditModal(false)} onSubmit={() => setShowEditModal(false)} />
      )}
    </>
  );
};

export default Members;
