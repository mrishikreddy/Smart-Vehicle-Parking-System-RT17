"use client";

import { useEffect, useState } from "react";
import {
  ref,
  onChildAdded,
  onChildChanged,
  onValue,
} from "firebase/database";
import { database } from "./firebaseConfig";
import styles from "./page.module.css";

export default function Home() {
  const [history, setHistory] = useState([]);

  const [sensors, setSensors] = useState({
    dayornight: "",
    temp: "",
    humidity: "",
    concentration: "",
  });

  const [sensorHistory, setSensorHistory] = useState([]);
  const [slots, setSlots] = useState({
    slot1: false,
    slot2: false,
    slot3: false,
    slot4: false,
    slot5: false,
    slot6: false,
  });

  // === vehicle listeners ===
  useEffect(() => {
    const vehicleRef = ref(database, "vehicle");

    const addedUnsub = onChildAdded(vehicleRef, (snap) => {
      const d = snap.val();
      const rec = {
        vehicleNo: snap.key,
        type: d.vehicle_type,
        status: d.status,
        dateTime:
          d.status === "OUT" && d.out_time
            ? d.out_time
            : d.in_time,
      };
      setHistory((h) => [rec, ...h]);
    });

    const changedUnsub = onChildChanged(vehicleRef, (snap) => {
      const d = snap.val();
      const rec = {
        vehicleNo: snap.key,
        type: d.vehicle_type,
        status: d.status,
        dateTime:
          d.status === "OUT" && d.out_time
            ? d.out_time
            : d.in_time,
      };
      setHistory((h) => [rec, ...h]);
    });

    return () => {
      addedUnsub();
      changedUnsub();
    };
  }, []);

  // === sensor + slot listeners ===
  useEffect(() => {
    const sensorRef = ref(database, "admin");
    const unsub = onValue(sensorRef, (snap) => {
      const d = snap.val();
      if (!d) return;

      const now = new Date().toLocaleString();

      setSensors({
        dayornight: d.dayornight,
        temp: d.temp,
        humidity: d.humidity,
        concentration: d.concentration,
      });

      setSlots({
        slot1: d.slot1,
        slot2: d.slot2,
        slot3: d.slot3,
        slot4: d.slot4,
        slot5: d.slot5,
        slot6: d.slot6,
      });

      const newEntries = [
        { sensor: "Day/Night", value: d.dayornight, dateTime: now },
        { sensor: "Temp", value: d.temp, dateTime: now },
        { sensor: "Humidity", value: d.humidity, dateTime: now },
        { sensor: "Concentration", value: d.concentration, dateTime: now },
      ];
      setSensorHistory((h) => [...newEntries, ...h]);
    });

    return () => unsub();
  }, []);

  // helper to pick a color class for each sensor
  const getThresholdClass = (type, valueStr) => {
    const v = parseFloat(valueStr) || 0;
  
    if (type === "temp") {
      if (v <= 20) return styles.blue;
      if (v <= 25) return styles.green;
      if (v <= 30) return styles.orange;
      return styles.red;
    }
  
    if (type === "humidity") {
      if (v < 30) return styles.blue;
      if (v <= 50) return styles.green;
      if (v <= 70) return styles.orange;
      return styles.red;
    }
  
    if (type === "concentration") {
      if (v < 3000) return styles.blue;
      if (v <= 5000) return styles.green;
      if (v <= 7000) return styles.yellow;
      if (v <= 9000) return styles.orange;
      return styles.red;
    }
  
    return "";
  };
  

  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.title}>Smart Vehicle Parking System</div>
      </div>

      <div className={styles.descDiv}>
        <div>Parking Map</div>
        <div>Enivronment Data</div>
        </div>
      <div className={styles.outerDiv}>
      <div className={styles.leftDiv}>
          <div className={styles.parkingArea}>
            <div className={styles.parkingDiv}>
              <div className={styles.slotCorner}>
                <div
                  className={`${styles.slotCDiv} ${
                    slots.slot1 ? styles.occupied : ""
                  }`}
                >
                  Parking Slot 1
                </div>
              </div>

              <div className={styles.parkingSlotsDiv}>
              <div
                className={`${styles.slot} ${
                  slots.slot2 ? styles.occupied : ""
                }`}
              >
                Parking Slot 2
              </div>
              <div
                className={`${styles.slot} ${
                  slots.slot3 ? styles.occupied : ""
                }`}
              >
                Parking Slot 3
              </div>
              <div
                className={`${styles.slot} ${
                  slots.slot4 ? styles.occupied : ""
                }`}
              >
                Parking Slot 4
              </div>
              <div
                className={`${styles.slot} ${
                  slots.slot5 ? styles.occupied : ""
                }`}
              >
                Parking Slot 5
              </div>
              </div>
              {/* 
              <div
                className={`${styles.slot} ${
                  slots.slot2 ? styles.occupied : ""
                }`}
              >
                Parking Slot 2
              </div>
              <div
                className={`${styles.slot} ${
                  slots.slot3 ? styles.occupied : ""
                }`}
              >
                Parking Slot 3
              </div>
              <div
                className={`${styles.slot} ${
                  slots.slot4 ? styles.occupied : ""
                }`}
              >
                Parking Slot 4
              </div>
              <div
                className={`${styles.slot} ${
                  slots.slot5 ? styles.occupied : ""
                }`}
              >
                Parking Slot 5
              </div>
              */}
              <div className={styles.slotCorner}>
                <div
                  className={`${styles.slotCDiv} ${
                    slots.slot6 ? styles.occupied : ""
                  }`}
                >
                  Parking Slot 6
                </div> 
              </div>
            </div>
          </div>
          <div className={styles.entrance}>
            <div className={styles.ent}></div> E
            <div className={styles.ent}></div>
          </div>
        </div>
        <div className={styles.rightDiv}>
          <div className={styles.content}>
            <div
              className={`${styles.envData} ${
                sensors.dayornight.toLowerCase() === "day"
                  ? styles.day
                  : styles.night
              }`}
            >
              Day/Night: {sensors.dayornight}
            </div>
            <div className={`${styles.envData} ${getThresholdClass("temp", sensors.temp)}`}>
            Temp: {sensors.temp}°C
          </div>
          <div className={`${styles.envData} ${getThresholdClass("humidity", sensors.humidity)}`}>
            Humidity: {sensors.humidity}%
          </div>
          <div className={`${styles.envData} ${getThresholdClass("concentration", sensors.concentration)}`}>
            Concentration: {sensors.concentration}
          </div>
          <div className={styles.colorInfoDiv}>
              Very Safe:<div className={styles.blueInfo}></div>Safe:<div className={styles.greenInfo}></div>Caution:<div className={styles.yellowInfo}></div>Warning:<div className={styles.orangeInfo}></div>Dangerous:<div className={styles.redInfo}></div>
              Day:<div className={styles.dayInfo}></div>Night:<div className={styles.nightInfo}></div>
          </div>
          </div>
        </div>
      </div>

      <div className={styles.livedata}>
        <div className={styles.dashtitle}>Live Vehicle Data</div>
        <div className={styles.vehicleData}>
          <table>
            <thead>
              <tr>
                <th>Vehicle no</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date Time</th>
              </tr>
            </thead>
            <tbody>
              {history.map((v, i) => (
                <tr key={`${v.vehicleNo}-${i}`}>
                  <td>{v.vehicleNo}</td>
                  <td>{v.type}</td>
                  <td>{v.status}</td>
                  <td>{v.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.dashtitle}>Live Sensor Data</div>
        <div className={styles.vehicleData}>
        
          <table>
            <thead>
              <tr>
                <th>Sensors</th>
                <th>Value</th>
                <th>Date Time</th>
              </tr>
            </thead>
            <tbody>
              {sensorHistory.map((s, i) => (
                <tr key={`${s.sensor}-${i}`}>
                  <td>{s.sensor}</td>
                  <td>{s.value}</td>
                  <td>{s.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
