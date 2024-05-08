import { addManageAuth, checkManageAuth } from "@/services/manage";
import { useLocalStorageState, useSetState } from "ahooks";
import { Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import { history } from "umi";

export default () => {
  const [dialog, setDialog] = useSetState<{
    visible: boolean,
    token: string,
  }>({
    visible: false,
    token: '',
  });
  const [admin, setAdmin] = useLocalStorageState('XM_TV_ADMIN', {
    defaultValue: false,
  });
  const handleManageShowChange = () => {
    Toast.show(admin ? '管理功能已关闭' : '管理功能已打开' );
    setAdmin(!admin);
  }
  const handleJumpTagManage = async () => {
    if (!await handleCheckAuth()) {
      return;
    }
    history.push('/manage/tag');
  }
  const handleJumpPerformManage = async () => {
    if (!await handleCheckAuth()) {
      return;
    }
    history.push('/manage/perform');
  }
  const handleCheckAuth = async () => {
    if (!admin) {
      return false;
    }
    const auth = await checkManageAuth().catch(() => false);
    if (!auth) {
      setDialog({
        visible: true,
        token: '',
      })
    }
    return auth;
  }
  const handleCheck = () => {
    Toast.show({
      icon: 'loading',
      content: '校验中',
      duration: 0,
    })
    addManageAuth(dialog.token)
    .then(() => {
      Toast.show({
        icon: 'success',
        content: '提交成功',
        duration: 500,
      });
      handleCancelAction();
    })
    .catch(() => {
      console.log(1);
      Toast.show({
        icon: 'fail',
        content: '令牌错误',
        duration: 500,
      })
    })
  }
  const handleUpdateTokenAction = (v: string) => {
    setDialog({
      token: v,
    });
  }
  const handleCancelAction = () => {
    setDialog({
      visible: false,
      token: '',
    });
  }
  useEffect(() => {
    handleCheckAuth();
  }, [admin]);
  return {
    showManage: admin,
    handleManageShowChange,
    handleJumpTagManage,
    handleJumpPerformManage,
    ...dialog,
    handleCancelAction,
    handleUpdateTokenAction,
    handleCheck,
  };
}