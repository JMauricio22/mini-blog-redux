import "../../css/Spinner.scss";

const Spinner = () => (
  <div className='center'>
    <div className='lds-ripple'>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Spinner;
