import { useState } from "react";
import InputField from "../ui/Input";

function SignUpForm({setOtpSent}: {setOtpSent: (value: boolean) => void}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        console.log('Sign up with:', { name, email, password, dob });
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert('Your OTP has been sent successfully. Please check your email.');
        setOtpSent(true);

    } catch (error) {

        console.error('Sign up error:', error);
        alert('Error creating account. Please try again.');

    } finally {
        setIsSubmitting(false);
    }
};
  return (
    <div>
      <form onSubmit={handleSubmit}>
                        <InputField
                            label="Your Name"
                            type="text"
                            value={name}
                            placeholder="Full Name"
                            onChange={setName}
                            required={true}
                        />
                        <InputField
                            label="Email Address"
                            type="email"
                            value={email}
                            placeholder="example@gmail.com"
                            onChange={setEmail}
                            required={true}
                        />
                        <InputField
                            label="Date of Birth"
                            type="date"
                            value={dob}
                            onChange={setDob}
                            required={true}
                        />
                        <InputField
                            label="Password"
                            type="password"
                            value={password}
                            placeholder="******"
                            onChange={setPassword}
                            required={true}
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending...
                                </span>
                            ) : 'Get OTP'}
                        </button>
                    </form>
    </div>
  )
}

export default SignUpForm
