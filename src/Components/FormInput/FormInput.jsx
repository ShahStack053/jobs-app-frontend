import "./FormInput.css";

const FormInput = (props) => {
  const { lable, errorMessage, onChange, id, ...inputProps } = props;
  return (
    <div className="formInput">
      <label> {lable} </label>
      <input {...inputProps} onChange={onChange} />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
