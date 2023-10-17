import { useEffect, useState } from 'react';
import imgUrl from '../assets/pablo.jpg';
import '../App.css';

const ChildView: React.FC = () => {

  const [pass, setPass] = useState("");
  const [view, setView] = useState(false);

  useEffect(() => {
    pass === "pass" && setView(true);
  }, [pass]);

  /*
    1) task refference
    2) days quantity

    3) allow child progress
    4) disable child progress

    5) left side negative 3 pcs
    6) right side positive 3 pcs
  */

  return (
    <>
      <div className='inputBox'>
        <label htmlFor="pass">{"Pass: "}</label>
        <input id='pass' type="text" className='input' onChange={(e) => setPass(e.target.value)} />
      </div>

      {view &&
        <div className='imageBox'>
          <img className='image' src={imgUrl} />
        </div>
      }

      <div className='back' onClick={() => location.reload()}>back</div>
    </>
  );
};

export default ChildView;