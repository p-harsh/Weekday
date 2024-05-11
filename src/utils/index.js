// a function to check value is empty - '', null, undefined, {}, [], "  " These all will give true
export const isEmpty = (value) => {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === "string" && value.trim() === "") {
    return true;
  }
  if (Array.isArray(value) && value.length === 0) {
    return true;
  }
  if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  }
  return false;
};

// check if a value is null
export const isNull = (value) => value === null;
