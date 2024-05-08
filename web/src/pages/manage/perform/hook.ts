import { PERFORM_MANAGE, deletePerform, queryPerformList, queryTagList, updateAllPerformSource, updatePerformSort, updatePerformSource } from "@/services/manage";
import { ActionSheet, Dialog, Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { history } from "umi";

export default () => {
  const [sort, setSort] = useState(false);
  const [list, setList] = useState<PERFORM_MANAGE[]>([]);
  const [map, setMap] = useState<Record<number, string>>({});
  const handlePerformData = async () => {
    Toast.show({
      duration: 0,
      content: '加载中',
      icon: 'loading',
    })
    queryPerformList()
      .then((d) => {
        Toast.clear();
        setList(d);
      })
      .catch((err) => {
        Toast.show({
          duration: 500,
          content: '数据加载失败',
          icon: 'error'
        })
      })
  }
  const handleTagData = async () => {
    Toast.show({
      duration: 0,
      content: '加载中',
      icon: 'loading',
    })
    queryTagList(1)
      .then((d) => {
        Toast.clear();
        const map: Record<number, string> = {};
        d.forEach((item) => {
          map[item.id] = item.name;
        });
        setMap(map);
      })
      .catch((err) => {
        Toast.show({
          duration: 500,
          content: '数据加载失败',
          icon: 'error'
        })
      })
  }
  const handleAction = (perform: PERFORM_MANAGE) => {
    const func = ActionSheet.show({
      actions: perform.schedule ? [
        {
          key: 'detail',
          text: '编辑',
          onClick: () => {
            func.close();
            handleJump(perform.id)
          },
        },
        {
          key: 'update',
          text: '更新资源',
          onClick: () => {
            func.close();
            hanleUpdateSource(perform.id)
          },
        },
        {
          key: 'delete',
          text: '删除',
          danger: true,
          onClick: () => {
            func.close();
            handleDelete(perform)
          }
        },
      ] : [
        {
          key: 'detail',
          text: '编辑',
          onClick: () => {
            func.close();
            handleJump(perform.id)
          },
        },
        {
          key: 'delete',
          text: '删除',
          danger: true,
          onClick: () => {
            func.close();
            handleDelete(perform)
          }
        },
      ]
    })
  }
  const handleDelete = (perform: PERFORM_MANAGE) => {
    Dialog.confirm({
      content: `确定删除节目【${perform.name}】?`,
      confirmText: '删除',
      cancelText: '取消',
      onConfirm: () => {
        Toast.show({
          duration: 0,
          content: '处理中',
          icon: 'loading',
        })
        deletePerform(perform.id)
          .then(() => {
            Toast.show({
              duration: 500,
              content: '删除成功',
              icon: 'success'
            })
            handlePerformData();
          })
          .catch((err) => {
            Toast.show({
              duration: 500,
              content: '数据操作失败',
              icon: 'error'
            })
          })
      }
    })
  }
  const handleAddAction = () => {
    history.push(`/manage/perform/-1`);
  }
  const handleSort = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const [removed] = list.splice(result.source.index, 1)
    list.splice(result.destination.index, 0, removed);
    setList([...list])
    Toast.show({
      duration: 0,
      content: '处理中',
      icon: 'loading',
    })
    updatePerformSort(removed?.id || 0, result.destination.index + 1)
      .then(() => {
        Toast.show({
          duration: 500,
          content: '排序成功',
          icon: 'success'
        })
      })
      .catch((err) => {
        Toast.show({
          duration: 500,
          content: '数据操作失败',
          icon: 'error'
        })
      })
  }
  const hanleUpdateSource = (id: number) => {
    Toast.show({
      duration: 0,
      content: '处理中',
      icon: 'loading',
    })
    updatePerformSource(id)
      .then(() => {
        Toast.show({
          duration: 500,
          content: '更新成功',
          icon: 'success'
        })
        handlePerformData();
      })
      .catch((err) => {
        Toast.show({
          duration: 500,
          content: '数据操作失败',
          icon: 'error'
        })
      })
  }
  const hanleUpdateAllSource = () => {
    Toast.show({
      duration: 0,
      content: '处理中',
      icon: 'loading',
    })
    updateAllPerformSource()
      .then(() => {
        Toast.show({
          duration: 500,
          content: '更新成功',
          icon: 'success'
        })
        handlePerformData();
      })
      .catch((err) => {
        Toast.show({
          duration: 500,
          content: '数据操作失败',
          icon: 'error'
        })
      })
  }
  const handleBack = () => {
    history.back();
  }
  const handleJump = (id: number) => {
    history.push(`/manage/perform/${id}`)
  };
  useEffect(() => {
    handleTagData();
    handlePerformData();
  }, []);
  return {
    sort, list, map,
    handlePerformData,
    handleSort,
    handleBack,
    handleAddAction,
    hanleUpdateAllSource,
    handleAction,
    hanleSortAction: () => setSort(!sort)
  };
}