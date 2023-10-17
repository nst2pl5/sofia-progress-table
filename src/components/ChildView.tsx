import { useState } from 'react';
import '../App.css';
import happyImg from '../assets/happy.svg';
import likeImg from '../assets/like.svg';
import sadImg from '../assets/sad.svg';
import calendarImg from '../assets/calendar.svg';
import waitingImg from '../assets/waiting.svg';

const data1 = [
  {current: "done", likes: 2, unlikes: 0},
  {current: "done", likes: 4, unlikes: 0},
  {current: "waiting", likes: 0, unlikes: 3},
  {current: "undone", likes: 0, unlikes: 1},
  {current: "", likes: 0, unlikes: 0},
  {current: "", likes: 0, unlikes: 0},
  {current: "", likes: 0, unlikes: 0}
];

const ChildView: React.FC = () => {

  const [tableViewOpen, setTableViewOpen] = useState(false);

  const fetchTable = (setComplete?: boolean) => {
    setTableViewOpen(true);
    console.log(setComplete);
  };

  return (
    <>
      <h1 className='identyTitle' >{"Hello Sofia !"}</h1>

      {!tableViewOpen &&
        <>
          <h3>{"Did you finish today's task or just check the progress ?"}</h3>
          <div className='x1ButtonsBox'>
            <div className='x1Button' onClick={() => fetchTable(true)}>{"Finnish the task !"}</div>
            <div className='x1Button' onClick={() => fetchTable()}>{"Check the progress table !"}</div>
          </div>
        </>
      }

      {tableViewOpen &&
        <div className='tableWrapper'>
          {data1.map((item, i: number) =>
            <div key={i} className='dayProgressBox'>
              <span className='dayProgressBoxTitle'>Day {i +1}</span>
              <div className='progress'>
                <div className='progressHelperWrapper'>
                  {item.unlikes > 0 && [...Array(item.unlikes)].map(() =>
                    <div className='progressHelperBox'>
                      <img src={likeImg} className='unlike' />
                    </div>
                  )}
                </div>

                <div className='currentProgress'>
                  <img
                    src={
                      item.current === "done" ? happyImg :
                        item.current === "undone" ? sadImg :
                          item.current === "waiting" ? waitingImg : calendarImg
                    }
                    className='currentProgressImage'
                  />
                </div>

                <div className='progressHelperWrapper'>
                  {item.likes > 0 && [...Array(item.likes)].map(() =>
                    <div className='progressHelperBox'>
                      <img src={likeImg} className='like' />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      }

      <div className='back' onClick={() => location.reload()}>back</div>
    </>
  );
};

export default ChildView;