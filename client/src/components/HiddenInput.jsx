const HiddenInput = ({ type, name, id, onChange }) => {
  return <input className="hidden" type={type} name={name} id={id} onChange={onChange} />;
};

export default HiddenInput;
