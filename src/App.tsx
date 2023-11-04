import { Fragment, useEffect, useState } from 'react';

import happyImg from './assets/gold-star.png';
import calendarImg from './assets/star.png';
import enterImg from './assets/smiling.png';
import waitingImg from './assets/happy.png';
import doneImg from './assets/done.png';
import princesImg from './assets/printses.png';

import './App.css';

import Sound from 'react-sound';

const App: React.FC = () => {
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [pass, setPass] = useState("");
  const [logged, setLogged] = useState(false);
  const [isSettings, setSettings] = useState({mode: "set", sprintTarget: "", sprintLength: "", startDate: ""});
  const [isSprint, setSprint] = useState<any>({});
  const [isViewType, setViewType] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isAudioWaiting, setAudioWaiting] = useState(false);
  const [isAudioDone, setAudioDone] = useState(false);
  const [isAudioMe, setAudioMe] = useState(false);
  const [isSettingsBlockOpen, setSettingsBlockOpen] = useState(false);

  const today = new Date((new Date().getMonth() +1) + "/" + (new Date().getDate()) + "/" + new Date().getFullYear()).setHours(0,0,0,0);

  const settingsArray = [
    {label: "Target", id: "sprintTarget", type: "text"},
    {label: "Length", id: "sprintLength", type: "number"},
    {label: "Start day", id: "startDate", type: "date"}
  ];

  useEffect(() => {
    pass === "pass" && setLogged(true);
  }, [pass]);

  useEffect(() => {
    fetch("https://niki-workplace.ee/smot/index.php", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({mode: "get"})
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        setSprint(json);
      })
      .catch(function(err) {
        console.log("Failed to fetch page: ", err);
      });
  },[]);

  const setData = () => {
    fetch("https://niki-workplace.ee/smot/index.php", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(isSettings)
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        setSprint(json);
      })
      .catch(function(err) {
        console.log("Failed to fetch page: ", err);
      });
  };

  const handleDayTarget = (type: any) => {
    fetch("https://niki-workplace.ee/smot/index.php", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({mode: type})
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        setSprint(json);
      })
      .catch(function(err) {
        console.log("Failed to fetch page: ", err);
      });
  };

  const addDays = (date: any, number: any) => {
    return new Date(date.setDate(date.getDate() + number)).setHours(0,0,0,0);
  };

  const Typewriter = ({ text, delay }: any) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setCurrentText(prevText => prevText + text[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, delay);

        return () => clearTimeout(timeout);
      }
    }, [currentIndex, delay, text]);

    return <span>{currentText}</span>;
  };

  const AudioWaiting = () => {
    setAudioWaiting(true);
    setTimeout(() => setAudioWaiting(false), 3000);
  };

  const AudioDone = () => {
    setAudioDone(true);
    setTimeout(() => setAudioDone(false), 4000);
  };

  const AudioMe = () => {
    setAudioMe(true);
    setTimeout(() => setAudioMe(false), 12000);
  };

  return (
    <>
      {!startModalOpen &&
        <div className="startButton" onClick={() => setStartModalOpen(!startModalOpen)}>{"Let's start"}</div>
      }

      {startModalOpen &&
        <div className='buttonsWrapper'>
          <div className='typeButton' onClick={() => setViewType("Sofia")}>{"Sofia"}</div>
          <div className='typeButton' onClick={() => setViewType("Mom")}>{"Mom"}</div>
        </div>
      }

      {isViewType === "Sofia" && isSprint &&
        <>
          <div
            className='targetDayButton'
            onClick={() => {
              isSprint.status === "null" && setPopupOpen(true);
              isSprint.status === "null" && handleDayTarget("child");
              isSprint.status === "waiting" && AudioWaiting();
              isSprint.status === "" && AudioDone();
            }}
          >

            <img
              className='smileImage'
              src={isSprint.status === "null" ? enterImg : isSprint.status === "waiting" ? waitingImg : happyImg}
            />

            {isSprint.status === "waiting" && <span className='waiting'>🕒</span>}
          </div>
        </>
      }

      {isAudioWaiting &&
        <Sound url={'https://www.niki-workplace.ee/smot/audio2.m4a'} playStatus={'PLAYING'} />
      }

      {isAudioDone &&
        <Sound url={'https://www.niki-workplace.ee/smot/audio3.m4a'} playStatus={'PLAYING'} />
      }

      {isViewType === "Mom" &&
        <>
          {!logged &&
          <div className='settingsContainer'>
            <div className='inputBox'>
              <label className='label' htmlFor="pass">{"Pass: "}</label>
              <input id='pass' type="text" className='input' onChange={(e) => setPass(e.target.value)} />
            </div>
          </div>
          }

          {logged &&
            <>
              <div className='settingsBlockButton' onClick={() => setSettingsBlockOpen(!isSettingsBlockOpen)}>
                {"New sprint"}
              </div>

              {isSettingsBlockOpen &&
                <div className='settingsBlock'>
                  <div className='settingsContainer'>
                    <h2 className='parrentViewTitle'>{"Add/Change"}</h2>

                    {settingsArray.map((item) =>
                      <div key={item.id} className='inputBox'>
                        <label htmlFor={item.id}>{item.label}</label>
                        <input id={item.id} type={item.type} className='input'
                          onChange={(e) => setSettings({...isSettings, [item.id]: e.target.value})}
                        />
                      </div>
                    )}

                    <div className='close' onClick={() => setLogged(false)}>LogOut</div>
                  </div>

                  <div className='setButton' onClick={() => setData()}>Push</div>
                </div>
              }

              {isSprint.status === "waiting" &&
                  <div
                    className='confirmButton'
                    onClick={() => {
                      handleDayTarget("parent");
                      AudioMe();
                    }}
                  >{"Confirm day target"}</div>
              }
            </>
          }
        </>
      }

      {isAudioMe && <Sound url={'https://www.niki-workplace.ee/smot/audio4.mp3'} playStatus={'PLAYING'} />}

      {(isViewType === "Mom" || isViewType === "Sofia") && isSprint &&
        <>
          <h1>{isSprint.target}</h1>
          <div className='infoTable'>
            {isSprint.length && [...Array(+isSprint.length)].map((_item, i) =>
              <Fragment key={i + "table2"}>
                <div key={i + "item"}>

                  <pre className='date'>
                    {new Date(
                      new Date(isSprint.date).setDate(new Date(isSprint.date).getDate() + i)
                    ).toLocaleDateString()}
                  </pre>

                  {addDays(new Date(isSprint.date), i) < new Date(today).getTime() ?
                    <>
                      <img className='smileImage' src={happyImg} />
                      <img className='done' src={doneImg} />
                    </>
                    :

                    addDays(new Date(isSprint.date), i) > new Date(today).getTime() ?
                      <>
                        <img className='smileImage' src={calendarImg} />
                      </>
                      :
                      <>
                        <img
                          className='smileImage'
                          src={
                            isSprint.status === "null" ? enterImg : isSprint.status === "waiting" ? waitingImg : happyImg
                          }
                        />
                        {isSprint.status === "" && <img className='done' src={doneImg} />}
                      </>

                  }
                </div>
              </Fragment>
            )}
          </div>
        </>
      }

      {isPopupOpen &&
        <div className='popupLayout'>
          <div className='popupWrapper'>
            <img className='printsesImage' src={princesImg} />

            <span className='popupText'>
              <Typewriter
                text="Ура... Молодец, похоже ты справилась с сегоднешним заданием, попроси маму подтвердить."
                delay={60}
              />
            </span>

            <Sound url={'https://www.niki-workplace.ee/smot/audio.m4a'} playStatus={'PLAYING'} />

            <div onClick={() => setPopupOpen(false)} className='popupClose'>
              {"OK"}
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default App;
