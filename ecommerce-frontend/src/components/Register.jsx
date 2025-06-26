function Register()
{
    return (
        <section>
            <h1>Register</h1>
            <form>  
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" required  className="text-b"/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />    
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login here</a
            ></p>
            
        </section>
    )
}
export default Register;