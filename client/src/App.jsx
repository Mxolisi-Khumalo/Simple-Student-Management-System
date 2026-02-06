import { useState, useEffect } from 'react';
import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:5001/students';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', course: '' });
  const [editingId, setEditingId] = useState(null); // track if editing

  // 1. fetch students 
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // handle inputting
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submitting form for create and update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // update
        await axios.put(`${API_URL}/${editingId}`, formData);
        setEditingId(null);
      } else {
        // create
        await axios.post(API_URL, formData);
      }
      setFormData({ name: '', email: '', course: '' }); // reset
      fetchStudents(); // refresh
    } catch (error) {
      console.error("Error saving student", error);
    }
  };

  // editting
  const handleEdit = (student) => {
    setEditingId(student._id);
    setFormData({ name: student.name, email: student.email, course: student.course });
  };

  // deleting student
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Student Management System</h1>

        {/* form section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Student' : 'Add New Student'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="course"
              placeholder="Course"
              value={formData.course}
              onChange={handleChange}
              required
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className={`text-white p-2 rounded transition ${editingId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {editingId ? 'Update Student' : 'Add Student'}
            </button>
            {editingId && (
                <button 
                  onClick={() => { setEditingId(null); setFormData({name:'', email:'', course:''}) }} 
                  className="bg-gray-500 text-white p-2 rounded md:col-span-4"
                >
                  Cancel Edit
                </button>
            )}
          </form>
        </div>

        {/* table section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Email</th>
                <th className="p-4 border-b">Course</th>
                <th className="p-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-500">No students found.</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="p-4 border-b">{student.name}</td>
                    <td className="p-4 border-b">{student.email}</td>
                    <td className="p-4 border-b">{student.course}</td>
                    <td className="p-4 border-b text-center space-x-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;