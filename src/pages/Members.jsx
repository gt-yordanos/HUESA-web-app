import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaPlus, FaFileExcel } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Members = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      studentId: 'S001',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      department: 'Economics',
      graduatingYear: 2023,
      sex: 'Male',
      focusArea: 'Public Relations',
    },
    {
      id: 2,
      studentId: 'S002',
      firstName: 'Jane',
      lastName: 'Doe',
      phoneNumber: '0987654321',
      email: 'jane.doe@example.com',
      department: 'Management',
      graduatingYear: 2024,
      sex: 'Female',
      focusArea: 'Finance',
    },
  ]);

  const [filteredMembers, setFilteredMembers] = useState(members);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedGraduatingYear, setSelectedGraduatingYear] = useState('');

  const filterMembers = () => {
    let filtered = members;
  
    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    if (selectedDepartment) {
      filtered = filtered.filter(
        (member) => member.department === selectedDepartment
      );
    }
  
    if (selectedGender) {
      filtered = filtered.filter((member) => member.sex === selectedGender);
    }
  
    if (selectedGraduatingYear) {
      filtered = filtered.filter(
        (member) => member.graduatingYear == selectedGraduatingYear
      );
    }
  
    setFilteredMembers(filtered);
  };
  

  // Handle add member
  const addMember = () => {
    // Placeholder for adding member
    toast.success('Member added!');
  };

  // Handle delete member
  const deleteMember = (id) => {
    setMembers(members.filter((member) => member.id !== id));
    toast.success('Member deleted!');
  };

  // Handle edit member
  const editMember = (id) => {
    // Placeholder for editing member
    toast.info('Edit member feature is coming soon!');
  };

  const exportToExcel = () => {
    const dataToExport = filteredMembers.map((member) => ({
      'Student ID': member.studentId,
      Name: `${member.firstName} ${member.lastName}`,
      Phone: member.phoneNumber,
      Email: member.email,
      Department: member.department,
      'Graduating Year': member.graduatingYear,
      Sex: member.sex,
    }));
  
    // Create a worksheet from the data
    const ws = XLSX.utils.json_to_sheet(dataToExport);
  
    // Create a new workbook with the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Members');
  
    // Export the file
    const fileName = 'members.xlsx';
    const excelFile = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  
    // Convert the excel file into a Blob and save it
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
    <div className="lg:p-8">
      <h3 className="text-2xl font-semibold mb-4">Members Management</h3>
      <p className="mb-6">Manage all the student members here.</p>

      <div className="mb-6 flex items-center space-x-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={filterMembers}
          className="input input-bordered w-1/3"
        />

        {/* Department Filter */}
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          onBlur={filterMembers}
          className="select select-bordered w-1/3"
        >
          <option value="">All Departments</option>
          <option value="Economics">Economics</option>
          <option value="Management">Management</option>
          <option value="PADM">PADM</option>
          <option value="Cooperative">Cooperative</option>
        </select>

        {/* Gender Filter */}
        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
          onBlur={filterMembers}
          className="select select-bordered w-1/3"
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* Graduation Year Filter */}
        <select
          value={selectedGraduatingYear}
          onChange={(e) => setSelectedGraduatingYear(e.target.value)}
          onBlur={filterMembers}
          className="select select-bordered w-1/3"
        >
          <option value="">All Graduation Years</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>

      {/* Members Table */}
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
                    onClick={() => editMember(member.id)}
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

      <div className="mt-4 flex justify-between">
        <button
          onClick={addMember}
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
    </div>
  );
};

export default Members;
