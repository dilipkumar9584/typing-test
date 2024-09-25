import logo from './logo.svg';
import './App.css';
import { data } from './data';
import { useState } from 'react';
function App() {

  let [inputdata, setinputdata] = useState('')
  let [index, setIndex] = useState(0)
  let [alertc, setalert] = useState(false)
  let [score, setScore] = useState(0)
  let [nscore, setNscore] = useState(0)
  let [second, setSecond] = useState(60)
  let [tr, settr] = useState(true)
  let [gspeed, setGspeed] = useState(0)
  let [nspeed, setNspeed] = useState(0)
  let [acc, setAcc] = useState(100)
  function col(inde, index, alertcolor) {
    if (inde == index) {
      if (alertc) { return "redcol" }
      else { return "color" }
    }
    else { return ""; }
  }





  function scoreCall() {
    let subbox = document.querySelector(".subbox");
    let subbox2 = document.querySelector(".subbox2");
    subbox.style.display = "none"
    subbox2.style.display = "flex"

  }
  function restarttest() {
    let subbox = document.querySelector(".subbox");
    let subbox2 = document.querySelector(".subbox2");
    subbox.style.display = "flex"
    subbox2.style.display = "none"
    setIndex(0)
    setScore(0)
    setSecond(60)
    setNscore(0)
    settr(true)


  }






  return (
    <div className='box'>
      <div className='subbox'>
        <h1>Typing Test</h1>
        <p className='allp'>{data.map((v, i) => {
          return <span className={col(i, index, alertc)} key={i}>{v + " "}</span>
        })}</p>
        <div className='inputsec'>
          <input className='input' value={inputdata}
            onChange={(e) => {
              let input = document.querySelector(".btn")
              setinputdata(e.target.value)
              //time update
              if (tr) {
                let sec = 60;
                if (sec >= 60) {

                  let setint = setInterval(() => {
                    input.innerHTML = sec
                    sec = sec - 1
                    if (sec < 0) {
                      input.innerHTML = "60"
                      clearInterval(setint)
                      sec = 60;
                      scoreCall();
                    }
                  }, 1000);
                  settr(false)
                }
              }
              //input space function
              if (e.target.value[e.target.value.length - 1] == " ") {

                //calculate typing speed
                let grosspeed = (score + nscore);
                let netSpeed = grosspeed - (nscore)
                let accuracy = Math.floor(score / (score + nscore) * 100)
                setNspeed(netSpeed)
                setGspeed(grosspeed)
                setAcc(accuracy)
                //data checking and updating
                if (data[index] == inputdata) {
                  setScore(score + 1)
                } else {
                  setNscore(nscore + 1)
                }
                //changing word
                setinputdata("")
                setIndex(index + 1)
              } else {
                //input data checking and showing alert in allp class
                let checkdata = data[index];
                let cur = e.target.value
                for (let i = 0; i < cur.length; i++) {
                  if (checkdata[i] != cur[i]) {
                    setalert(true)
                  }
                  else {
                    let checkdata2 = checkdata.slice(0, i)
                    let cur2 = cur.slice(0, i)
                    if (checkdata2 != cur2) {
                      setalert(true)
                    }
                    else {
                      setalert(false)
                    }
                  }
                }
              }
            }
            } autoFocus placeholder='Type here...' type='text'></input>
          <button className='button btn'>{second}</button>
          <button className='button'>{score}</button></div>
      </div>
      <div className='subbox2'>
        <p className='ptag'>Your Typing Speed is calculated</p>
        <div className='rows'>
          <span className='span'>Gross Speed</span>
          <span className='span'>{gspeed} WPM</span>
        </div>
        <div className='rows'>
          <span className='span'>Accuracy</span>
          <span className='span'>{acc}%</span>
        </div>
        <div className='rows'>
          <span className='span'>Net Speed</span>
          <span className='span'>{nspeed} WPM</span>
        </div>
        <button className='restart' onClick={() => { restarttest() }}>Restart typing test</button>
      </div>
    </div>
  );
}
export default App;
