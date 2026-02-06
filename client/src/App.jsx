import { useState, useEffect } from 'react';
import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:5001/students';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', course: '' });
  const [editingId, setEditingId] = useState(null);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ name: '', email: '', course: '' });
      fetchStudents();
    } catch (error) {
      console.error("Error saving student", error);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id);
    setFormData({ name: student.name, email: student.email, course: student.course });
  };

  const handleDelete = async (id) => {
    if (window.confirm("CONFIRM DELETION: This action cannot be undone.")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student", error);
      }
    }
  };

  return (
    // full screepn wrapper with dark theme
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* navigation bar */}
      <nav className="border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-indigo-500 rounded-sm animate-pulse"></div>
            <h1 className="text-xl font-bold tracking-tighter uppercase font-mono">
              Student_Mgmt_Sys <span className="text-neutral-600 text-sm">v1.0</span>
            </h1>
          </div>
          <div className="text-xs font-mono text-neutral-500 hidden md:block">
            STATUS: <span className="text-green-500">ONLINE</span>
          </div>
        </div>
      </nav>

      {/* main content */}
      <main className="w-full p-4 md:p-8 lg:p-12">
        
        {/* grid layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* form section */}
          <div className="xl:col-span-1">
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl sticky top-24 shadow-2xl shadow-black/50">
              <h2 className="text-sm font-mono text-neutral-400 mb-6 uppercase tracking-widest border-b border-neutral-800 pb-2">
                {editingId ? '// Update Record' : '// New Entry'}
              </h2>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-500 uppercase ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 p-3 rounded-lg text-white placeholder-neutral-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="ex. Jane Doe"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-500 uppercase ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 p-3 rounded-lg text-white placeholder-neutral-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="ex. jane@dev.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-500 uppercase ml-1">Course</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 p-3 rounded-lg text-white placeholder-neutral-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    placeholder="ex. Full Stack Dev"
                  />
                </div>

                <div className="pt-4 flex gap-2">
                  <button
                    type="submit"
                    className={`flex-1 p-3 rounded-lg font-bold tracking-wide uppercase text-sm transition-all hover:brightness-110 active:scale-95 ${
                      editingId 
                      ? 'bg-amber-500 text-black' 
                      : 'bg-indigo-600 text-white'
                    }`}
                  >
                    {editingId ? 'Save Changes' : 'Initialize Student'}
                  </button>
                  
                  {editingId && (
                    <button 
                      type="button"
                      onClick={() => { setEditingId(null); setFormData({name:'', email:'', course:''}) }} 
                      className="px-4 bg-neutral-800 text-neutral-400 hover:text-white rounded-lg transition-colors font-mono text-xl"
                    >
                      &times;
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* table section */}
          <div className="xl:col-span-3">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
              <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50">
                <h2 className="text-sm font-mono text-neutral-400 uppercase tracking-widest">
                  // Database Records
                </h2>
                <span className="text-xs bg-neutral-800 text-neutral-400 px-2 py-1 rounded font-mono">
                  COUNT: {students.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-neutral-950 text-neutral-500 font-mono text-xs uppercase">
                    <tr>
                      <th className="p-5 border-b border-neutral-800 font-medium tracking-wider">Student Name</th>
                      <th className="p-5 border-b border-neutral-800 font-medium tracking-wider">Contact Email</th>
                      <th className="p-5 border-b border-neutral-800 font-medium tracking-wider">Enrolled Course</th>
                      <th className="p-5 border-b border-neutral-800 font-medium tracking-wider text-right">Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {students.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="p-8 text-center text-neutral-600 font-mono text-sm">
                          [ NO DATA ENTRIES DETECTED ]
                        </td>
                      </tr>
                    ) : (
                      students.map((student) => (
                        <tr key={student._id} className="group hover:bg-neutral-800/50 transition-colors">
                          <td className="p-5 font-medium text-neutral-200">{student.name}</td>
                          <td className="p-5 text-neutral-400 font-mono text-sm">{student.email}</td>
                          <td className="p-5">
                            <span className="inline-block px-2 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-bold rounded border border-indigo-500/20 uppercase">
                              {student.course}
                            </span>
                          </td>
                          <td className="p-5 text-right space-x-3">
                            <button
                              onClick={() => handleEdit(student)}
                              className="text-neutral-400 hover:text-white text-sm font-medium underline decoration-neutral-600 hover:decoration-white underline-offset-4 transition-all"
                            >
                              EDIT
                            </button>
                            <button
                              onClick={() => handleDelete(student._id)}
                              className="text-red-500/70 hover:text-red-500 text-sm font-medium hover:underline underline-offset-4 transition-all"
                            >
                              DELETE
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

        </div>
      </main>
    </div>
  );
}

export default App;