import MultiSelect from "../../../common/MultiSelect";
import Select from "../../../common/Select";
import Input from "../../../common/Input";

import filtersConfig from "../../../configs/filters";

import { updateFilter } from "../../../utils/store/Features/Filters/filtersSlice";

import { useDispatch } from "react-redux";

import styles from "./styles.module.css";

const COMPONENT_MAPPING = {
  multi_select: MultiSelect,
  select: Select,
  input: Input,
};

const Filters = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (key, value) => {
    dispatch(updateFilter({ key, value }));
  };

  return (
    <div className={styles.filters_container}>
      {filtersConfig.map((filter) => {
        const { field_type = "", name = "", ...rest } = filter || {};
        const Field = COMPONENT_MAPPING?.[field_type] || (() => null);

        return (
          <div key={name} className={styles.filter_container}>
            <Field
              {...rest}
              onChange={(val) => handleFilterChange(name, val)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
