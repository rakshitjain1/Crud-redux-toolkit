import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchUser } from '../features/userDetailSlice';
import './navbar.css';  // Importing external CSS file

function Navbar() {
  const allusers = useSelector((state) => state.app.users);
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData, dispatch]);

  return (
    <>
      <div className="main-container">
        {/* Logo */}
        <div className="logo">
          <h3>Redux-Toolkit</h3>
        </div>

        {/* Navigation Links */}
        <div>
          <ul>
            <li>
              <Link to="/">Create Post</Link>
            </li>
            <li>
              <Link to="/read">All Post ({allusers.length})</Link>
            </li>
          </ul>
        </div>

        {/* Search Input */}
        <div>
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default Navbar;
