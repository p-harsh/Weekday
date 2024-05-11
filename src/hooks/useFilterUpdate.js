import { useSelector } from "react-redux";
import { isEmpty, isNull } from "../utils";
import { useCallback } from "react";

const useFilterUpdate = () => {
  const filters = useSelector((state) => state.filters);

  const getFilteredList = useCallback(
    (d) => {
      let list = d || [];
      if (!isEmpty(filters?.roles)) {
        list = list.filter((jd) =>
          (filters?.roles || [])?.includes(jd?.jobRole)
        );
      }

      if (!isEmpty(filters?.experience)) {
        list = list.filter(
          (jd) => !isNull(jd?.minExp) && jd?.minExp >= filters?.experience
        );
      }

      if (!isEmpty(filters?.preferred_location)) {
        list = list.filter((jd) => {
          // check if location is available or not
          if (isNull(jd?.location)) {
            return false;
          }
          // check if hybrid then return all the jobs
          if (filters?.preferred_location?.includes("hybrid")) {
            return true;
          }
          if (filters?.preferred_location?.includes("remote")) {
            if (filters?.preferred_location?.includes("office")) {
              // if remote and office both then return all the jobs
              return true;
            }
            // if only remote is selected then return only remote jobs
            return jd?.location?.toLowerCase() === "remote";
          }
          // if only office is selected, then return all non-remote jobs
          if (filters?.preferred_location?.includes("office")) {
            return jd?.location?.toLowerCase() !== "remote";
          }
          return false;
        });
      }

      if (!isEmpty(filters?.location_search)) {
        list = list.filter(
          (jd) =>
            !isNull(jd?.location) &&
            jd?.location
              ?.toLowerCase()
              .includes(filters?.location_search?.toLowerCase())
        );
      }

      if (!isEmpty(filters?.min_base_pay)) {
        list = list.filter(
          (jd) =>
            !isNull(jd?.minJdSalary) &&
            (jd?.minJdSalary || 0) >= filters?.min_base_pay
        );
      }

      if (!isEmpty(filters?.company_name_query)) {
        list = list.filter(
          (jd) =>
            !isNull(jd?.companyName) &&
            (jd?.companyName || "")
              ?.toLowerCase()
              ?.includes(filters?.company_name_query?.toLowerCase())
        );
      }

      return list;
    },
    [filters]
  );

  return { getFilteredList };
};

export default useFilterUpdate;
