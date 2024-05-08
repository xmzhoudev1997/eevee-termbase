import { FC } from 'react';
import useData from './hook';
import styles from './index.less';
import classNames from 'classnames';

type Props = {
    className?: string;
    source?: string;
}

const Index: FC<Props> = ({
    className, source,
}) => {
    const {
        videoRef,
    } = useData(source);
    return (
        <video ref={videoRef} controls className={classNames(className, styles.root)} autoPlay/>
    );
}

export default Index;