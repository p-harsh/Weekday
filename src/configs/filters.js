const filtersConfig = [
  {
    name: "roles",
    field_type: "multi_select",
    placeholder: "Roles",
    options: [
      { label: "Frontend", value: "frontend" },
      { label: "IOS", value: "ios" },
      { label: "Android", value: "android" },
      { label: "Backend", value: "backend" },
      { label: "FullStack", value: "fullstack" },
      { label: "Flutter", value: "flutter" },
    ],
  },
  {
    name: "experience",
    field_type: "select",
    placeholder: "Min Experience",
    options: [
      { label: "0 years", value: "0" },
      { label: "1 years", value: "1" },
      { label: "2 years", value: "2" },
      { label: "3 years", value: "3" },
      { label: "4 years", value: "4" },
      { label: "5 years", value: "5" },
      { label: "6 years", value: "6" },
      { label: "7 years", value: "7" },
      { label: "8 years", value: "8" },
      { label: "9 years", value: "9" },
      { label: "10 years", value: "10" },
    ],
  },
  {
    name: "min_base_pay",
    field_type: "select",
    placeholder: "Minimum Base Pay Salary",
    options: [
      { label: "0", value: "0" },
      { label: "10", value: "10" },
      { label: "20", value: "20" },
      { label: "30", value: "30" },
      { label: "40", value: "40" },
      { label: "50", value: "50" },
    ],
  },
  {
    name: "preferred_location",
    field_type: "multi_select",
    placeholder: "Location",
    options: [
      { label: "Remote", value: "remote" },
      { label: "Hybrid", value: "hybrid" },
      { label: "In-Office", value: "office" },
    ],
  },
  {
    name: "location_search",
    field_type: "input",
    placeholder: "Search Location...",
  },
  {
    name: "company_name_query",
    field_type: "input",
    placeholder: "Search Company Name",
  },
];

export default filtersConfig;
