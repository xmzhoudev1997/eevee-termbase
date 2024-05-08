import { history } from "@umijs/max";
import { useEffect } from "react";

export default () => {
  useEffect(() => {
    history.replace('/perform');
  }, []);
  return null;
}
