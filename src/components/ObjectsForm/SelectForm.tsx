import React, { useContext } from "react";

import "./styles.css";

import ItemsContext from "./context";

interface Props {
  title: String;
  frist: string;
  name: string;
  id: string;
}

const InputForm: React.FC<Props> = ({ title, frist, name, id }) => {
  const { handleSelected, ufs, cities } = useContext(ItemsContext);

  return (
    <div className="field">
      <label htmlFor={name}>{title}</label>
      <select
        name={name}
        id={id}
        onChange={(event) => handleSelected(name, event)}
      >
        <option value="0">{frist}</option>
        {name === "uf"
          ? ufs.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))
          : name === "city"
          ? cities.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};

export default InputForm;
