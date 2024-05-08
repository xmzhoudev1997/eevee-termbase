
import styles from './index.less';
import useData from './hook';
import { Dialog, Input, List } from 'antd-mobile';

const Index: React.FC = () => {
  const {
    showManage, visible, token,
    handleManageShowChange,
    handleJumpPerformManage,
    handleJumpTagManage,
    handleCancelAction, handleUpdateTokenAction, handleCheck,
  } = useData();
  return (
    <div className={styles.root}>
      {
        showManage &&
        <List mode='card' header='系统管理'>
          <List.Item onClick={handleJumpTagManage} arrow>
            标签管理
          </List.Item>
          <List.Item onClick={handleJumpPerformManage} arrow>
            节目管理
          </List.Item>
        </List>
      }
      <List mode='card' header='应用信息'>
        <List.Item
          extra={
            <div onDoubleClick={() => handleManageShowChange()}>0.1.0</div>
          }
        >
          版本
        </List.Item>
      </List>
      <Dialog
        visible={visible}
        onClose={handleCancelAction}
        content={<Input value={token} onChange={handleUpdateTokenAction} autoFocus placeholder='请输入管理员令牌' maxLength={20} minLength={1} />}
        actions={[[
          {
            key: 'cancel',
            text: '取消',
            onClick: handleCancelAction,
          },
          {
            key: 'save',
            text: '提交',
            onClick: handleCheck,
          },
        ]]}
      />
    </div>
  );
};

export default Index;