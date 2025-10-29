import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-5 md:p-4 md:items-start md:pt-10 sm:p-2.5 sm:pt-[30px]">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-[400px] md:p-8 md:max-w-full sm:p-6">
        <h2 className="mb-5 text-center text-[#333] md:text-xl sm:text-lg">Register for Team Tasks</h2>
        {error && <div className="bg-[#f8d7da] text-[#721c24] p-2.5 rounded border border-[#f5c6cb] mb-4 md:p-3 md:text-sm sm:p-2 md:text-[13px]">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#333] md:text-sm">Name</label>
            <input
              type="text"
              className="w-full p-2.5 border border-[#ddd] rounded text-base focus:outline-none focus:border-[#007bff] focus:shadow-[0_0_0_2px_rgba(0,123,255,0.25)] md:p-2.5 md:text-base"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#333] md:text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2.5 border border-[#ddd] rounded text-base focus:outline-none focus:border-[#007bff] focus:shadow-[0_0_0_2px_rgba(0,123,255,0.25)] md:p-2.5 md:text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#333] md:text-sm">Password</label>
            <input
              type="password"
              className="w-full p-2.5 border border-[#ddd] rounded text-base focus:outline-none focus:border-[#007bff] focus:shadow-[0_0_0_2px_rgba(0,123,255,0.25)] md:p-2.5 md:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium text-[#333] md:text-sm">Role</label>
            <select
              className="w-full p-2.5 border border-[#ddd] rounded text-base focus:outline-none focus:border-[#007bff] focus:shadow-[0_0_0_2px_rgba(0,123,255,0.25)] md:p-2.5 md:text-base"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button 
            type="submit" 
            className="px-5 py-2.5 border-none rounded cursor-pointer text-base font-medium bg-[#007bff] text-white hover:bg-[#0056b3] disabled:opacity-60 disabled:cursor-not-allowed w-full md:p-3 md:text-base" 
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-5 text-[#666] md:text-sm sm:text-[13px]">
          Already have an account? <Link to="/login" className="text-[#007bff] no-underline hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

