
import styles from './index.less';
import useData from './hook';
import { Button, List, NavBar, PullToRefresh, Tag } from 'antd-mobile'; import {
  DragDropContext,
  Draggable,
  Droppable,
} from 'react-beautiful-dnd';

const Index: React.FC = () => {
  const {
    sort, list, map,
    handleSort, handleBack, handleAction, handleAddAction, hanleSortAction,
    handlePerformData, hanleUpdateAllSource,
  } = useData();
  if (sort) {
    return (
      <>
        <NavBar
          onBack={handleBack}
          backArrow
          back="返回"
          right={<>
            <Button color="primary" fill='none' onClick={hanleSortAction}>关闭调整</Button>
            <Button color="primary" fill='none' onClick={hanleUpdateAllSource}>更新资源</Button>
          </>}
        >节目管理</NavBar>
        <List className={styles.list}>
          <DragDropContext onDragEnd={handleSort}>
            <Droppable droppableId='droppable'>
              {droppableProvided => (
                <div ref={droppableProvided.innerRef}>
                  {list.map((item, index: number) => (
                    <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? 0.8 : 1,
                          }}
                        >
                          <List.Item description={item.sources.join('\n')}>
                            <div className={styles.item}>
                              {item.name}
                              {!!map[item.tagId] && <Tag>{map[item.tagId]}</Tag>}
                              {!!item.schedule && <Tag color='primary'>自动更新</Tag>}
                            </div>
                          </List.Item>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </List>
      </>
    );
  }
  return (
    <div className={styles.root}>
      <NavBar
        onBack={handleBack}
        backArrow
        back="返回"
        right={<>
          <Button color="primary" fill='none' onClick={hanleSortAction}>调整顺序</Button>
          <Button color="primary" fill='none' onClick={hanleUpdateAllSource}>更新资源</Button>
        </>}
      >节目管理</NavBar>
      <PullToRefresh
        onRefresh={handlePerformData}
      >
        <List>
          {
            list.map((item) => (
              <List.Item description={item.sources.join('\n')} arrow onClick={() => handleAction(item)} key={item.id}>
                <div className={styles.item}>
                  {item.name}
                  {!!map[item.tagId] && <Tag>{map[item.tagId]}</Tag>}
                  {!!item.schedule && <Tag color='primary'>自动更新</Tag>}
                </div>
              </List.Item>
            ))
          }
        </List>
      </PullToRefresh>
      <Button block color='primary' size='large' onClick={handleAddAction}>添加节目</Button>
    </div>
  );
};

export default Index;