import { FC } from 'react';
import useData from './hook';
import styles from './index.less';
import PerformVideo from '@/conponents/perform-video';
import { Collapse, Grid } from 'antd-mobile';
import classNames from 'classnames';

const Index: FC = () => {
    const {
        performList, performId, openKeys,
        handlePerformChange, handleOpenKeyChange,
    } = useData();
    return (
        <div className={styles.root}>
            <PerformVideo className={styles.video} performId={performId} />

            <Collapse activeKey={openKeys} onChange={handleOpenKeyChange}>
                {
                    performList.map((cla) => {
                        return (
                            <Collapse.Panel key={cla.name} title={cla.name}>
                                <Grid columns={3} gap={24}>
                                    {
                                        cla.children.map(d => {
                                            return (
                                                <Grid.Item key={String(d.id)} className={classNames(styles.item, performId === d.id ? styles.active : null)} onClick={() => handlePerformChange(d.id)}>
                                                    <div>{d.name}</div>
                                                </Grid.Item>
                                            );
                                        })
                                    }

                                </Grid>
                            </Collapse.Panel>
                        );
                    })
                }
            </Collapse>
        </div>
    );
}

export default Index;