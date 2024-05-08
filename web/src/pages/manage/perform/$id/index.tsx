
import styles from './index.less';
import useData from './hook';
import { Button, CheckList, Dialog, ErrorBlock, Form, Input, NavBar, Selector, Switch, Tag, TextArea } from 'antd-mobile';

const Index: React.FC = () => {
  const {
    tagList, form, list, visible, checked,
    handleBack, handleSave, handleSource, handleCancelAction, handleOkAction, handleSourceChecked,
  } = useData();
  return (
    <div className={styles.root}>
      <NavBar
        onBack={handleBack}
        backArrow
        back="返回"
      >节目管理</NavBar>
      <Form
        form={form}
        onFinish={handleSave}
        footer={
          <Button block type='submit' color='primary' size='large'>
            提交
          </Button>
        }
      >
        <Form.Header>基本信息</Form.Header>
        <Form.Item name='name' label='节目名称' rules={[{ required: true, min: 1, max: 20 }]}>
          <Input placeholder='请输入节目名称' />
        </Form.Item>
        <Form.Item name='tagId' label='节目分类' rules={[{ required: true }]}>
          <Selector
            options={tagList}
          />
        </Form.Item>
        <Form.Item name='source' label='节目资源'>
          <TextArea placeholder='请输入节目资源，多个请换行' rows={10} />
        </Form.Item>
        <Form.Header>资源同步</Form.Header>
        <Form.Item name='search' label='搜索关键字' rules={[{ required: true, min: 1, max: 20 }]} extra={<Button color="primary" fill="none" onClick={handleSource}>获取资源</Button>}>
          <Input placeholder='请输入关键字' />
        </Form.Item>
        <Form.Item name='schedule' label='是否自动同步' rules={[{ required: true }]} valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
      <Dialog
        visible={visible}
        onClose={handleCancelAction}
        content={
          list.length ? <CheckList className={styles.list} value={checked} onChange={handleSourceChecked} multiple>
            {
              list.map(d => (<CheckList.Item value={d.url} key={d.url} description={d.url}>
                <div className={styles.item}>
                  {d.name}
                  {
                    d.inuse === 1 ? <Tag color='success'>可用</Tag> : d.inuse === -1 ? <Tag color='danger'>不可用</Tag> : <Tag color='primary'>验证中</Tag>
                  }
                </div>
              </CheckList.Item>))
            }
          </CheckList> :
            <ErrorBlock status='empty' title="暂无数据" description="没搜索到可用资源" />
        }
        actions={[[
          {
            key: 'cancel',
            text: '取消',
            onClick: handleCancelAction,
          },
          {
            key: 'save',
            text: '确定',
            onClick: handleOkAction,
          },
        ]]}
      />
    </div>
  );
};

export default Index;