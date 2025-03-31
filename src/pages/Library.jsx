import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTools } from 'react-icons/fa';
const Library = () => {
  // Fake book data (You can expand this with more fake data)
  const fakeBooks = [
    {
      _id: '1',
      title: 'Economics 101',
      authorName: 'John Doe',
      bookLink: 'https://example.com/book1',
      category: 'Economics',
    },
    {
      _id: '2',
      title: 'Introduction to Finance',
      authorName: 'Jane Smith',
      bookLink: 'https://example.com/book2',
      category: 'Finance',
    },
    {
      _id: '3',
      title: 'Management Principles',
      authorName: 'Michael Brown',
      bookLink: 'https://example.com/book3',
      category: 'Management',
    },
    {
      _id: '4',
      title: 'Advanced Business Analytics',
      authorName: 'Sarah Lee',
      bookLink: 'https://example.com/book4',
      category: 'Business Analytics',
    },
    {
      _id: '5',
      title: 'Mathematics for Economics',
      authorName: 'Emily Davis',
      bookLink: 'https://example.com/book5',
      category: 'Maths',
    },
    {
      _id: '6',
      title: 'Accounting Fundamentals',
      authorName: 'James Wilson',
      bookLink: 'https://example.com/book6',
      category: 'Accounting',
    },
  ];

  const [books, setBooks] = useState(fakeBooks);
  const [filteredBooks, setFilteredBooks] = useState(fakeBooks);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Categories for filter dropdown
  const categories = [
    'Economics',
    'Finance',
    'Management',
    'Accounting',
    'Business Analytics',
    'Maths',
    'General',
  ];

  // Search filter logic
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterBooks(e.target.value, selectedCategory);
  };

  // Category filter logic
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    filterBooks(searchQuery, e.target.value);
  };

  // Filter books based on search query and selected category
  const filterBooks = (query, category) => {
    let filtered = books;

    if (query) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.authorName.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((book) => book.category === category);
    }

    setFilteredBooks(filtered);
  };

  return (
    <div className="w-full bg-base-300 py-20 lg:px-[10%]">
      <div className="lg:max-w-full max-w-[90%] mx-auto">
        <h2 className="sm:text-4xl text-2xl text-center font-bold mb-6 py-8">Library</h2>

       {/*
      <div className="relative mb-6 lg:w-[70%] w-[90%] mx-auto">
        <input
          type="text"
          placeholder="Search for books, authors, etc..."
          value={searchQuery}
          onChange={handleSearch}
          className="input input-bordered mx-auto py-3 px-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary transition ease-in-out w-full"
        />
        <div className="absolute inset-y-0 right-1 top-1 bottom-1 flex items-center pr-4 px-5 bg-gray-400 rounded-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100"
          viewBox="0 0 50 50"
          className='w-4 h-4 fill-current hover:scale-110 transition-transform duration-200 ease-in-out'
          >
          <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
          </svg>
            </div>
       </div>


        <div className="flex flex-wrap justify-between gap-6 mb-6">
          <div className="w-full lg:w-1/4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Filter by Category</span>
              </label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="select select-bordered w-full"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.length === 0 ? (
            <p className="text-center text-xl text-gray-500">No books found.</p>
          ) : (
            filteredBooks.map((book) => (
              <div
                key={book._id}
                className="card bg-base-100 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="card-body p-4">
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-sm text-gray-600">by {book.authorName}</p>
                  <p className="text-sm text-gray-500">Category: {book.category}</p>
                  <div className="card-actions justify-end mt-4">
                    <a
                      href={book.bookLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-info rounded-full"
                    >
                      View Book
                    </a>
                  </div>
                </div>
              </div>
            ))
          )} 
        </div> */}

         {/* Under Maintenance Message */}
         <div className="flex flex-col items-center justify-center min-h-[300px]">
          <FaTools className="text-6xl text-gray-600 mb-4" />
          <p className="text-3xl text-center font-bold text-error">Under Maintenance</p>
          <p className="text-lg text-center text-gray-500">We are currently working on updating our library. Please check back later.</p>
        </div>
      </div>
    </div>
  );
};

export default Library;