import * as yup from 'yup'

export const partnerSignupValidation = yup.object().shape({
    name: yup.string().required("Please Enter Name"),
    email:yup.string().email("Please Enter Valid email").required("Please Enter Email"),
    mobile:yup.string()
    .matches(/^[0-9]{10}$/, "Invalid Mobile Number")
    .nullable().required("Enter the Mobile Number"),
    password: yup.string().min(3).max(7).required("Please Enter Password"),
    confirmPassword:yup.string().oneOf([yup.ref("password")],"Password Not Matched").required("Please Confirm Password"),
    adhaar: yup.mixed().required("Please upload your Adhaar"),
    liscense: yup.mixed().required("Please upload your Liscense"),
    insurance: yup.mixed().required("Please upload your Insurance"),
    rc: yup.mixed().required("Please upload your rc"),
    state: yup.string().required("Please Enter Your State"),
    city: yup.string().required("Please Enter Your City"),
    pin: yup.string().required("Please Enter Your Pin")
})