import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div>
            <React.Fragment>
                <h1>AdminDashboard</h1>
            </React.Fragment>
            <div>
                <Link to="/users" className="btn btn-primary me-3">Manage Users</Link>
                <Link to="/skill" className="btn btn-primary me-3">Add Skill</Link>
            </div>
        </div>
    );
};


export default AdminDashboard;