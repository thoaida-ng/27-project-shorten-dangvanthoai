import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CloseButton from './CloseButton';  

const UserProfile = () => {
  const [userprofile, setUserprofile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://127.0.0.1:5000/userprofile', {
          withCredentials: true
        });
        setUserprofile(response.data.userprofile);
        setIsLoading(false);
      } catch (error) {
        console.error('Lỗi khi lấy UserProfile:', error);
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/userprofile', {
        firstname: event.target.firstname.value,
        lastname: event.target.lastname.value,
        age: event.target.age.value,
        sex: event.target.sex.value
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        alert(response.data.message);
        setUserprofile({
          firstname: event.target.firstname.value,
          lastname: event.target.lastname.value,
          age: event.target.age.value,
          sex: event.target.sex.value
        });
      } else {
        alert('Lỗi khi cập nhật thông tin UserProfile. Vui lòng thử lại sau.');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật UserProfile:', error);
      alert('Lỗi khi cập nhật thông tin UserProfile. Vui lòng thử lại sau.');
    }
  };

  return (
    <div>
      <CloseButton to="/home" />
      <h1>Update Profile</h1>
      {isLoading && (
        <div>
          <h2>Đang tải thông tin...</h2>
        </div>
      )}
      {!isLoading && userprofile && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              defaultValue={userprofile.firstname}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              defaultValue={userprofile.lastname}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              className="form-control"
              id="age"
              name="age"
              defaultValue={userprofile.age}
            />
          </div>
          <div className="form-group">
            <label htmlFor="sex">Sex:</label>
            <select className="form-control" id="sex" name="sex">
              <option value="M" selected={userprofile.sex === 'M'}>Nam</option>
              <option value="F" selected={userprofile.sex === 'F'}>Nu</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      )}
      {!userId && (
        <div>
          <h2>Vui lòng đăng nhập để cập nhật thông tin.</h2>
        </div>
      )}
      {!isLoading && !userprofile && ( // Hiển thị form khi chưa có UserProfile
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              name="firstname"
              placeholder="First Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              placeholder="Last Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="text"
              className="form-control"
              id="age"
              name="age"
              placeholder="Age"
            />
          </div>
          <div className="form-group">
            <label htmlFor="sex">Sex:</label>
            <select className="form-control" id="sex" name="sex">
              <option value="M">Nam</option>
              <option value="F">Nu</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Create Profile</button> 
        </form>
      )}
    </div>
  );
};

export default UserProfile;