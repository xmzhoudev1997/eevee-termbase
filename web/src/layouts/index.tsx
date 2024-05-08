
import { Outlet } from 'umi';
import styles from './index.less';
import Logo from '@/assets/logo.png';
import useData from './hook';
import { NavBar, TabBar } from 'antd-mobile';
import 'antd-mobile/es/global/global.css'

const Menus = [
  {
    key: 'perform',
    title: '直播',
  },
  {
    key: 'tv',
    title: '电视剧',
  },
  {
    key: 'movie',
    title: '电影',
  },
  {
    key: 'setting',
    title: '设置',
  }
];
const SubMenuName = {
  tag: '标签管理',
  perform: '节目管理',
}
const Index: React.FC = () => {
  const {
    menuKey,
    handleMenuSelect,
  } = useData();
  if (menuKey === 'manage') {
    return <div className={styles.root}>
      <div className={styles.root}><Outlet /></div>
    </div>
  }
  return (
    <div className={styles.root}>
      <NavBar
        back={null}
        className={styles.nav}
      >
        <img className={styles.logo} src={Logo} />
      </NavBar>
      <div className={styles.content}><Outlet /></div>
      <TabBar activeKey={menuKey} onChange={handleMenuSelect} className={styles.footer}>
        {Menus.map(item => (
          <TabBar.Item key={item.key} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
};

export default Index;