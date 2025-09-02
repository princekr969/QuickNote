import { redirect } from "next/navigation";
import { useState } from "react";
import InputField from "../ui/Input"


function OtpForm({setOtpSent}: {setOtpSent: (value: boolean) => void}) {
    const [otp, setOtp] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    const handleVerifyOtp = async (e: { preventDefault: () => void; }) => {
    
        e.preventDefault();
        setIsVerifying(true);
    
        try {
    
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert('Account created successfully!');
            redirect('/dashboard');
    
        } catch (error) {
    
            console.error('OTP verification error:', error);
            alert('Invalid OTP. Please try again.');
        } finally {
            setIsVerifying(false);
        }
    };
    
    const handleResendOtp = async () => {

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert('OTP has been resent successfully.');
    
        } catch (error) {
            console.error('Resend OTP error:', error);
            alert('Error resending OTP. Please try again.');
        }
    };
    
  return (
    <div>
      <form onSubmit={handleVerifyOtp}>
            <InputField
                label="Enter OTP"
                type="text"
                value={otp}
                placeholder="123456"
                onChange={setOtp}
                required={true}
                maxLength={6}
                
            />
            <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
            >
                {isVerifying ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                    </span>
                ) : 'Verify OTP'}
            </button>

            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Didn't receive the code?{' '}
                    <button
                        type="button"
                        onClick={handleResendOtp}
                        className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500"
                    >
                        Resend OTP
                    </button>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                    Wrong email?{' '}
                    <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="font-medium text-indigo-600 cursor-pointer  hover:text-indigo-500"
                    >
                        Change email
                    </button>
                </p>
            </div>
        </form>
    </div>
  )
}

export default OtpForm
