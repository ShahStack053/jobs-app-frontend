import "./FormInput.css";

const FormInput = (props) => {
  const { lable, errorMessage, onChange, id, ...inputProps } = props;
  return (
    <div className="input-form-div">
      <label className="input-label"> {lable} </label>
      <input className="form-input" {...inputProps} onChange={onChange} />
      <span className="input-span">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
