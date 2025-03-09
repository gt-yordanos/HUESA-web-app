import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaPlus, FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { AddMember, EditMember } from '../components/AddMemberEditComponents'; // Import the Add and Edit components

const Members = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedGraduatingYear, setSelectedGraduatingYear] = useState('');
  const [selectedFocusArea, setSelectedFocusArea] = useState('');
  const [showAddModal, setShowAddModal] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const membersRef = collection(db, 'members');
      const snapshot = await getDocs(membersRef);
      const membersList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMembers(membersList);
      setFilteredMembers(membersList);
    };
    fetchMembers();
  }, []);

  // Graduation status calculation based on the current year
  const getGraduationStatus = (graduatingYear) => {
    const currentYear = new Date().getFullYear();
    if (graduatingYear < currentYear) return 'Graduated';
    if (graduatingYear >= currentYear) return 'Non-Graduated';
    const diff = graduatingYear - currentYear;
    if (diff === 0) return '4th Year';
    if (diff === 1) return '3rd Year';
    if (diff === 2) return '2nd Year';
    if (diff === 3) return '1st Year';
    return 'Non-Graduated';
  };

  // Filter members based on selected filters
  const filterMembers = () => {
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
      filtered = filtered.filter(
        (member) => getGraduationStatus(member.graduatingYear) === selectedGraduatingYear
      );
    }  

    setFilteredMembers(filtered);
  };

  // Trigger filter whenever any filter changes
  useEffect(() => {
    filterMembers();
  }, [searchTerm, selectedDepartment, selectedGender, selectedGraduatingYear, selectedFocusArea]);

  const deleteMember = async (id) => {
    try {
      await deleteDoc(doc(db, 'members', id));
      setMembers(members.filter((member) => member.id !== id));
      setFilteredMembers(filteredMembers.filter((member) => member.id !== id));
      toast.success('Member deleted!');
    } catch (error) {
      toast.error('Error deleting member');
      console.error('Error deleting member:', error);
    }
  };

  const exportToExcel = () => {
    const dataToExport = filteredMembers.map((member) => ({
      'Student ID': member.studentId,
      FisrtName: member.firstName,
      MiddleName: member.middleName,
      LastName: member.lastName,
      Phone: member.phoneNumber,
      Email: member.email,
      Department: member.department,
      'Graduating Year': member.graduatingYear,
      Sex: member.sex,
      'Focus Area' : member.focusArea,
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
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-success flex items-center text-white"
        >
          <FaPlus className="mr-2" />
          Add Member
        </button>

        <button
          onClick={exportToExcel}
          className="btn btn-primary flex items-center text-white"
        >
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
          <option value="">All Graduation Years</option>
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
          <tbody className='overflow-y-auto'>
            {filteredMembers.map((member) => (
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
                  >
                    <FaTrash className="text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Show Add Member Modal */}
      {showAddModal && <AddMember onClose={() => setShowAddModal(false)} onSubmit={() => setShowAddModal(false)} />}

      {/* Show Edit Member Modal */}
      {showEditModal && selectedMember && (
        <EditMember member={selectedMember} onClose={() => setShowEditModal(false)} onSubmit={() => setShowEditModal(false)} />
      )}
    </>
  );
};

export default Members;