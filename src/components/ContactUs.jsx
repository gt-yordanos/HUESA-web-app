import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaBuilding, FaLinkedinIn, FaInstagram, FaFacebookF, FaTelegramPlane, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { useAssociations } from '../contexts/AssociationsContext'; // Importing the custom hook
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
<FontAwesomeIcon icon={faXTwitter} className="mr-2" />
const ContactUs = () => {
  const { contact } = useAssociations();

  return (
    <div className="py-8 bg-base-200" id="contact">
      {/* Container for entire content */}
      <div className="container mx-auto text-center">

        {/* Hero Section */}
        <div className="hero min-h-[250px] lg:px-[10%] px-4">
          <div className="hero-content flex flex-col items-center justify-center">
            <h1 className="sm:text-4xl text-2xl font-bold">Contact Us</h1>
            <p className="sm:text-lg text-sm mt-4">
              We’re here to assist you. Reach out to us for any inquiries, collaborations, or feedback.
            </p>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="lg:px-[10%] px-4">
          <h2 className="m:text-4xl text-2xl font-semibold mb-4">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Contact Item: Email */}
            <div className="card bg-base-100 shadow-md p-6">
              <div className="flex items-center mb-4">
                <FaEnvelope className="mr-4 text-2xl" />
                <span className="text-lg font-semibold">Email</span>
              </div>
              <p className="text-left">{contact?.email || "info@huesa.com"}</p>
            </div>

            {/* Contact Item: Phone */}
            <div className="card bg-base-100 shadow-md p-6">
              <div className="flex items-center mb-4">
                <FaPhoneAlt className="mr-4 text-2xl" />
                <span className="text-lg font-semibold">Phone</span>
              </div>
              <p className="text-left">{contact?.phone || "+123 456 7890"}</p>
            </div>

            {/* Contact Item: Office */}
            <div className="card bg-base-100 shadow-md p-6">
              <div className="flex items-center mb-4">
                <FaBuilding className="mr-4 text-2xl" />
                <span className="text-lg font-semibold">Office</span>
              </div>
              <p className="text-left">{contact?.office || "123 HUESA St., City, Country"}</p>
            </div>

            {/* Contact Item: Office Workining Houtr */}
            <div className="card bg-base-100 shadow-md p-6">
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="mr-4 text-2xl" />
                <span className="text-lg font-semibold">Work Hours</span>
              </div>
              <p className="text-left">{contact?.workhour || "Mon-Fri: 9am - 5pm"}</p>
            </div>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="py-16 lg:px-[10%] px-4">
          <h2 className="m:text-4xl text-2xl font-semibold mb-4">Follow Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* LinkedIn */}
            <a href={contact?.linkedin || "#"} target="_blank" rel="noopener noreferrer">
              <div className="card bg-base-100 shadow-md p-6">
                <div className="flex items-center mb-4">
                  <FaLinkedinIn className="mr-4 text-2xl text-blue-600" />
                  <span className="text-lg font-semibold">LinkedIn</span>
                </div>
                <p className="text-left">Follow us on LinkedIn</p>
              </div>
            </a>

            {/* Instagram */}
            <a href={contact?.instagram || "#"} target="_blank" rel="noopener noreferrer">
              <div className="card bg-base-100 shadow-md p-6">
                <div className="flex items-center mb-4">
                  <FaInstagram className="mr-4 text-2xl text-pink-600" />
                  <span className="text-lg font-semibold">Instagram</span>
                </div>
                <p className="text-left">Follow us on Instagram</p>
              </div>
            </a>

            {/* Facebook */}
            <a href={contact?.facebook || "#"} target="_blank" rel="noopener noreferrer">
              <div className="card bg-base-100 shadow-md p-6">
                <div className="flex items-center mb-4">
                  <FaFacebookF className="mr-4 text-2xl text-blue-700" />
                  <span className="text-lg font-semibold">Facebook</span>
                </div>
                <p className="text-left">Follow us on Facebook</p>
              </div>
            </a>

            {/* Telegram */}
            <a href={contact?.telegram || "#"} target="_blank" rel="noopener noreferrer">
              <div className="card bg-base-100 shadow-md p-6">
                <div className="flex items-center mb-4">
                  <FaTelegramPlane className="mr-4 text-2xl text-blue-500" />
                  <span className="text-lg font-semibold">Telegram</span>
                </div>
                <p className="text-left">Join our Telegram group</p>
              </div>
            </a>

            {/* Twitter/X */}
            <a href={contact?.telegram || "#"} target="_blank" rel="noopener noreferrer">
              <div className="card bg-base-100 shadow-md p-6">
                <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faXTwitter} className="mr-2" />
                  <span className="text-lg font-semibold">X/Twitter</span>
                </div>
                <p className="text-left">Follow us on X/Twitter</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;