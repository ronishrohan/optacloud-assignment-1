import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";


export const addTransaction = async (transaction) => {
    try {
        const doc = await addDoc(collection(db, "transactions"), transaction);
        console.log("Document written with ID: ", doc.id);
    } catch (e) {
        console.log("Error adding document: ",e );
    }
}

export const readTransactions = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "transactions"));
        // console.log(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.log("Error reading transactions: ", e);
    }
}

export const deleteTransaction = async (id) => {
    try {
        await deleteDoc(doc(db, "transactions", id));
    } catch (e) {
        console.log("Error deleting transaction: ", e);
    }
}

export const editTransaction = async (id, transaction) => {
    try {
        await updateDoc(doc(db, "transactions", id), transaction);
    } catch (e) {
        console.log("Error editing transaction: ", e);
    }
}