import { useState } from "react";

import styles from "./styles.module.css";
import { MdClose } from "react-icons/md";

const Input = ({ onChange = () => {}, defaulValue = "", ...rest }) => {
  const [val, setVal] = useState(defaulValue);

  const handleInputChange = (e) => {
    setVal(e.target.value);
    onChange(e.target.value);
  };

  const handleClearInput = () => {
    setVal("");
    onChange("");
  };

  return (
    <div className={styles.input_container}>
      <input
        type="text"
        onChange={handleInputChange}
        value={val}
        className={styles.input_query}
        {...rest}
      />

      {val ? (
        <MdClose
          onClick={handleClearInput}
          className={styles.close_icon}
          color="gray"
          fontSize={16}
        />
      ) : null}
    </div>
  );
};

export default Input;
