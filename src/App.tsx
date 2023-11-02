import { useEffect, useState } from 'react';
import happyImg from './assets/gold-star.png';
import calendarImg from './assets/star.png';
import enterImg from './assets/smiling.png';
import waitingImg from './assets/happy.png';
import './App.css';

const App: React.FC = () => {
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [pass, setPass] = useState("");
  const [logged, setLogged] = useState(false);
  const [isSettings, setSettings] = useState({mode: "set", sprintTarget: "", sprintLength: "", startDate: ""});
  const [isSprint, setSprint] = useState<any>({});

  const date = new Date(isSprint.date);
  /* const today = new Date((+new Date().getFullYear()) + "-" + (+new Date().getMonth() +1) + "-" + (+new Date().getDate())); */
  /* const today = (new Date().getMonth() +1) + "/" + (new Date().getDate()) + "/" + new Date().getFullYear(); */
  const today = new Date().getFullYear() + "-" + (new Date().getMonth() +1) + "-" + (new Date().getDate());

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
    return new Date(date.setDate(date.getDate() + number));
  };

  const db = {
    user: "d115507sa476123",
    pass: "MbRCs8VJ6Heda93i57",
    path: "d115507.mysql.zonevs.eu",
    name: "d115507sd525891"
  };

  db;

  return (
    <>
      {!startModalOpen &&
        <div className="startButton" onClick={() => setStartModalOpen(!startModalOpen)}>Let's start </div>
      }

      {startModalOpen &&
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

        <h1>{isSprint.target}</h1>

        <div className='srintWrapper'>
          {isSprint.length && [...Array(+isSprint.length)].map((_item, i) =>
            <div key={i} className='sprintItem'>
              <pre className='dateFont'>{addDays(date, i).toLocaleDateString()}</pre>

              {addDays(date, i).setHours(0,0,0,0) < new Date(today).setHours(0,0,0,0) ?
                <>
                  <img className='smileImage' src={happyImg} />
                  <span>{"Day before"}</span>
                </> :

                addDays(date, i).setHours(0,0,0,0) > new Date(today).setHours(0,0,0,0) ?
                  <>
                    <img className='smileImage' src={calendarImg} />
                    <span>{"Coming day"}</span>
                  </> :

                  <div
                    className='targetDayButton'
                    onClick={() => handleDayTarget(logged && isSprint.status === "waiting" ? "parent" : "child")}
                  >
                    {
                      `${addDays(date, i).setHours(0,0,0,0)} 
                      b/b  ${new Date(today).setHours(0,0,0,0)} 
                      c/c ${new Date().setHours(0,0,0,0)}`
                    }

                    <img
                      className='smileImage'
                      src={
                        isSprint.status === "null" ? enterImg : isSprint.status === "waiting" ? waitingImg : happyImg
                      }
                    />
                    <span>{"Today"}</span>
                  </div>
              }

              {
                `
                ${addDays(date, i).setHours(0,0,0,0)} 
                b/b  ${new Date(today).setHours(0,0,0,0)} 
                c/c ${new Date().setHours(0,0,0,0)}
                `
              }
            </div>
          )}
        </div>

        <div>{`${Math.floor(addDays(date, i).getTime() / 1000)} -/- ${Math.floor(today.getTime() / 1000)}`}</div>
      </>
      }
    </>
  );
};

export default App;
