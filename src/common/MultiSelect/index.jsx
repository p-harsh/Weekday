import { useMemo, useRef, useState } from "react";

import {
  MdClose,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";

import styles from "./styles.module.css";

import { isEmpty } from "../../utils";
import Dropdown from "../Dropdown";

import useOutsideClick from "../../hooks/useOutsideClick";

const SelectedTile = ({ selected = {}, onRemove = () => {} }) => {
  return (
    <button
      onClick={(e) => e.stopPropagation()}
      className={styles.selected_tile}
    >
      <span className={styles.selected_tile_label}>{selected?.label}</span>
      <MdClose
        onClick={() => {
          onRemove(selected);
        }}
      />
    </button>
  );
};

const MultiSelect = ({
  options = [],
  defaultValue = [],
  onChange = () => {},
  placeholder = "",
}) => {
  const ref = useRef(null);
  const containerRef = useRef(null);

  const [selected, setSelected] = useState(defaultValue);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  useOutsideClick(containerRef, () => {
    setIsDropdownOpen(false);
  });

  const filterdOptions = useMemo(() => {
    const notSelectedOptions = options.filter(
      (o) => !selected.some((s) => s === o.value)
    );

    if (!searchQuery) return notSelectedOptions;

    return notSelectedOptions.filter((o) => o.value.includes(searchQuery));
  }, [options, searchQuery, selected]);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleUpdateSelectedOptions = (selectedChangeCallback = () => {}) => {
    setSelected((prev) => {
      const updatedValue = selectedChangeCallback(prev);
      onChange(updatedValue);
      return selectedChangeCallback(prev);
    });
  };

  const onOptionSelect = (option) => {
    handleUpdateSelectedOptions((prev) => [...prev, option.value]);
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  const onOptionRemove = (option) => {
    handleUpdateSelectedOptions((prev) =>
      prev.filter((o) => o !== option.value)
    );
    // setSelected((prev) =>  prev.filter(o => o !== option.value))
  };

  const handleInputKeyDown = (e) => {
    // backspace
    if (e.keyCode === 8) {
      if (searchQuery === "") {
        handleUpdateSelectedOptions((prev) => prev.slice(0, -1));
      }
      ref.current.blur();
      return;
    }
    // enter
    if (e.keyCode === 13) {
      if (!isEmpty(filterdOptions)) {
        handleUpdateSelectedOptions((prev) => [
          ...prev,
          filterdOptions?.[0]?.value,
        ]);
        // setSelected((prev) => ([...prev, filterdOptions?.[0]?.value]));
        setSearchQuery("");
      }
      return;
    }
  };

  const handleRemoveAllSelected = (e) => {
    e.stopPropagation();
    handleUpdateSelectedOptions(() => []);
  };

  return (
    <div
      className={styles.multiselect_container}
      tabIndex={0}
      role="button"
      ref={containerRef}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleToggleDropdown}
        className={`${styles.input_container} ${
          isDropdownOpen ? styles.focus_input_container : ""
        }`}
      >
        <div className={styles.selected_tile_container}>
          {selected.map((val) => (
            <SelectedTile
              onRemove={onOptionRemove}
              key={val}
              selected={options.find((o) => o.value === val)}
            />
          ))}
        </div>

        <input
          onKeyDown={handleInputKeyDown}
          className={styles.search_input}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value || "")}
          placeholder={placeholder}
        />

        {!isEmpty(selected) ? (
          <div>
            <MdClose color="gray" onClick={handleRemoveAllSelected} />
          </div>
        ) : null}

        <div className={styles.dropdown_arrow}>
          {isDropdownOpen ? (
            <MdKeyboardArrowUp fontSize={20} />
          ) : (
            <MdKeyboardArrowDown fontSize={20} />
          )}
        </div>
      </div>

      {isDropdownOpen ? (
        <Dropdown
          options={filterdOptions}
          searchQuery={searchQuery}
          onOptionSelect={onOptionSelect}
        />
      ) : null}
    </div>
  );
};

export default MultiSelect;
