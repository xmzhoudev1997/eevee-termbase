
import styles from './index.less';
import useData from './hook';
import { ErrorBlock } from 'antd-mobile';

const Index: React.FC = () => {
  const {
  } = useData();
  return (
    <div className={styles.root}>
      <ErrorBlock
        status='empty'
        title="功能开发中..."
      />
    </div>
  );
};

export default Index;