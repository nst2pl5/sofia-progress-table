import { useState } from 'react';
import './App.css';
import ChildView from './components/ChildView';
import ParentView from './components/ParentView';

const App: React.FC = () => {
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [view, setView] = useState("");

  return (
    <>
      {view === "" &&
        <>
          <h1>{"Sofia motivation project ;)"}</h1>

          {!startModalOpen &&
            <div className="startButton" onClick={() => setStartModalOpen(!startModalOpen)}>Let's start </div>
          }

          {startModalOpen &&
            <div className="identyBox">
              <span className='identyTitle'>Who are you ?</span>

              <div className="identyButtons">
                <div className="identyButton" onClick={() => setView("child")}>Sofia</div>
                <div className="identyButton" onClick={() => setView("parent")}>Mom</div>
              </div>
            </div>
          }
        </>
      }

      {view === "child" && <ChildView />}
      {view === "parent" && <ParentView />}
    </>
  );
};

export default App;
