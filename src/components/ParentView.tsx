import { useEffect, useState } from 'react';
import imgUrl from '../assets/pablo.jpg';
import '../App.css';

const ChildView: React.FC = () => {

  const [pass, setPass] = useState("");
  const [view, setView] = useState(false);

  useEffect(() => {
    pass === "pass" && setView(true);
  }, [pass]);

  return (
    <>
      <label htmlFor="pass">{"Pass: "}</label>
      <input
        id='pass'
        type="text"
        className='input'
        onChange={(e) => setPass(e.target.value)}
      />

      {view &&
        <div className='imageBox'>
          <img className='image' src={imgUrl} />
        </div>
      }

    </>
  );
};

export default ChildView;