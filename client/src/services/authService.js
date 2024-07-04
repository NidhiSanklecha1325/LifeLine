import { userRegister, userLogin } from "../redux/features/auth/authActions"
import store from "../redux/store"

export const handleLogin = (e,email,password,role) =>{
    e.preventDefault()
    try {
        if (!role || !email || !password) {
            console.log(role + email + password)
            return alert("Please Privde All Feilds");
          }
          store.dispatch(userLogin({ email, password, role }));
        
        
    } catch (error) {
        
    }
}
export const handleRegister = (e,firstName,lastName,email,password,dateOfBirth,role) =>{
    e.preventDefault()
    try {
        store.dispatch(
            userRegister({
                firstName,
        lastName,
        role,
        email,
        password,
        dateOfBirth
            })
        )
        console.log("register", email)
    } catch (error) {

        console.log(error)
    }
}