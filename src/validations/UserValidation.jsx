import * as yup from 'yup'

export const userSignupValidation = yup.object().shape({
    name: yup.string().required("Please Enter Name"),
    email:yup.string().email("Please Enter Valid email").required("Please Enter Email"),
    mobile:yup.string()
    .matches(/^[0-9]{10}$/, "Invalid Mobile Number")
    .nullable().required("Enter the Mobile Number"),
    password: yup.string().min(3).max(7).required("Please Enter Password"),
    confirmPassword:yup.string().oneOf([yup.ref("password")],"Password Not Matched").required("Please Confirm Password")
})

export const userSigninValidation = yup.object().shape({
    email:yup.string().email("Please Enter Valid email").required("Please Enter Email"),
    password: yup.string().min(3).max(7).required("Please Enter Password"),
})

export const userForgotPasswordMail = yup.object().shape({
    email:yup.string().email("Please Enter Valid email").required("Please Enter Email")
})

export const userNewPasswordValidation = yup.object().shape({
    password: yup.string().min(3).max(7).required("Please Enter Password"),
    confirmPassword:yup.string().oneOf([yup.ref("password")],"Password Not Matched").required("Please Confirm Password")
})
