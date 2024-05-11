import styles from "./styles.module.css";
import { isEmpty } from "../../utils";

const DropdownTile = ({ option = {}, onSelect = () => {}, index = -1 }) => {
  return (
    <button
      className={`${styles.dropdown_tile} ${
        index === 0 ? styles.to_be_selcted_tile : ""
      }`}
      onClick={() => {
        onSelect(option);
      }}
    >
      {option?.label}
    </button>
  );
};

const Dropdown = ({
  options = [],
  searchQuery = "",
  onOptionSelect = () => {},
}) => {
  return (
    <div className={styles.dropdown_container}>
      {isEmpty(options) ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.empty_options}
        >
          No Options Available
        </div>
      ) : null}

      {options.map((option, ind) => (
        <DropdownTile
          index={searchQuery ? ind : -1}
          key={option.value}
          option={option}
          onSelect={onOptionSelect}
        />
      ))}
    </div>
  );
};

export default Dropdown;
