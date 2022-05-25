import { addDoc, doc, setDoc,collection,getDoc,getDocs  ,query} from "firebase/firestore";
import db from "src/services/firebase/db";


export const useDataBaseFirestore = ()=>{

    const newDocWithId =async (collect , documentId , data)=>{
       return setDoc(doc(db , collect , documentId),data)
    }   

    const newDoc = async (document ,data)=>{
        return addDoc(collection(db, document),data)
    }


    const getDocument = async (collection ,document )=>{
        const docRef =  doc(db, collection , document);
        const docSnap = await getDoc(docRef);
        return docSnap.data()
    }

    const getCollection = async(collect)=>{
        let result =[]
        const querySnapshot = await getDocs(collection(db,collect));
        querySnapshot.forEach((doc) => {
            result = [...result , doc.data()]
          })
        return result
    }

    const getCollectionByFilter = async(collect , filter )=>{
        let result =[]
        const q = query(collection(db, collect), filter);
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result = [...result , doc.data()]
        
        })
        return result
    }





    return{
        newDocWithId,
        newDoc,
        getDocument,
        getCollection,
        getCollectionByFilter
    }


}