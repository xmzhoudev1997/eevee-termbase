import { TAG_COUNT, addTag, deleteTag, queryTagList, updateTagName, updateTagSort } from "@/services/manage";
import { useSetState } from "ahooks";
import { ActionSheet, Dialog, Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { history, useParams } from "umi";

export default () => {
  const [dialog, setDialog] = useSetState<{
    tagId: number,
    tagName: string,
  }>({
    tagId: 0,
    tagName: '',
  });
  const paramMap = useParams();
  const [sort, setSort] = useState(false);
  const [list, setList] = useState<TAG_COUNT[]>([]);
  const parentId = Number(paramMap.id) || 0;
  const handleData = async () => {
    Toast.show({
      duration: 0,
      content: '加载中',
      icon: 'loading',
    })
    queryTagList(parentId)
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
  const handleAction = (tag: TAG_COUNT) => {
    const func = ActionSheet.show({
      actions: parentId ? [
        {
          key: 'edit',
          text: '重命名',
          onClick: () => {
            func.close();
            handleUpdateAction(tag)
          }
        },
        {
          key: 'delete',
          text: '删除',
          danger: true,
          onClick: () => {
            func.close();
            handleDelete(tag)
          }
        },
      ] : [
        {
          key: 'detail',
          text: '明细',
          onClick: () => {
            func.close();
            handleJump(tag.id)
          },
        },
        {
          key: 'edit',
          text: '重命名',
          onClick: () => {
            func.close();
            handleUpdateAction(tag)
          }
        },
        {
          key: 'delete',
          text: '删除',
          danger: true,
          onClick: () => {
            func.close();
            handleDelete(tag)
          }
        },
      ]
    })
  }
  const handleAdd = () => {
    if (!dialog.tagName.trim()) {
      Toast.show({
        content: '标签名不能为空',
        icon: 'error'
      })
    }
    Toast.show({
      duration: 0,
      content: '处理中',
      icon: 'loading',
    })
    addTag(parentId, dialog.tagName)
      .then(() => {
        Toast.show({
          duration: 500,
          content: '新增成功',
          icon: 'success'
        })
        handleCancelAction();
        handleData();
      })
      .catch((err) => {
        Toast.show({
          duration: 500,
          content: '数据操作失败',
          icon: 'error'
        })
      })
  }
  const handleUpdateAction = (tag: TAG_COUNT) => {
    setDialog({
      tagId: tag.id,
      tagName: tag.name,
    });
  }
  const handleUpdateName = () => {
    if (!dialog.tagName.trim()) {
      Toast.show({
        content: '标签名不能为空',
        icon: 'error'
      })
    }
    Toast.show({
      duration: 0,
      content: '处理中',
      icon: 'loading',
    })
    updateTagName(dialog.tagId, dialog.tagName.trim())
      .then(() => {
        Toast.show({
          duration: 500,
          content: '更新成功',
          icon: 'success'
        })
        handleCancelAction();
        handleData();
      })
      .catch((err) => {
        Toast.show({
          duration: 500,
          content: '数据操作失败',
          icon: 'error'
        })
      })
  }
  const handleUpdateNameAction = (v: string) => {
    setDialog({
      tagName: v,
    });
  }
  const handleCancelAction = () => {
    setDialog({
      tagId: 0,
      tagName: '',
    });
  }
  const handleDelete = (tag: TAG_COUNT) => {
    Dialog.confirm({
      content: `确定删除标签【${tag.name}】?`,
      confirmText: '删除',
      cancelText: '取消',
      onConfirm: () => {
        Toast.show({
          duration: 0,
          content: '处理中',
          icon: 'loading',
        })
        deleteTag(tag.id)
          .then(() => {
            Toast.show({
              duration: 500,
              content: '删除成功',
              icon: 'success'
            })
            handleData();
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
    setDialog({
      tagId: -1,
      tagName: '',
    });
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
    updateTagSort(removed?.id || 0, result.destination.index + 1)
      .then(() => {
        Toast.show({
          duration: 500,
          content: '排序成功',
          icon: 'success'
        })
        // handleData();
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
    history.push(`/manage/tag/${id}`)
  };
  useEffect(() => {
    handleData();
  }, []);
  return {
    sort, list, ...dialog,
    handleSort,
    handleBack,
    handleData,
    handleAdd,
    handleUpdateNameAction,
    handleUpdateName,
    handleCancelAction,
    handleAddAction,
    handleAction,
    hanleSortAction: () => setSort(!sort)
  };
}