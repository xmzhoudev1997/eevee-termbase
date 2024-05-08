import { addPerform, getPerform, getSource, queryTagList, updatePerform } from "@/services/manage";
import { useSetState } from "ahooks";
import { Form, Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import { useParams, history } from "umi";

export default () => {
  const [form] = Form.useForm();
  const [tagList, setTagList] = useState<{ label: string, value: number }[]>([]);
  const [dialog, setDialog] = useSetState<{
    visible: boolean,
    list: { name: string, url: string, inuse: number }[],
    checked: string[],
  }>({
    visible: false,
    list: [],
    checked: [],
  });
  const paramMap = useParams();
  const performId = Number(paramMap.id) || 0;
  const handlePerformData = async () => {
    if (performId === -1) {
      form.setFieldsValue({
        name: '',
        tagId: [],
        schedule: false,
        search: '',
        source: ''
      })
      return;
    }
    Toast.show({
      duration: 0,
      content: '加载中',
      icon: 'loading',
    })
    getPerform(performId)
      .then((d) => {
        Toast.clear();
        form.setFieldsValue({
          name: d.name,
          tagId: [d.tagId],
          schedule: !!d.schedule,
          search: d.search,
          source: d.sources.join('\n')
        })
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
        setTagList(d.map(item => ({ label: item.name, value: item.id })));
      })
      .catch((err) => {
        Toast.show({
          duration: 500,
          content: '数据加载失败',
          icon: 'error'
        })
      })
  }
  const handleBack = () => {
    history.back();
  }
  const handleSave = ({
    name, tagId, search, source, schedule
  }: any) => {
    const obj = {
      name: name.trim(),
      tagId: tagId[0],
      search: search.trim(),
      sources: (source as string).split('\n').map(d => d.trim()).filter(d => d),
      schedule: schedule ? 1 : 0,
    }
    Toast.show({
      duration: 0,
      content: '处理中',
      icon: 'loading',
    })
    if (performId === -1) {
      addPerform(obj)
        .then(() => {
          Toast.show({
            duration: 500,
            content: '操作成功',
            icon: 'success'
          })
          handleBack();
        })
        .catch((err) => {
          Toast.show({
            duration: 500,
            content: '数据操作失败',
            icon: 'error'
          })
        })
      return;
    }
    updatePerform(performId, obj)
      .then(() => {
        Toast.show({
          duration: 500,
          content: '操作成功',
          icon: 'success'
        })
        handleBack();
      })
      .catch((err) => {
        Toast.show({
          duration: 500,
          content: '数据操作失败',
          icon: 'error'
        })
      })
  }
  const handleSource = async () => {
    const kwd = form.getFieldValue('search')?.trim();
    if (!kwd) {
      Toast.show({
        content: '关键字不能为空',
        icon: 'error',
      })
      return;
    }
    Toast.show({
      duration: 0,
      content: '搜索中，请稍等',
      icon: 'loading',
    })
    getSource(kwd)
      .then((d: any) => {
        Toast.clear();
        setDialog({
          visible: true,
          list: d,
          checked: [],
        });
        d.forEach(async (item: any, index: number) => {
          const timer = setTimeout(() => {
            d[index].inuse = -1;
            setDialog({
              list: d,
            })
          }, 5000);
          fetch(item.url, {
            method: 'GET',
          }).then((res) => {
            clearTimeout(timer);
            if (res.status === 200) {
              d[index].inuse = 1;
              setDialog({
                list: d,
              })
            } else {
              d[index].inuse = -1;
              setDialog({
                list: d,
              })
            }
          }).catch(() => {
            clearTimeout(timer);
            d[index].inuse = -1;
            setDialog({
              list: d,
            })
          })
        })
      })
      .catch((err) => {
        Toast.show({
          duration: 500,
          content: '数据操作失败',
          icon: 'error'
        })
      });
  }
  const handleCancelAction = () => {
    setDialog({
      visible: false,
      list: [],
      checked: [],
    })
  }
  const handleOkAction = () => {
    const value = form.getFieldValue('source');
    form.setFieldValue('source', `${value}\n${dialog.checked.join('\n')}`);
    setDialog({
      visible: false,
      list: [],
      checked: [],
    })
  }
  const handleSourceChecked = (v: any[]) => {
    setDialog({
      checked: v,
    })
  }
  useEffect(() => {
    handlePerformData();
    handleTagData();
  }, []);
  return {
    form,
    tagList,
    handleBack,
    handleSave,
    handleSource,
    handleCancelAction,
    handleOkAction,
    handleSourceChecked,
    ...dialog,
  };
}