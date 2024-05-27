import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CloseButton from './CloseButton';

function AddSkill() {
  const [skillName, setSkillName] = useState('');
  const [skills, setSkills] = useState([]);

  // Khai báo hàm fetchSkills
  const fetchSkills = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/skills');
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    fetchSkills(); // Gọi hàm fetchSkills trong useEffect
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/addskill', { skillname: skillName });
      setSkillName('');
      alert('Skill added successfully!');
      // Cập nhật danh sách skills sau khi thêm
      fetchSkills(); 
    } catch (error) {
      console.error("Error adding skill:", error);
      alert('Error adding skill. Please try again.');
    }
  };

  return (
    <div>
      <CloseButton to="/admin" /> 
      <h2>Add Skill</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="skill-name">Skill Name:</label>
        <input
          type="text"
          id="skill-name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
        />
        <button type="submit">Add Skill</button>
      </form>

      <h2>Skills</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Skill Name</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id}>
              <td>{skill.id}</td>
              <td>{skill.skillname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddSkill;