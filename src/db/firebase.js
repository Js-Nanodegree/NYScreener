// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAnJSjK8SAP267JQHKy5xHWiBl2lb_KN8",
  authDomain: "zencar-client.firebaseapp.com",
  databaseURL: "https://zencar-client.firebaseio.com",
  projectId: "zencar-client",
  storageBucket: "zencar-client.appspot.com",
  messagingSenderId: "1004420877530",
  appId: "1:1004420877530:web:20ece9fba4b0f6ab27a9e3",
  measurementId: "G-TL136C3EFD",
};

const db = getFirestore(initializeApp(firebaseConfig));

const InitFunction = {
  from: 127,
  channel: ["132-24", "24-132"],
  async createMessage(message) {
    const newCityRef = doc(collection(db, "chat"));
    await setDoc(newCityRef, message);
  },
  myMessage() {
    const q = query(
      collection(db, "chat"),
      where("chanel", "in", this.channel)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data());
      });

      console.log(cities);
    });

    return unsubscribe;
  },
};

export default InitFunction