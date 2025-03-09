import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const Register = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  // Function to check if email or phone already exists in the database
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
      toast.error(' Already registered with this ID.');
      return true;
    }

    return false; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    setErrorMessages(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true); // Start loading
      const isUserExisting = await checkExistingUser();
      if (!isUserExisting) {
        try {
          // Add form data to Firestore in the 'members' collection
          await addDoc(collection(db, 'members'), formData);

          toast.success('Registration successful!');
          navigate('/');
        } catch (error) {
          toast.error('Error registering. Please try again.');
          console.error('Error adding document: ', error);
        }
      }
      setIsLoading(false);
    } else {
      toast.error('Please fix the errors and try again.');
    }
  };

  const generateGraduatingYears = () => {
    const currentYear = new Date().getFullYear();
    let years = [];
    for (let i = 0; i < 4; i++) {
      years.push(currentYear + i);
    }
    return years;
  };

  return (
    <div className="w-full bg-base-300">
      <div className="sm:max-w-lg max-w-[90%] mx-auto py-20">
        <h2 className="sm:text-4xl text-2xl text-center py-8 font-bold mb-4">Member Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Student ID */}
          <div className="form-control">
            <label className="label" htmlFor="studentId">
              <span className="label-text">Student ID</span>
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Enter Student ID"
            />
            {errorMessages.studentId && <p className="text-error text-sm">{errorMessages.studentId}</p>}
          </div>

          {/* First Name */}
          <div className="form-control">
            <label className="label" htmlFor="firstName">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Enter First Name"
            />
            {errorMessages.firstName && <p className="text-error text-sm">{errorMessages.firstName}</p>}
          </div>

          {/* Middle Name */}
          <div className="form-control">
            <label className="label" htmlFor="middleName">
              <span className="label-text">Middle Name</span>
            </label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Enter Middle Name"
            />
            {errorMessages.middleName && <p className="text-error text-sm">{errorMessages.middleName}</p>}
          </div>

          {/* Last Name */}
          <div className="form-control">
            <label className="label" htmlFor="lastName">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Enter Last Name"
            />
            {errorMessages.lastName && <p className="text-error text-sm">{errorMessages.lastName}</p>}
          </div>

          {/* Phone Number */}
          <div className="form-control">
            <label className="label" htmlFor="phoneNumber">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Enter Phone Number"
            />
            {errorMessages.phoneNumber && <p className="text-error text-sm">{errorMessages.phoneNumber}</p>}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input input-bordered w-full"
              placeholder="Enter Email"
            />
            {errorMessages.email && <p className="text-error text-sm">{errorMessages.email}</p>}
          </div>

          {/* Department */}
          <div className="form-control">
            <label className="label" htmlFor="department">
              <span className="label-text">Department</span>
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Department</option>
              <option value="Economics">Economics</option>
              <option value="Accounting">Accounting</option>
              <option value="Management">Management</option>
              <option value="PADM">PADM</option>
              <option value="Cooperative">Cooperative</option>
            </select>
            {errorMessages.department && <p className="text-error text-sm">{errorMessages.department}</p>}
          </div>

          {/* Graduating Year */}
          <div className="form-control">
            <label className="label" htmlFor="graduatingYear">
              <span className="label-text">Graduating Year</span>
            </label>
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
          </div>

          {/* Sex */}
          <div className="form-control">
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

          {/* Focus Area */}
          <div className="form-control">
            <label className="label" htmlFor="focusArea">
              <span className="label-text">Focus Area</span>
            </label>
            <select
              id="focusArea"
              name="focusArea"
              value={formData.focusArea}
              onChange={handleInputChange}
              className="select select-bordered w-full"
            >
              <option value="">Select Focus Area</option>
              <option value="Public Relations">Public Relations</option>
              <option value="Finance">Finance</option>
              <option value="Academic">Academic</option>
              <option value="Research">Research</option>
              <option value="Membership">Membership</option>
              <option value="Event Planning">Event Planning</option>
              <option value="other">Other</option>
            </select>
            {errorMessages.focusArea && <p className="text-error text-sm">{errorMessages.focusArea}</p>}
          </div>

          <button type="submit" className="btn btn-info w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="spinner-border text-light" role="status">
               <span className="loading loading-spinner loading-md text-info"></span>
              </div>
            ) : (
              'Register'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;