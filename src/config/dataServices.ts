import { collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { store } from "../store/store";

export const getProductsData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    const list = [];

    querySnapshot.forEach((item) => {
      list.push(item.data());
    });

    return list;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

export const fetchUserOrders=async()=>{
  try {
    const  userIdFromRedux=store.getState().userSlice.userData.uid;
    const userIdFromFireBase=auth.currentUser?.uid;

    const userOrderRef=collection(doc(db,"users",userIdFromFireBase),"orders")

    const querySnapshot=await getDocs(userOrderRef)
    const orderList=querySnapshot.docs.map((doc)=>({
      id:doc.id,
      ...doc.data()
    }))

    return orderList
  } catch (error) {
    
  }
}
