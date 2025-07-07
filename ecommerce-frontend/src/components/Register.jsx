import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Register() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    role: "user",
    password: "",
    confirmPassword: "",
    addr: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
    }
      axios.post("http://localhost:8080/auth/register", form)
        .then((res) => {
          console.log(res);
          if(res.status === 208) {
            alert("User already exists. Please login.");
          }
          else{
            alert("Registration successful! Please login.");
            navigate("/login");
          }
      
      
            setForm({
              name: "",
              phone: "",
              email: "",
              role: "user",
              password: "",
              confirmPassword: "",
              addr: ""
            });
          })
        .catch((err) => {
          console.error("Registration error:", err);
          alert("Registration failed. Please try again.");
        }); 
    console.log(form);
   }

  return (
    <div className="min-h-screen flex flex-col gap-8 items-center justify-start md:!pt-[20vh] !pt-[10vh] bg-gray-100">
        <h2 className="text-[2rem] font-bold text-center text-gray-700">Register</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white !p-8 rounded-xl shadow-md w-full max-w-3xl space-y-6 flex flex-col gap-4"
      >
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter the Full Name"
            className="border p-2 rounded-md w-full fields2"
            required
          />
          <input
            type="number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter the Mobile Number"
            className="border p-2 rounded-md w-full fields2"
            required
          />
        </div>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter the Email"
          className="border p-2 rounded-md w-full fields2"
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border p-2 rounded-md w-full fields2"
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="developer">Developer</option>
        </select>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="border p-2 rounded-md w-full fields2"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="border p-2 rounded-md w-full fields2"
          required
        />
        <input
          type="text"
          name="addr"
          value={form.addr}
          onChange={handleChange}
          placeholder="Enter the Address"
          className="border p-2 rounded-md w-full fields2"
          required
        />

        <button
          type="submit"
          className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 text-white py-2 rounded-md font-semibold fields2"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
