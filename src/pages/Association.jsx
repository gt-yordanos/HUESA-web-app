import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Firebase import
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { FaEnvelope, FaLinkedinIn, FaInstagram, FaPhoneAlt, FaBuilding, FaLightbulb, FaBullhorn, FaEdit, FaSave, FaFacebookF, FaTelegramPlane, FaClock, FaCalendarAlt } from 'react-icons/fa'; // Added new icons
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { useTheme } from '../contexts/ThemeContext'; // Import the theme context

const Association = () => {
  const { theme } = useTheme(); // Access current theme
  const [contact, setContact] = useState({});
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState("");
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingVision, setIsEditingVision] = useState(false);
  const [isEditingMission, setIsEditingMission] = useState(false);
  
  // Loading states for individual sections
  const [loadingContact, setLoadingContact] = useState(true);
  const [loadingVision, setLoadingVision] = useState(true);
  const [loadingMission, setLoadingMission] = useState(true);

  const [savingContact, setSavingContact] = useState(false); // Saving state for Contact
  const [savingVision, setSavingVision] = useState(false); // Saving state for Vision
  const [savingMission, setSavingMission] = useState(false); // Saving state for Mission

  // Error states
  const [contactErrors, setContactErrors] = useState({});
  const [visionError, setVisionError] = useState("");
  const [missionError, setMissionError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // Set individual loading states to true for each section
      setLoadingContact(true);
      setLoadingVision(true);
      setLoadingMission(true);

      const contactDocRef = doc(db, 'associations', 'contact');
      const visionDocRef = doc(db, 'associations', 'vision');
      const missionDocRef = doc(db, 'associations', 'mission');

      try {
        const contactDoc = await getDoc(contactDocRef);
        const visionDoc = await getDoc(visionDocRef);
        const missionDoc = await getDoc(missionDocRef);

        if (contactDoc.exists()) {
          setContact(contactDoc.data());
        }
        if (visionDoc.exists()) {
          setVision(visionDoc.data().vision);
        }
        if (missionDoc.exists()) {
          setMission(missionDoc.data().mission);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        toast.error('Error fetching data!');
      }

      // Set loading states to false after fetching data for each section
      setLoadingContact(false);
      setLoadingVision(false);
      setLoadingMission(false);
    };

    fetchData();
  }, []);

  // Validation functions
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const validateUrl = (url, platform) => {
    const platformPatterns = {
      linkedin: /^https:\/\/(www\.)?linkedin\.com\/.*$/,
      facebook: /^https:\/\/(www\.)?facebook\.com\/.*$/,
      instagram: /^https:\/\/(www\.)?instagram\.com\/.*$/,
      x: /^https:\/\/(www\.)?x\.com\/.*$/,
      telegram: /^https:\/\/(t\.me|www\.t\.me)\/.*$/
    };

    const regex = platformPatterns[platform];
    return regex ? regex.test(url) : false;
  };

  const validateContact = () => {
    let errors = {};
    Object.keys(contact).forEach((key) => {
      if (key === "email" && contact[key] && !validateEmail(contact[key])) {
        errors[key] = "Please enter a valid email address.";
      } else if (
        (key === "linkedin" || key === "facebook" || key === "instagram" || key === "x" || key === "telegram") && 
        contact[key] && 
        !validateUrl(contact[key], key)
      ) {
        errors[key] = "Please enter a valid URL.";
      }

      // Check if fields like phone, office, and workhour are not empty
      if ((key === 'phone' || key === 'office' || key === 'workhour') && !contact[key]) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty.`;
      }
    });
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateVision = () => {
    if (vision.length < 150) {
      setVisionError("Vision must be at least 150 characters long.");
      return false;
    }
    setVisionError("");
    return true;
  };

  const validateMission = () => {
    if (mission.length < 150) {
      setMissionError("Mission must be at least 150 characters long.");
      return false;
    }
    setMissionError("");
    return true;
  };

  const handleSaveContact = async () => {
    if (!validateContact()) return; // If validation fails, do not save

    setSavingContact(true);
    const contactDocRef = doc(db, 'associations', 'contact');

    try {
      await updateDoc(contactDocRef, contact);
      setIsEditingContact(false);
      toast.success('Contact updated successfully!');
    } catch (error) {
      console.error("Error updating contact info: ", error);
      toast.error('Error updating contact info!');
    }

    setSavingContact(false);
  };

  const handleSaveVision = async () => {
    if (!validateVision()) return; // If validation fails, do not save

    setSavingVision(true);
    const visionDocRef = doc(db, 'associations', 'vision');

    try {
      await updateDoc(visionDocRef, { vision });
      setIsEditingVision(false);
      toast.success('Vision updated successfully!');
    } catch (error) {
      console.error("Error updating vision: ", error);
      toast.error('Error updating vision!');
    }

    setSavingVision(false);
  };

  const handleSaveMission = async () => {
    if (!validateMission()) return; // If validation fails, do not save

    setSavingMission(true);
    const missionDocRef = doc(db, 'associations', 'mission');

    try {
      await updateDoc(missionDocRef, { mission });
      setIsEditingMission(false);
      toast.success('Mission updated successfully!');
    } catch (error) {
      console.error("Error updating mission: ", error);
      toast.error('Error updating mission!');
    }

    setSavingMission(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Association Details</h1>

      {/* Contact Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-3">Contact Information</h2>
        <button
          onClick={() => isEditingContact ? handleSaveContact() : setIsEditingContact(true)} // Save or toggle edit
          className="btn btn-info text-black mb-3 flex items-center justify-center"
        >
          {savingContact ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : isEditingContact ? (
            <><FaSave className="mr-2" /> Save</>
          ) : (
            <><FaEdit className="mr-2" /> Edit Contact</>
          )}
        </button>

        {loadingContact ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-xs"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(contact).map((key) => (
              key && (
                <div key={key} className="form-control">
                  <label className="label">
                    <span className="label-text capitalize">{key}</span>
                  </label>
                  <div className="flex items-center">
                    {/* Icons for contact fields */}
                    {key === 'email' && <FaEnvelope className="mr-2" />}
                    {key === 'phone' && <FaPhoneAlt className="mr-2" />}
                    {key === 'linkedin' && <FaLinkedinIn className="mr-2" />}
                    {key === 'instagram' && <FaInstagram className="mr-2" />}
                    {key === 'office' && <FaBuilding className="mr-2" />}
                    {key === 'x' && <FontAwesomeIcon icon={faXTwitter} className="mr-2" />} {/* Twitter */}
                    {key === 'facebook' && <FaFacebookF className="mr-2" />} {/* Facebook */}
                    {key === 'telegram' && <FaTelegramPlane className="mr-2" />} {/* Telegram */}
                    {key === 'workhour' && <FaCalendarAlt className="mr-2" />} {/* Work hours */}
                    <input
                      type="text"
                      value={contact[key]}
                      onChange={(e) => setContact({ ...contact, [key]: e.target.value })}
                      className="input input-bordered"
                      disabled={!isEditingContact}
                    />
                  </div>
                  {/* Display error */}
                  {contactErrors[key] && <span className="text-error text-sm">{contactErrors[key]}</span>}
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* Vision */}
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-3">Vision</h2>
        <button
          onClick={() => isEditingVision ? handleSaveVision() : setIsEditingVision(true)} // Save or toggle edit
          className="btn btn-info text-black mb-3 flex items-center justify-center"
        >
          {savingVision ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : isEditingVision ? (
            <><FaSave className="mr-2" /> Save</>
          ) : (
            <><FaEdit className="mr-2" /> Edit Vision</>
          )}
        </button>

        {loadingVision ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-xs"></span>
          </div>
        ) : (
          <div className="form-control">
            <label className="label">
              <span className="label-text">Vision</span>
            </label>
            <div className="flex items-center">
              <FaLightbulb className="mr-2" />
              <textarea
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                className="textarea textarea-bordered w-full min-h-20"
                disabled={!isEditingVision}
              />
            </div>
            {/* Display error */}
            {visionError && <span className="text-error text-sm">{visionError}</span>}
          </div>
        )}
      </div>

      {/* Mission */}
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-3">Mission</h2>
        <button
          onClick={() => isEditingMission ? handleSaveMission() : setIsEditingMission(true)} // Save or toggle edit
          className="btn btn-info text-black mb-3 flex items-center justify-center"
        >
          {savingMission ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : isEditingMission ? (
            <><FaSave className="mr-2" /> Save</>
          ) : (
            <><FaEdit className="mr-2" /> Edit Mission</>
          )}
        </button>

        {loadingMission ? (
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-xs"></span>
          </div>
        ) : (
          <div className="form-control">
            <div className="flex items-center wifull">
              <FaBullhorn className="mr-2" />
              <textarea
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="textarea textarea-bordered w-full min-h-20"
                disabled={!isEditingMission}
              />
            </div>
            {/* Display error */}
            {missionError && <span className="text-error text-sm">{missionError}</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Association;