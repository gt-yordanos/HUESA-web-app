import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaPlus, FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import AddMember from '../components/AddMember';
import EditMember from '../components/EditMember';
import MembersTable from '../components/MembersTable';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [deletingMemberId, setDeletingMemberId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedGraduatingYear, setSelectedGraduatingYear] = useState('');
  const [selectedFocusArea, setSelectedFocusArea] = useState('');

  // Function to fetch the members from Firestore
  const fetchMembers = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  // UseEffect hook to fetch the members on initial load
  useEffect(() => {
    fetchMembers();
  }, []);

  const filterMembers = () => {
    const currentYear = new Date().getFullYear(); // Get the current year
    let filtered = members;

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply department filter
    if (selectedDepartment) {
      filtered = filtered.filter((member) => member.department === selectedDepartment);
    }

    // Apply gender filter
    if (selectedGender) {
      filtered = filtered.filter((member) => member.sex === selectedGender);
    }

    // Apply focus area filter
    if (selectedFocusArea) {
      filtered = filtered.filter((member) => member.focusArea === selectedFocusArea);
    }

    // Apply graduating year filter
    if (selectedGraduatingYear && selectedGraduatingYear !== 'All') {
      filtered = filtered.filter((member) => {
        const graduatingYear = Number(member.graduatingYear);  // Convert to number

        // Graduated: Filter members who graduated (graduatingYear < currentYear)
        if (selectedGraduatingYear === "Graduated" && graduatingYear < currentYear) {
          return true;
        }

        // Non-Graduated: Filter members who have not graduated (graduatingYear >= currentYear)
        if (selectedGraduatingYear === "Non-Graduated" && graduatingYear >= currentYear) {
          return true;
        }

        // 1st Year: Filter members in their 1st year (graduatingYear - currentYear === 3)
        if (selectedGraduatingYear === "1st Year" && graduatingYear - currentYear === 3) {
          return true;
        }

        // 2nd Year: Filter members in their 2nd year (graduatingYear - currentYear === 2)
        if (selectedGraduatingYear === "2nd Year" && graduatingYear - currentYear === 2) {
          return true;
        }

        // 3rd Year: Filter members in their 3rd year (graduatingYear - currentYear === 1)
        if (selectedGraduatingYear === "3rd Year" && graduatingYear - currentYear === 1) {
          return true;
        }

        // 4th Year: Filter members in their 4th year (graduatingYear === currentYear)
        if (selectedGraduatingYear === "4th Year" && graduatingYear === currentYear) {
          return true;
        }

        return false;  // No match
      });
    }

    setFilteredMembers(filtered);
  };

  // Trigger filter whenever any filter changes
  useEffect(() => {
    filterMembers();
  }, [searchTerm, selectedDepartment, selectedGender, selectedGraduatingYear, selectedFocusArea]);

  // Function to delete a member from Firestore
  const deleteMember = async (id) => {
    setDeletingMemberId(id); 
    try {
      await deleteDoc(doc(db, 'members', id));
      setMembers(members.filter((member) => member.id !== id));
      setFilteredMembers(filteredMembers.filter((member) => member.id !== id));
      toast.success('Member deleted!');
    } catch (error) {
      toast.error('Error deleting member');
      console.error('Error deleting member:', error);
    } finally {
      setDeletingMemberId(null); 
    }
  };

  // Export filtered members to Excel
  const exportToExcel = () => {
    if(filteredMembers.length === 0) {
      toast.error('No data to export!');
      return;
    }
    else{
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
  
    // Helper function to convert string to ArrayBuffer for Excel export
    const s2ab = (s) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
      }
      toast.success('Data exported successfully!');
      return buf;
    }
    
  };

  // Handle successful member add or update
  const handleMemberSubmit = () => {
    fetchMembers();
  };

  return (
    <>
      <div className="sticky top-2 z-10 lg:p-4 bg-base-100">
        <h3 className="lg:text-4xl text-2xl font-semibold mb-4">Members Management</h3>
        <p className="mb-6">Manage all the student members here.</p>
        <div className="my-4 flex justify-between flex-wrap">
          <button onClick={() => setShowAddModal(true)} className="btn btn-success flex items-center text-black">
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
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="select select-bordered w-1/3"
          >
            <option value="">All Departments</option>
            <option value="Economics">Economics</option>
            <option value="Management">Management</option>
            <option value="PADM">PADM</option>
            <option value="Accounting">Accounting</option>
            <option value="Cooperative">Cooperative</option>
          </select>
          <select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="select select-bordered w-1/3"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select
            value={selectedGraduatingYear}
            onChange={(e) => setSelectedGraduatingYear(e.target.value)}
            className="select select-bordered w-1/3"
          >
            <option value="All">All</option>
            <option value="Graduated">Graduated</option>
            <option value="Non-Graduated">Non-Graduated</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
          <select
            value={selectedFocusArea}
            onChange={(e) => setSelectedFocusArea(e.target.value)}
            className="select select-bordered w-1/3"
          >
            <option value="">All Focus Area</option>
            <option value="Public Relations">Public Relations</option>
            <option value="Finance">Finance</option>
            <option value="Academic">Academic</option>
            <option value="Research">Research</option>
            <option value="Membership">Membership</option>
            <option value="Event Planning">Event Planning</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <MembersTable
        filteredMembers={filteredMembers}
        loading={loading}
        deletingMemberId={deletingMemberId}
        deleteMember={deleteMember}
        setShowEditModal={setShowEditModal}
        setSelectedMember={setSelectedMember}
      />

      {showAddModal && <AddMember onClose={() => setShowAddModal(false)} onSubmit={handleMemberSubmit} />}
      {showEditModal && selectedMember && (
        <EditMember member={selectedMember} onClose={() => setShowEditModal(false)} onSubmit={handleMemberSubmit} />
      )}
    </>
  );
};

export default Members;