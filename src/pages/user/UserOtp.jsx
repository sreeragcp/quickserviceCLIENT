import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { userRegisterFuction } from "../../services/Apis.js";
import { useUserOtpMutation } from "../../slices/userApiSlice";
import toast, { Toaster } from "react-hot-toast";

const UserOtp = () => {

  const [timeotp, setTimeOtp] = useState()
  const [timer,setTimer] =useState(new Date())

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");

  const navigate = useNavigate();

  const [userOtp, { isLoading }] = useUserOtpMutation();

  const verfyOtp = async (e) => {
    try {
      e.preventDefault();
      const otpValue = otp1 + otp2 + otp3 + otp4;
      console.log(otpValue);

      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      storedUserData["otp"] = otpValue;
      const res = await userOtp(storedUserData).unwrap();
          console.log(res,"this is the res");
      if (res.message === "success") {
        toast.success("Verification successful!");
        navigate("/signin");
      } else if (res.data.message === "Entered mail is already registered") {
        toast.error("Entered email is already registered");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const resendOtp = async(e)=>{
    e.preventDefault()
      try {
        const userData = localStorage.getItem('userData');
        const res = await userRegisterFuction(userData)
        if (res.data.message === 'success') {
          localStorage.setItem("timer",new Date());
          setTimer(new Date())
          navigate('/otp');
        } else if (res.message === 'Your email is already registered') {
          toast('Your email is already registered');
        }
        
      } catch (error) {
        
      }
  }


  useEffect(()=>{

    const otpTime = new Date(localStorage.getItem("timer"))
    console.log(typeof(otpTime), "this is otpTime");
    const x = 60
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      let differenceInSeconds = Math.floor(( currentTime-otpTime ) / 1000);
      console.log(x-differenceInSeconds,"time differe ");
      setTimeOtp(x-differenceInSeconds)
      if(x-differenceInSeconds<=0){
        localStorage.removeItem("timer")
          clearInterval(intervalId);
      }
    },1000); 
  
    return () => {
      clearInterval(intervalId);
    };
  
  
  
  },[timer])

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-cyan-100 py-12 bg-cover">
     
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
            <h1>{timeotp>0?timeotp:""}</h1>
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email ba**@dipainhouse.com</p>
            </div>
          </div>

          <div>
            <form action="" method="post">
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="w-16 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      value={otp1}
                      onChange={(e) => setOtp1(e.target.value)}
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      value={otp2}
                      onChange={(e) => setOtp2(e.target.value)}
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      value={otp3}
                      onChange={(e) => setOtp3(e.target.value)}
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <input
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                      value={otp4}
                      onChange={(e) => setOtp4(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                      onClick={verfyOtp}
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive the code?</p>{" "}
                    <button onClick={resendOtp} disabled={timeotp>0}> Resend</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserOtp;
