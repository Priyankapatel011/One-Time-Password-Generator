const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {
  const [otp, setOtp] = useState("Click 'Generate OTP' to get a code")
  const [expire, setExpire] = useState("")
  const [countDown, setCountDown] = useState(0)
  const btnRef = useRef(null)


  const generateOTP = () => {
    // random no 6 digits (100000, 999999)
    
    const newOtp = (Math.floor(Math.random() * 900000 + 100000))
    setOtp(newOtp)
    setCountDown(5);
    btnRef.current.disabled = true
  }

  useEffect(() => {
    if(countDown === 0){
      if(otp !== "Click 'Generate OTP' to get a code"){  // 6 digit otp
        setExpire("OTP expired. Click the button to generate a new OTP.")
        btnRef.current.disabled = false
      }
      return
    }

    setExpire(`Expires in: ${countDown} seconds`)

    const timer = setInterval(() => {
      setCountDown(prev => prev-1)
    }, 1000)

    return () => clearInterval(timer)

  }, [countDown, otp])


  return(
    <div className="container">
      <h1 id="otp-title">OTP Generator</h1>
      <h2 id="otp-display">{otp}</h2>
      <p id="otp-timer" aria-live="polite">{expire}
      </p>
      <button ref={btnRef} id="generate-otp-button" onClick={generateOTP}>Generate OTP</button>
    </div>
  )
};


// const { useState, useEffect, useRef } = React;

// export const OTPGenerator = () => {
//   const [otp, setOtp] = useState("Click 'Generate OTP' to get a code")
//   const [expire, setExpire] = useState("")
//   const btnRef = useRef(null)


//   const generateOTP = () => {
//     // random no 6 digits (100000, 999999)
    
//     setOtp(Math.floor(Math.random() * 900000 + 100000))
//     setExpire("")
//     btnRef.current.disabled = true

//     let countDown = 5
//     setExpire(`Expire in: ${countDown} seconds`)
//     countDown--
//     const interval = setInterval(async () => {
//       if(countDown){
//          await setExpire(`Expire in: ${countDown} seconds`)
//         countDown-- 
//       }
//       else{
//         setExpire(`OTP expired. Click the button to generate a new OTP.`)
//         btnRef.current.disabled = false
//         clearInterval(interval)
//       }
//     }, 1000)   

//     return () => clearInterval(interval)

//   }
//   return(
//     <div className="container">
//       <h1 id="otp-title">OTP Generator</h1>
//       <h2 id="otp-display">{otp}</h2>
//       <p id="otp-timer" aria-live="polite">{expire}
//       </p>
//       <button ref={btnRef} id="generate-otp-button" onClick={generateOTP}>Generate OTP</button>
//     </div>
//   )
// };
