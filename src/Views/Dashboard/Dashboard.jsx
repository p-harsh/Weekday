import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import JobCard from "./JobCard";

import useFetch from "../../hooks/useFetch";
import useFilterListUpdate from "../../hooks/useFilterUpdate";

import styles from "./styles.module.css";

import Filters from "./Filters";

const JOB_LIST_LIMIT = 10;

const SCROLL_BUFFER = 550;

const Dashboard = () => {
  // a hook to update the list depending on applied filters
  const { getFilteredList = () => {} } = useFilterListUpdate();

  const [page, setPage] = useState(1);

  const [jdList, setJdList] = useState([]);

  const [totalCount, setTotalCount] = useState(0);

  // ref for job cards container to get its offset-height
  const ref = useRef(null);

  // hook to fetch JD list
  const { loading = false, fetchData: fetchJobsList = () => {} } = useFetch({
    url: "https://api.weekday.technology/adhoc/getSampleJdJSON",
    method: "POST",
  });

  // function to handle jobs list after fetching
  const handleUpdateJdData = useCallback((data) => {
    setJdList((prev) => [...prev, ...(data?.jdList || [])]);
    setTotalCount(data?.totalCount || 0);
  }, []);

  useEffect(() => {
    // using abort signal to abort the fetch request if component unmount
    const controller = new AbortController();
    const signal = controller.signal;

    // depending on current page, change the offset to fetch required data
    fetchJobsList({
      payload: { limit: JOB_LIST_LIMIT, offset: JOB_LIST_LIMIT * (page - 1) },
      handleUpdateJdData,
      signal,
    });

    return () => controller.abort();
  }, [page, fetchJobsList, handleUpdateJdData]);

  // check if current page is last page, depending on total count of jobs
  const isLastPage = useMemo(
    () => page * JOB_LIST_LIMIT >= totalCount,
    [page, totalCount]
  );

  // infinite scroller, which uses height of window and height of the component to fetch data
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >
        ref?.current?.offsetHeight + ref?.current?.offsetTop - SCROLL_BUFFER &&
      !loading &&
      !isLastPage
    ) {
      setPage((prev) => prev + 1);
    }
  }, [loading, isLastPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // cleanup on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  console.log(1, jdList);

  const list = useMemo(
    () => getFilteredList(jdList),
    [jdList, getFilteredList]
  );

  return (
    <div className={styles.dashboard_container}>
      <Filters />

      <div className={styles.job_cards_container} ref={ref}>
        {(list || [])?.map((job) => (
          <div key={job?.jdUid} className={styles.job_card_container}>
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
