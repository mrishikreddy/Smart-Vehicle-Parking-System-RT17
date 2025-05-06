"use client";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebaseConfig";

export default function Slots() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const dbRef = ref(database, "vehicle");


    const unsubscribe = onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      console.log("Fetched data:", val);
      setData(val);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Live Vehicle Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
