import { Fragment, useEffect, useState } from 'react';
import happyImg from './assets/gold-star.png';
import calendarImg from './assets/star.png';
import enterImg from './assets/smiling.png';
import waitingImg from './assets/happy.png';
import doneImg from './assets/done.png';
import './App.css';

const App: React.FC = () => {
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [pass, setPass] = useState("");
  const [logged, setLogged] = useState(false);
  const [isSettings, setSettings] = useState({mode: "set", sprintTarget: "", sprintLength: "", startDate: ""});
  const [isSprint, setSprint] = useState<any>({});

  const [isViewType, setViewType] = useState("");

  const today = new Date((new Date().getMonth() +1) + "/" + (new Date().getDate()) + "/" + new Date().getFullYear()).setHours(0,0,0,0);

  const settingsArray = [
    {label: "Sprint target", id: "sprintTarget", type: "text"},
    {label: "Sprint length", id: "sprintLength", type: "number"},
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
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(isSettings)
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
      })
      .catch(function(err) {
        console.log("Failed to fetch page: ", err);
      });
  };

  const handleDayTarget = (type: any) => {
    fetch("https://niki-workplace.ee/smot/index.php", {
      method: "post",
      mode: "no-cors",
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

      {isViewType === "Sofia" &&
        <>
          <div
            className='targetDayButton'
            onClick={() => handleDayTarget("child")}
          >
            <img
              className='smileImage'
              src={isSprint.status === "null" ? enterImg : isSprint.status === "waiting" ? waitingImg : happyImg}
            />
            <span className='waiting'>🕒</span>
          </div>
        </>
      }

      {isViewType === "Mom" &&
        <>
          {!logged &&
          <div className='settingsContainer'>
            <div className='inputBox'>
              <label htmlFor="pass">{"Mom pass: "}</label>
              <input id='pass' type="text" className='input' onChange={(e) => setPass(e.target.value)} />
            </div>
          </div>
          }

          {logged &&
            <>
              <div className='settingsContainer'>
                <h2 className='parrentViewTitle'>{"Set settings"}</h2>

                {settingsArray.map((item) =>
                  <div key={item.id} className='inputBox'>
                    <label htmlFor={item.id}>{item.label}</label>
                    <input id={item.id} type={item.type} className='input'
                      onChange={(e) => setSettings({...isSettings, [item.id]: e.target.value})}
                    />
                  </div>
                )}

                <div className='close' onClick={() => setLogged(false)}>close</div>
              </div>

              <div className='setButton' onClick={() => setData()}>Push</div>
            </>
          }
        </>
      }

      {(isViewType === "Mom" || isViewType === "Sofia") &&
        <>
          <h1>{isSprint.target}</h1>
          <div className='infoTable'>
            {isSprint.length && [...Array(+isSprint.length)].map((_item, i) =>
              <Fragment key={i + "table2"}>
                {addDays(new Date(isSprint.date), i) < new Date(today).getTime() ?
                  <div key={i + "item"}>
                    <img className='smileImage' src={happyImg} />
                    <img className='done' src={doneImg} />
                  </div> :

                  addDays(new Date(isSprint.date), i) > new Date(today).getTime() ?
                    <div key={i + "item"}>
                      <img className='smileImage' src={calendarImg} />
                    </div> :

                    <div key={i + "item"}>
                      <img
                        className='smileImage'
                        src={
                          isSprint.status === "null" ? enterImg : isSprint.status === "waiting" ? waitingImg : happyImg
                        }
                      />
                    </div>
                }
              </Fragment>
            )}
          </div>
        </>
      }
    </>
  );
};

export default App;
