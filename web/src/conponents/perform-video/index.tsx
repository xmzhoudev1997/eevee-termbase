import { FC } from 'react';
import useData from './hook';
import styles from './index.less';
import LiveVideo from '../live-video';
import { Button } from 'antd-mobile';
import classNames from 'classnames';

type Props = {
    className?: string;
    performId?: number;
}

const Index: FC<Props> = ({
    className, performId,
}) => {
    const {
        sourceIndex, sourceList,
        handleUpdateIndex,
    } = useData(performId);
    return (
        <>
            <LiveVideo source={sourceList[sourceIndex]} className={classNames(className, styles.root)} />
            <div className={styles.button}>
                {
                    sourceList.length > 1 &&
                    <Button color="primary" block onClick={handleUpdateIndex} >切换播放源</Button>
                }
            </div>
        </>
    );
}

export default Index;