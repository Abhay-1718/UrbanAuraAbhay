import { useState } from "react"; // Importing useState hook
import axios from 'axios'; // Importing axios for API requests
import { backendUrl } from "../App"; // Importing backend URL from App component
import { toast } from "react-toastify"; // Importing toast for notifications

const Login = ({ setToken }) => {
  // State variables for storing user email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send a POST request to the backend for user login
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
      
      // Check if the response contains a success message
      if (response.data.message === true) {
        setToken(response.data.token); // Set the received token in the parent component
      } else {
        toast.error(response.data.message); // Show error message if login fails
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      toast.error(error.message); // Show error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel UrbanAura</h1>
        <form onSubmit={onSubmitHandler}> {/* Call onSubmitHandler when form is submitted */}
          <div className="mb-3 min-w-72 ">
            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              value={email} // Controlled input for email
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none "
              type="email"
              placeholder="Your@email.com"
              required // Email input is required
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)} // Update password state on input change
              value={password} // Controlled input for password
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none "
              type="password"
              placeholder="Enter Your Password"
              required // Password input is required
            />
          </div>
          <button className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black" type="submit">
            Login {/* Button to submit the form */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; // Exporting the Login component
