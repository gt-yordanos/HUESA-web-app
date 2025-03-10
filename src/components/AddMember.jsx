import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const generateGraduatingYears = () => {
  const currentYear = new Date().getFullYear();
  let years = [];
  for (let i = 0; i < 4; i++) {
    years.push(currentYear + i);
  }
  return years;
};

const AddMember = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    department: '',
    graduatingYear: '',
    sex: '',
    focusArea: ''
  });

  const [errorMessages, setErrorMessages] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.studentId) errors.studentId = 'Student ID is required.';
    if (!formData.firstName) errors.firstName = 'First name is required.';
    if (!formData.middleName) errors.middleName = 'Middle name is required.';
    if (!formData.lastName) errors.lastName = 'Last name is required.';
    if (!formData.phoneNumber) errors.phoneNumber = 'Phone number is required.';
    if (!formData.email) errors.email = 'Email is required.';
    if (!formData.department) errors.department = 'Department is required.';
    if (!formData.graduatingYear) errors.graduatingYear = 'Graduating year is required.';
    if (!formData.sex) errors.sex = 'Sex is required.';
    if (!formData.focusArea) errors.focusArea = 'Focus area is required.';
    return errors;
  };

  // Function to check if email, phone, or student ID already exists in the database
  const checkExistingUser = async () => {
    const membersRef = collection(db, 'members');
    const emailQuery = query(membersRef, where('email', '==', formData.email));
    const phoneQuery = query(membersRef, where('phoneNumber', '==', formData.phoneNumber));
    const idQuery = query(membersRef, where('studentId', '==', formData.studentId));

    const emailSnapshot = await getDocs(emailQuery);
    const phoneSnapshot = await getDocs(phoneQuery);
    const idSnapshot = await getDocs(idQuery);

    if (!emailSnapshot.empty) {
      toast.error('Already registered with this email.');
      return true;
    }
    if (!phoneSnapshot.empty) {
      toast.error('Already registered with this phone number.');
      return true;
    }
    if (!idSnapshot.empty) {
      toast.error('Already registered with this ID.');
      return true;
    }

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setErrorMessages(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true); // Start the loading spinner before checking if the user exists

      const userExists = await checkExistingUser();
      if (userExists) {
        setLoading(false); // Stop the spinner if the user already exists
        return;
      }

      try {
        await addDoc(collection(db, 'members'), formData);
        toast.success('Member added!');
        onSubmit();  // Notify parent to refresh the list
        onClose();   // Close the modal
      } catch (error) {
        toast.error('Error adding member!');
        console.error('Error adding member: ', error);
      } finally {
        setLoading(false); // Ensure the spinner stops once the process is finished
      }
    } else {
      toast.error('Please fix the errors and try again.');
    }
};


  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-2xl mb-4">Add Member</h2>
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <input
            name="studentId"
            value={formData.studentId}
            onChange={handleInputChange}
            placeholder="Student ID"
            className="input input-bordered w-full mb-2"
          />
          {errorMessages.studentId && <p className="text-error text-sm">{errorMessages.studentId}</p>}

          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            className="input input-bordered w-full mb-2"
          />
          {errorMessages.firstName && <p className="text-error text-sm">{errorMessages.firstName}</p>}

          <input
            name="middleName"
            value={formData.middleName}
            onChange={handleInputChange}
            placeholder="Middle Name"
            className="input input-bordered w-full mb-2"
          />
          {errorMessages.middleName && <p className="text-error text-sm">{errorMessages.middleName}</p>}

          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="input input-bordered w-full mb-2"
          />
          {errorMessages.lastName && <p className="text-error text-sm">{errorMessages.lastName}</p>}

          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="input input-bordered w-full mb-2"
          />
          {errorMessages.phoneNumber && <p className="text-error text-sm">{errorMessages.phoneNumber}</p>}

          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="input input-bordered w-full mb-2"
          />
          {errorMessages.email && <p className="text-error text-sm">{errorMessages.email}</p>}

          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="select select-bordered w-full mb-2"
          >
            <option value="">Select Department</option>
            <option value="Economics">Economics</option>
            <option value="Accounting">Accounting</option>
            <option value="Management">Management</option>
            <option value="PADM">PADM</option>
            <option value="Cooperative">Cooperative</option>
          </select>
          {errorMessages.department && <p className="text-error text-sm">{errorMessages.department}</p>}

          <select
            id="graduatingYear"
            name="graduatingYear"
            value={formData.graduatingYear}
            onChange={handleInputChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Graduating Year</option>
            {generateGraduatingYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errorMessages.graduatingYear && <p className="text-error text-sm">{errorMessages.graduatingYear}</p>}

          <div className="form-control mb-2">
            <label className="label">Sex</label>
            <div className="flex space-x-4">
              <label className="cursor-pointer flex items-center">
                <input
                  type="radio"
                  name="sex"
                  value="Male"
                  onChange={handleInputChange}
                  className="radio"
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="cursor-pointer flex items-center">
                <input
                  type="radio"
                  name="sex"
                  value="Female"
                  onChange={handleInputChange}
                  className="radio"
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
            {errorMessages.sex && <p className="text-error text-sm">{errorMessages.sex}</p>}
          </div>

          <select
            name="focusArea"
            value={formData.focusArea}
            onChange={handleInputChange}
            className="select select-bordered w-full mb-2"
          >
            <option value="">Select Focus Area</option>
            <option value="Public Relations">Public Relations</option>
            <option value="Finance">Finance</option>
            <option value="Academic">Academic</option>
            <option value="Research">Research</option>
            <option value="Membership">Membership</option>
            <option value="Event Planning">Event Planning</option>
            <option value="Other">Other</option>
          </select>
          {errorMessages.focusArea && <p className="text-error text-sm">{errorMessages.focusArea}</p>}

          <button 
  type="submit" 
  className={`btn w-full text-white ${loading ? "btn-disabled" : "btn-info"}`} 
  disabled={loading} // Disables the button when loading is true
>
  {loading ? (
    <span className="loading loading-spinner text-white"></span> // Ensure the spinner appears
  ) : (
    'Add Member' // Text displayed when not loading
  )}
</button>

        </form>

        <div className="modal-action">
          <button onClick={onClose} className="btn">Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddMember;