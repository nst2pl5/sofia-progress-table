import '../App.css';

const ChildView: React.FC = () => {

  return (
    <>
      <h1 className='identyTitle' >{"Hello Sofia !"}</h1>
      <div>
        <h3>{"Did you finish today's task or just check the progress ?"}</h3>
        <div className='x1ButtonsBox'>
          <div className='x1Button' onClick={() => console.log("")}>{"Finnish the task !"}</div>
          <div className='x1Button' onClick={() => console.log("")}>{"Check the progress table !"}</div>
        </div>
      </div>

    </>
  );
};

export default ChildView;