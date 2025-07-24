import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useLog } from "../context/LoginContext";

function Register() {
  const [isVerifyingPhase, setVerifyPhase] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(0); // Timer for resend OTP
  const { user } = useLog();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message,setMessage]= useState("complete your registration...")
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    role: "user",
    password: "",
    confirmPassword: "",
    addr: ""
  });


  // Handle timer for resend button
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // On mount, check if user exists and is unverified
  useEffect(() => {
    if (user.name !== null && user.verified === false) {
      setForm(prev => ({ ...prev, email: user.email }));
      setVerifyPhase(true);
      setMessage("verify your mail and complete registration go furthure...")
    } else if (user.name !== null) {
      navigate("/products");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleResendOtp = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACK_END}/auth/sentotp?mail=${form.email}`);
      alert("OTP resent successfully. Check your inbox.");
      setResendTimer(30); // start 30 seconds timer
    } catch (err) {
      console.error("Resend OTP failed:", err);
      alert("Failed to resend OTP. Try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_BACK_END}/auth/register`, form);

      switch (res.status) {
        case 200:
        case 201:
          alert("Verification email sent. Please check your inbox.");
          setVerifyPhase(true);
          break;
        case 208:
        case 409:
          alert("Email already registered. Try logging in instead.");
          break;
        default:
          alert("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert(err.response?.data?.message || "Registration failed due to server error.");
    } finally {
      setLoading(false);
      setForm(prev => ({
        ...prev,
        password: "",
        confirmPassword: ""
      }));
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACK_END}/auth/verifyotp?mail=${form.email}&otp=${otp}`,
        { email: form.email, otp }
      );

      if (res.status === 200) {
        alert("Email verified successfully!");
        setVerifyPhase(false);
        navigate("/login", { replace: true });
      } else {
        alert("Verification failed. Please try again.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      alert("Verification failed. Please check your OTP and try again.");
    } finally {
      setOtp("");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-8 items-center justify-start md:!pt-[20vh] !pt-[10vh] bg-gray-100">
      <h2 className="text-[2rem] font-bold text-center text-gray-700">Register</h2>

      {isVerifyingPhase ? (
        <form
          className="bg-white !p-8 rounded-xl shadow-md w-full max-w-3xl space-y-6 flex flex-col gap-4"
          onSubmit={handleVerify}
        >
          <p className="text-[2rem] font-semibold text-center">{message}</p>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border !p-2 rounded-md w-full fields2"
            disabled
            required
          />

          <input
            type="text"
            name="otp"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            placeholder="Enter the OTP"
            className="border !p-2 rounded-md w-full fields2"
            required
          />

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendTimer > 0}
            className={`w-[30%] !px-2 !py-2 text-xl text-white font-semibold shadow-xs shadow-gray-700 rounded-md ${
              resendTimer > 0 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-400 hover:bg-gray-500"
            }`}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
          </button>

          <input
            type="submit"
            value={loading ? "Verifying..." : "Verify OTP"}
            className="w-full shadow-xs shadow-gray-400 bg-fuchsia-500 hover:bg-fuchsia-600 text-white rounded-md font-semibold fields2"
          />
        </form>
      ) : (
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
            {loading ? "Registering..." : "Register"}
          </button>
          <Link to="/login" className="text-2xl"> do you have an account? <span className=" text-blue-500"> login</span> </Link>
        </form>
      )}
  
    </div>
  );
}

export default Register;
