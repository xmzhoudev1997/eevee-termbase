import { PERFORM_CLASS, queryPerformList } from "@/services/perform";
import { Toast } from "antd-mobile";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default (
) => {
  const [list, setList] = useState<PERFORM_CLASS[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const performId = Number(searchParams.get('performId')) || 0;
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const handlePerformChange = (key: number) => {
    searchParams.set('performId', key);
    setSearchParams(searchParams, { replace: true })
  }
  const handleData = () => {
    Toast.show({
      duration: 0,
      content: '加载中',
      icon: 'loading',
    })
    queryPerformList()
      .then((d) => {
        Toast.clear();
        setList(d);
        setOpenKeys(d.map(d => d.name));
      })
      .catch((err) => {
        Toast.show({
          duration: 500,
          content: '数据操作失败',
          icon: 'error'
        })
      })
  }
  useEffect(() => {
    handleData();
  }, []);
  return {
    performList: list,
    performId,
    handlePerformChange,
    openKeys,
    handleOpenKeyChange: setOpenKeys,
  }
}