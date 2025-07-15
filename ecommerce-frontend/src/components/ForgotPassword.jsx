import { useState } from "react";
import { Link,useNavigate } from "react-router-dom"; 
import axios from "axios";   

function ForgotPassword() {
    // This component allows users to reset their password
    // It includes an input field for the email and a button to submit the reset request
    const [isSend,setSend]= useState(false);
    const [loading,setLoading]=useState(false);
    const [form, setForm] = useState({
        email: "",
        otp: "",
        password: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();
  
    // Function to handle password reset logic
    const handlePasswordReset = async(e) => {
        e.preventDefault();
        setLoading(true);
        if(form.email.trim() === '') {
            alert("Please enter your email");
            return;
        }
        if(!isSend)
        {
           await axios.post(`${import.meta.env.VITE_BACK_END}/auth/sentotp?mail=${form.email}`, { mail:form.email })
            .then((res) => {
                console.log("OTP sent successfully:", res);
                if(res.status === 200)
                {
                    setSend(true);
                    alert(res.data || "OTP sent successfully");
                    setLoading(false);
                    return;
                }
            }) 
            .catch((err) => {
                setLoading(false);
                console.error("Error sending OTP:", err);
                alert("Error sending OTP");
            });
        }
        else{
            if(form.password !== form.confirmPassword   || form.password.trim() === '' || form.confirmPassword.trim() === '')
            {
                alert("Passwords do not match or are empty");
                setForm(
                    {
                       ...form,
                        password: "",
                        confirmPassword: ""
                    })
                return;
            }
            await axios.put(`${import.meta.env.VITE_BACK_END}/auth/resetpassword?otp=${form.otp}`, { email:form.email, password: form.password})
            .then((res) => {
                console.log("Password reset successfully:", res);
                if(res.status === 200)
                {
                    alert("Password reset successfully");
                    setSend(false);
                    setForm({email:"",otp:"",password:"",confirmPassword:""});
                    navigate("/login");
                    
                }
                else if(res.status === 400) {
                    alert("Invalid OTP ");
                }
            })
            .catch((err) => {
                console.error("Error resetting password:", err);
                alert("invalid OTP");
                 setForm({...form,otp:"",password:"",confirmPassword:""});
                setLoading(false);
            });
        }
    }

    const hanleFormChange = (e)=>{
            const name =e.target.name;
            const value =e.target.value;
            setForm({...form,[name]:value});
    }

    // if(loading){
    //     return (
    //         <section className="flex justify-center">
    //             <p className="text-2xl text-fuchsia-600">sending request....</p>
    //         </section>
    //     )
    // }

    return (
        <section className="flex justify-center items-start h-screen bg-gray-100">
            <div className="bg-white !p-8 rounded-lg shadow-md w-[400px]">
                <h2 className="text-2xl font-semibold text-center !mb-6">Forgot Password</h2>
            
                <form onSubmit={handlePasswordReset} className="flex flex-col gap-4">
                    <input type="email" placeholder="Enter your email" className="w-full h-[3rem] border-2 border-fuchsia-500 rounded-lg !p-2 text-[1.4rem]" disabled={isSend} value={form.email} name="email" onChange={e=>hanleFormChange(e)} required />
        
                { isSend && (
                    <div>
                        <input type="text" value={form.otp} placeholder="Enter the otp" className="w-full h-[3rem] border-2 border-fuchsia-500 rounded-lg !p-2 text-[1.4rem] !mt-4" name="otp" onChange={e=>hanleFormChange(e)}/>
                        <input type="password" value={form.password} placeholder="Enter new password" className="w-full h-[3rem] border-2 border-fuchsia-500 rounded-lg !p-2 text-[1.4rem] !mt-4" name="password" onChange={e=>hanleFormChange(e)}  />
                    <input type="password" value={form.confirmPassword} placeholder="Confirm new password" className="w-full h-[3rem] border-2 border-fuchsia-500 rounded-lg !p-2 text-[1.4rem] !mt-4" name="confirmPassword" onChange={e=>hanleFormChange(e)} />
                    </div>
                )}
                <input  type="submit" className={`w-full h-[3rem] bg-fuchsia-500 hover:bg-fuchsia-600 text-white rounded-lg !p-2 text-[1.4rem] !mt-6 ${loading ? "opacity-45" : ""}`} value={`${isSend ? "Reset Password":"SEND OTP"}`} disabled={loading}/>
                </form>
            </div>
        </section>
    );
}
export default ForgotPassword;