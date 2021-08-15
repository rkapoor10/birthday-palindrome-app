import React, { useState } from "react";
import loadGif from "./gif/loading.gif";

import "./styles.css";

export default function App() {
  const [date, setDate] = useState([]);
  const [ansFormat, setAnsFormat] = useState(["", "", ""]);
  const [format, setFormat] = useState("");
  const [newDate, setNewDate] = useState([0, 0, 0]);
  const [days, setDays] = useState(0);
  const [output, setOutput] = useState(["none", "none"]);

  let count = -1;

  function run(e) {
    e.preventDefault();
    const dateArray = date.split("-");

    let dd = dateArray[2];
    let mm = dateArray[1];
    let yyyy = dateArray[0];

    let ans = checkForAll(dd, mm, yyyy);
    if (ans === 1) {
      setOutput(["block", "none"]);
    } else {
      let find = findNearest(dd, mm, yyyy);
      if (find === 1) {
        setDays(count);
        setOutput(["none", "block"]);
      } else console.log("Not found", find);
    }
  }

  function checkForAll(day, month, year) {
    let dd = day.toString();
    let mm = month.toString();
    let yyyy = year.toString();
    const dateFormat1 = yyyy + mm + dd;
    const dateFormat2 = dd + mm + yyyy;
    const dateFormat3 = mm + dd + yyyy.substring(2);
    const dateFormat4 = Number(mm) + dd + yyyy;
    let result = CheckPlaindrome(dateFormat1);
    setFormat("yyyymmdd");
    setAnsFormat([dd, mm, yyyy]);

    if (result === 0) {
      result = CheckPlaindrome(dateFormat2);
      setFormat("ddmmyyyy");
    }
    if (result === 0) {
      result = CheckPlaindrome(dateFormat3);
      setFormat("mmddyy");
    }
    if (result === 0) {
      result = CheckPlaindrome(dateFormat4);
      setFormat("mddyyyy");
    }

    return result;
  }

  function CheckPlaindrome(dateFormat) {
    let len = dateFormat.length;

    for (let i = 0, j = len - 1; i < Math.floor(len / 2); i++, j--) {
      if (dateFormat[i] !== dateFormat[j]) {
        return 0;
      }
    }
    return 1;
  }

  function findNearest(day, month, year) {
    let dd = Number(day);
    let mm = Number(month);
    let yyyy = Number(year);
    console.log("inside find nearest for ", dd, mm, yyyy);

    if (mm > 12) {
      mm = 1;
      dd = 1;
      yyyy = yyyy + 1;
    }
    let limit = 31;

    if (mm === 2) {
      if (yyyy % 400 === 0) {
        limit = 29;
      } else if (yyyy % 100 !== 0 && yyyy % 4 === 0) {
        limit = 29;
      } else {
        limit = 28;
      }
    } else if (mm < 8) {
      if (mm % 2 === 0) limit = 30;
      else limit = 31;
    } else if (mm > 8) {
      if (mm % 2 === 0) limit = 31;
      else limit = 30;
    }

    for (let i = dd; i <= limit; i++) {
      console.log(dd, mm, yyyy);
      count = count + 1;
      let ans = checkForAll(setinput(dd), setinput(mm), yyyy);
      console.log(ans);
      if (ans === 1) {
        setNewDate([dd, mm, yyyy]);
        return 1;
      }
      dd = dd + 1;
    }
    dd = 1;
    mm = mm + 1;
    let v = findNearest(dd, mm, yyyy);
    return v;
  }

  function setinput(ss) {
    if (ss < 10) {
      ss = ss.toString();
      ss = "0" + ss;
    }
    return ss;
  }
  return (
    <div className="App">
      <div className="container">
        <h1>Birthday Palindrome App</h1>
        <h3>Check if your birthday is a Palindrome.</h3>
        <p>
          A palindrome is a word/number which reads the same backward as forward
        </p>
        <p>
          This app checks your birthdate in 4 formats yyyy-mm-dd, dd-mm-yyyy,
          mm-dd-yy, m-dd-yyyy. E.G. if your birthdate is 01 Sept 2001, then app
          will check for 20010901, 01092001, 090101, 1092001
        </p>
        <form onSubmit={run}>
          <input
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            required
          ></input>

          <button type="submit">click</button>
        </form>

        <p style={{ display: `${output[0]}` }}>
          {date} is a palindrome in {format} format 🥳🥳
        </p>

        <p style={{ display: `${output[1]}` }}>
          {date} is not a palindrome. The nearest palindrome is found after{" "}
          {days} days for date {ansFormat[0]}-{ansFormat[1]}-{ansFormat[2]} in{" "}
          {format} format
        </p>
      </div>
    </div>
  );
}
