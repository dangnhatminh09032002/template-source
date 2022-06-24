import * as _ from "lodash";

export function splitCommaToArray(str: string): Array<string> {
  return _.map(_.split(str || "", ","), (url: string) => _.trim(url));
}
