import otpGenerator from 'otp-generator';

const generateOTP = () =>{
  const OTP = otpGenerator.generate(10, {
    upperCaseAlphabets: true,
    specialChars: false
  });
  return OTP;
}
export default generateOTP;