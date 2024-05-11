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

const Select = ({
  options = [],
  defaultValue = "",
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
    if (!searchQuery) return options;

    return options.filter((o) => o.value.includes(searchQuery));
  }, [options, searchQuery]);

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const onOptionSelect = (option) => {
    setSelected(option.value);
    onChange(option.value);
    setIsDropdownOpen(false);
    setSearchQuery("");
  };

  const handleInputKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (!isEmpty(filterdOptions)) {
        const updatedVal = filterdOptions?.[0]?.value;
        setSelected(updatedVal);
        onChange(updatedVal);
        setIsDropdownOpen(false);
        setSearchQuery("");
        ref.current.blur();
      }
    }
  };

  const handleInputFocus = () => {
    setSearchQuery(selected);
  };

  const handleRemoveAllSelected = (e) => {
    e.stopPropagation();
    setSelected("");
    onChange("");
  };

  return (
    <div className={styles.multiselect_container} ref={containerRef}>
      <div
        role="button"
        onClick={handleToggleDropdown}
        className={`${styles.input_container} ${
          isDropdownOpen ? styles.focus_input_container : ""
        }`}
      >
        <input
          onKeyDown={handleInputKeyDown}
          className={styles.search_input}
          value={isDropdownOpen ? searchQuery : selected}
          onFocus={handleInputFocus}
          onChange={(e) => setSearchQuery(e?.target?.value || "")}
          placeholder={selected || placeholder}
          ref={ref}
        />
        {!isEmpty(selected) ? (
          <div>
            <MdClose
              color="gray"
              fontSize={16}
              onClick={handleRemoveAllSelected}
            />
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

export default Select;
