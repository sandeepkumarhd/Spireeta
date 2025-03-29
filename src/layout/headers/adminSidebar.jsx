import React from 'react';
import Link from 'next/link';
import SuperNavMenu from './superNavMenu';

const AdminSidebar = ({ isOpen, onClose }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}>X</button>
            <nav>
                <SuperNavMenu />
            </nav>
            <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          right: 0;
          height: 100%;
          width: 300px;
          background: white;
          box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
          transform: translateX(100%);
          transition: transform 0.3s ease;
          z-index:1000;
          padding:0px 10px;
        }
        .sidebar.open {
          transform: translateX(0);
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          margin: 0.5rem;
        }
        nav {
          padding: 1rem;
        }
      `}</style>
        </div>
    );
};

export default AdminSidebar;
