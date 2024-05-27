import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CloseButton from './CloseButton'; 
import './UserSkillPage.css';

function UserSkillForm() {
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/skills')
      .then(res => setSkills(res.data))
      .catch(error => console.error('Lỗi khi tải danh sách kỹ năng:', error));
  }, []);

  const handleSkillChange = (event) => {
    const skillId = event.target.value;
    if (event.target.checked) {
      setSelectedSkills([...selectedSkills, skillId]);
    } else {
      setSelectedSkills(selectedSkills.filter(id => id !== skillId));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('/useraddskill', {
        skill_id: selectedSkills
      });
      // Xử lý sau khi thêm thành công, ví dụ: reset form, hiển thị thông báo...
      console.log('Thêm kỹ năng thành công!');
    } catch (error) {
      console.error('Lỗi khi thêm kỹ năng:', error);
    }
  };

  return (
    <div className='user-skill-form'>
      <CloseButton to="/home" />
      <h2>Choose SKill</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {skills.map(skill => (
            <div key={skill.id}>
              <input
                type="checkbox"
                id={skill.id}
                value={skill.id}
                checked={selectedSkills.includes(skill.id)}
                onChange={handleSkillChange}
              />
              <label htmlFor={skill.id}>{skill.skillname}</label>
            </div>
          ))}
        </div>
        <button type="submit">Lưu</button>
      </form>
    </div>
  );
}

export default UserSkillForm;