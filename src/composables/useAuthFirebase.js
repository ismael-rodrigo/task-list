
import {getAuth ,signInWithEmailAndPassword ,onAuthStateChanged} from 'firebase/auth'
export const useAuthFirebase = ()=>{

    const auth = getAuth()

    const loginDefault = async (email,password)=>{
       return signInWithEmailAndPassword(auth, email, password)
    }

    const isAuthenticated = (callback)=>{
         if(!auth.currentUser)return false
         else{
             return true
         }
    }
    

    const userLogout =async ()=>{
        auth.signOut()
    }

    return{
        auth,
        loginDefault,
        isAuthenticated,
        userLogout

    }


}