import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs } from 'firebase/firestore';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import convertDriveThumbnailUrl from '../Algorithms/convertDriveThumbnailUrl';

const ManageExecutives = () => {
  const [executives, setExecutives] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    linkedin: '',
    role: '',
    profilePic: '',
  });
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    email: '',
    linkedin: '',
    profilePic: '',
  });
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [executivesLoading, setExecutivesLoading] = useState(true);

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    const linkedInRegex = /^(https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?)$/;
    const googleDriveRegex = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view/;

    if (!formData.firstName) errors.firstName = 'First Name is required';
    if (!formData.lastName) errors.lastName = 'Last Name is required';
    if (!formData.middleName) errors.middleName = 'Middle Name is required';
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is not valid';

    if (formData.linkedin && !linkedInRegex.test(formData.linkedin)) {
      errors.linkedin = 'LinkedIn URL must be a valid LinkedIn profile link';
    }

    if (formData.profilePic && !googleDriveRegex.test(formData.profilePic)) {
      errors.profilePic = 'Google Drive URL must be a valid file URL';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Fetch executives from Firestore
  const fetchExecutives = async () => {
    setExecutivesLoading(true);
    const querySnapshot = await getDocs(collection(db, 'executives'));
    const execs = [];
    querySnapshot.forEach((doc) => {
      execs.push({ id: doc.id, ...doc.data() });
    });
    setExecutives(execs);
    setExecutivesLoading(false);
  };

  useEffect(() => {
    fetchExecutives();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add new executive member or update an existing one
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const updatedFormData = { ...formData };

      if (editing) {
        // Update the executive document
        await updateDoc(doc(db, 'executives', editId), updatedFormData);
        toast.success('Executive updated successfully!');
      } else {
        // Add new executive to Firestore
        await addDoc(collection(db, 'executives'), updatedFormData);
        toast.success('Executive added successfully!');
      }

      // Reset form and close modal
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        linkedin: '',
        role: '',
        profilePic: '',
      });

      setEditing(false);
      setIsModalOpen(false);
      fetchExecutives();
    } catch (error) {
      toast.error(`Error saving executive: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Edit existing executive
  const handleEdit = (id) => {
    const executive = executives.find((exec) => exec.id === id);
    setFormData({
      firstName: executive.firstName,
      middleName: executive.middleName,
      lastName: executive.lastName,
      email: executive.email,
      linkedin: executive.linkedin,
      role: executive.role,
      profilePic: executive.profilePic,
    });
    setEditId(id);
    setEditing(true);
    setIsModalOpen(true);
  };

  // Delete executive
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this executive?')) {
      await deleteDoc(doc(db, 'executives', id));
      fetchExecutives();
      toast.success('Executive deleted successfully!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Heading */}
      <h1 className="text-2xl font-semibold mb-4">{editing ? 'Edit Executive' : 'Manage Executives'}</h1>

      {/* Add Executive Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-primary mb-4 flex items-center gap-2"
      >
        <FaPlus /> Add Executive
      </button>

      {/* Executives List */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Existing Executives</h2>
        {executivesLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <ul className="space-y-4">
            {executives.map((executive) => (
              <li key={executive.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <img
                    src={convertDriveThumbnailUrl(executive.profilePic) || 'https://via.placeholder.com/150'}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{executive.firstName} {executive.lastName}</h3>
                    <p>{executive.role}</p>
                    <p className="text-sm">{executive.email}</p>
                    <a href={executive.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(executive.id)} className="btn btn-warning btn-sm">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(executive.id)} className="btn btn-error btn-sm">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal for adding/editing executive */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-10">
          <div className="modal modal-open">
            <div className="modal-box w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit Executive' : 'Add Executive'}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="input input-bordered w-full mb-2"
                />
                {formErrors.firstName && <p className="text-error text-xs">{formErrors.firstName}</p>}

                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                  placeholder="Middle Name"
                  className="input input-bordered w-full mb-2"
                />
                {formErrors.middleName && <p className="text-error text-xs">{formErrors.middleName}</p>}

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="input input-bordered w-full mb-2"
                />
                {formErrors.lastName && <p className="text-error text-xs">{formErrors.lastName}</p>}

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="input input-bordered w-full mb-2"
                />
                {formErrors.email && <p className="text-error text-xs">{formErrors.email}</p>}

                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn Profile"
                  className="input input-bordered w-full mb-2"
                />
                {formErrors.linkedin && <p className="text-error text-xs">{formErrors.linkedin}</p>}

                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Role"
                  className="input input-bordered w-full mb-2"
                />

                <input
                  type="text"
                  name="profilePic"
                  value={formData.profilePic}
                  onChange={handleChange}
                  placeholder="Google Drive Image URL"
                  className="input input-bordered w-full mb-2"
                />
                {formErrors.profilePic && <p className="text-eror text-xs">{formErrors.profilePic}</p>}

                <div className="modal-action">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-ghost">Cancel</button>
                  <button type="submit" className="btn btn-primary">
                    {loading ? <span className="loading loading-spinner loading-lg"></span> : (editing ? 'Update Executive' : 'Add Executive')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageExecutives;