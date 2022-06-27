// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function QueryCheck(
  query: {
    [key: string]: string | qs.ParsedQs | string[] | qs.ParsedQs[] | undefined;
  },
  params: { [key: string]: string }
): string[] {
  const result: string[] = [];
  for (const key in params) {
    const stand: string[] = params[key].split("|");
    if (stand.indexOf("required") > -1) {
      if (!query[key]) {
        result[result.length] = "oops! " + key + " is Required";
      }
    }
    if (query[key]) {
      if (stand.indexOf("number") > -1) {
        if (isNaN(Number(query[key]))) {
          result[result.length] = "oh! oh " + key + " must be number";
        }
      }

      if (stand.indexOf("array") > -1) {
        if (!Array.isArray(query[key])) {
          result[result.length] = "oh! oh " + key + " must be array";
        }
      }
    }
  }
  return result;
}

export default QueryCheck;
