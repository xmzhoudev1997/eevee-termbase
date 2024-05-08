import { FC } from 'react';
import useData from './hook';
import styles from './index.less';
import classNames from 'classnames';

type Props = {
    className?: string;
}

const Index: FC<Props> = ({
    className,
}) => {
    const {} = useData();
    return (
        <div className={classNames(className, styles.root)}>

        </div>
    );
}
export default Index;