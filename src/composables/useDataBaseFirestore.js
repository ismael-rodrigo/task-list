import { addDoc, doc, setDoc,collection } from "firebase/firestore";
import db from "src/services/firebase/db";


export const useDataBaseFirestore = ()=>{

    const newDocWithId =async (document , subDocumentId , data)=>{
       return setDoc(doc(db , document , subDocumentId),data)
    }   

    const newDoc = async (document ,data)=>{
        return addDoc(collection(db, document),data)
    }


    return{
        newDocWithId,
        newDoc
    }


}