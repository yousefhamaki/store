"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function QueryCheck(query, params) {
    const result = [];
    for (const key in params) {
        const stand = params[key].split("|");
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
        }
    }
    return result;
}
exports.default = QueryCheck;
