import { history, useLocation } from "@umijs/max";
import { useMemo } from "react";

export default () => {
  const { pathname } = useLocation();
  const menuKey = useMemo(() => {
    return pathname.split('/')[1] || '';
  }, [pathname]);
  const handleMenuSelect = (key: string) => {
    history.replace(`/${key}`);
  }
  return {
    menuKey,
    handleMenuSelect,
  };
}