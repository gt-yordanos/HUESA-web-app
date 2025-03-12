import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as htmlToImage from 'html-to-image';

import certificateBg from '../assets/HuesaCerteficateTemplate.png';

const Certificates = () => {
  const [certificateData, setCertificateData] = useState({
    name: '',
    title: 'Certificate of Recognition',
    description: '',
    date: '',
  });
  const [presidentName, setPresidentName] = useState('');
  const [vicePresidentName, setVicePresidentName] = useState('');
  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    name: '',
    date: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const executivesRef = collection(db, 'executives');
        const presidentQuery = query(executivesRef, where('role', '==', 'President'));
        const vicePresidentQuery = query(executivesRef, where('role', '==', 'Vice President'));

        const presidentSnapshot = await getDocs(presidentQuery);
        const vicePresidentSnapshot = await getDocs(vicePresidentQuery);

        if (!presidentSnapshot.empty) {
          setPresidentName(presidentSnapshot.docs[0].data().firstName + " " + presidentSnapshot.docs[0].data().lastName);
        } else {
          toast.error('No President found!');
        }

        if (!vicePresidentSnapshot.empty) {
          setVicePresidentName(vicePresidentSnapshot.docs[0].data().firstName + " " + vicePresidentSnapshot.docs[0].data().lastName);
        } else {
          toast.error('No Vice President found!');
        }
      } catch (error) {
        console.error('Error fetching executives:', error);
        toast.error('Error fetching executives!');
      }
    };
    fetchExecutives();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCertificateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!certificateData.name) errors.name = 'Name is required';
    if (!certificateData.title) errors.title = 'Title is required';
    if (certificateData.title.length > 50) errors.title = 'Title cannot exceed 50 characters';
    if (!certificateData.description) errors.description = 'Description is required';
    if (certificateData.description.length > 200) errors.description = 'Description cannot exceed 200 characters';
    if (!certificateData.date) errors.date = 'Date is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGenerateCertificate = () => {
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowModal(true);
      }, 1000);
    }
  };

  const handleDownloadImage = () => {
    const element = document.getElementById('certificate');
    if (element) {
      htmlToImage
        .toPng(element)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `${certificateData.name || 'certificate'}.png`;
          link.click();
          setShowModal(false);  // Close the modal after download
        })
        .catch((err) => {
          console.error('Oops, something went wrong!', err);
        });
    } else {
      console.error('Certificate element not found');
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold">Generate Certificate</h3>
      <div className="my-4">
        <input
          type="text"
          name="name"
          placeholder="Name of the Certified Person"
          value={certificateData.name}
          onChange={handleInputChange}
          className="input input-bordered w-full mb-4"
        />
        {formErrors.name && <p className="text-error text-xs mb-4">{formErrors.name}</p>}

        <input
          type="text"
          name="title"
          placeholder="Certificate Title"
          value={certificateData.title}
          onChange={handleInputChange}
          className="input input-bordered w-full mb-4"
        />
        {formErrors.title && <p className="text-error text-xs mb-4">{formErrors.title}</p>}

        <textarea
          name="description"
          placeholder="Certificate Description"
          value={certificateData.description}
          onChange={handleInputChange}
          className="textarea textarea-bordered w-full mb-4"
        />
        {formErrors.description && <p className="text-error text-xs mb-4">{formErrors.description}</p>}

        <input
          type="date"
          name="date"
          value={certificateData.date}
          onChange={handleInputChange}
          className="input input-bordered w-full mb-4"
        />
        {formErrors.date && <p className="text-error text-xs mb-4">{formErrors.date}</p>}
      </div>

      <button
        onClick={handleGenerateCertificate}
        className="btn btn-primary mt-4"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-xl"></span>
        ) : (
          'Generate Certificate'
        )}
      </button>

      <div className={`modal ${showModal ? 'modal-open' : ''}`}>
        <div className="p-10 bg-base-100 rounded">
          <div
            id="certificate"
            className="border p-8 relative"
            style={{
              width: '600px',
              height: '400px',
              backgroundImage: `url(${certificateBg})`,
              backgroundSize: 'cover',
            }}
          >
            <div className="text-2xl font-bold text-black absolute top-34 w-full left-0 right-0 text-center">
              <h2>{certificateData.title}</h2>
            </div>

            <div className="text-2xl font-bold text-black absolute top-50 left-0 right-0 text-center w-full">
              <p className="text-xl">{certificateData.name}</p>
            </div>
            <div className="text-black absolute top-59 left-0 right-0 text-center w-full px-[10%] text-wrap">
              <div className='flex justify-center items-center'>
              <p className="text-xs opacity-65 mx-auto text-justify">{certificateData.description}</p>
              </div>
            </div>
            <div className="text-black absolute top-92 left-0 right-0 text-center w-full">
              <p className="text-xs opacity-50">Given: {new Date(certificateData.date).toLocaleDateString()}</p>
            </div>

            <div className="text-black absolute top-82 left-0 right-0 text-center w-full px-[10%]">
              <div className="flex justify-evenly gap-35">
                <p className="text-xs opacity-90 text-justify">{presidentName}</p>
                <p className="text-xs opacity-90 text-justify">{vicePresidentName}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              onClick={handleDownloadImage}
              className="btn btn-primary mt-4"
            >
              Download as Image (PNG)
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="btn btn-base-300 mt-4 ml-2 right-0"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;