import React, { useContext } from "react";

import "./styles.css";

import ItemsContext from "./context";

interface Props {
  title: String;
  type: string;
  name: string;
  id: string;
}

const InputForm: React.FC<Props> = ({ title, type, name, id }) => {
  const { handleInputChange } = useContext(ItemsContext);

  return (
    <div className="field">
      <label htmlFor={name}>{title}</label>
      <input type={type} name={name} id={id} onChange={handleInputChange} />
    </div>
  );
};

export default InputForm;
