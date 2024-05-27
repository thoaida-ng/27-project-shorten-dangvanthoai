import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <React.Fragment>
                <h1>Welcome to StudyTogether</h1>
            </React.Fragment>
            <div>
                <Link to="/userprofile" className="btn btn-primary me-3">Update Profile</Link>
                <Link to="/useraddskill" className="btn btn-primary me-3">Choose Skill</Link>
                <Link to="/partner" className="btn btn-primary me-3">Choose Partner </Link>
            </div>
        </div>
    );
};


export default Home;