
import styles from './index.less';
import useData from './hook';
import { Button, Dialog, Input, List, NavBar, PullToRefresh } from 'antd-mobile'; 
import {
  DragDropContext,
  Draggable,
  Droppable,
} from 'react-beautiful-dnd';

const Index: React.FC = () => {
  const {
    sort, list, tagId, tagName,
    handleSort, handleBack, handleData, handleAdd, handleUpdateNameAction, handleAction,
    handleUpdateName, handleCancelAction, handleAddAction, hanleSortAction,
  } = useData();
  if (sort) {
    return (
      <>
        <NavBar
          onBack={handleBack}
          backArrow
          back="返回"
          right={<Button color="primary" fill='none' onClick={hanleSortAction}>关闭调整</Button>}
        >标签管理</NavBar>
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
                          <List.Item>{item.name}</List.Item>
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
        right={<Button color="primary" fill='none' onClick={hanleSortAction}>调整顺序</Button>}
      >标签管理</NavBar>
      <PullToRefresh
        onRefresh={handleData}
      >
        <List>
          {
            list.map((item) => (
              <List.Item onClick={() => handleAction(item)} key={item.id}>{item.name}</List.Item>
            ))
          }
        </List>
      </PullToRefresh>
      <Button block color='primary' size='large' onClick={handleAddAction}>添加标签</Button>
      <Dialog
        visible={!!tagId}
        onClose={handleCancelAction}
        content={<Input value={tagName} onChange={handleUpdateNameAction} autoFocus placeholder='请输入标签名' maxLength={20} minLength={1} />}
        actions={[[
          {
            key: 'cancel',
            text: '取消',
            onClick: handleCancelAction,
          },
          {
            key: 'save',
            text: tagId === -1 ? '添加' : '更新',
            onClick: tagId === -1 ? handleAdd : handleUpdateName,
          },
        ]]}
      />
    </div>
  );
};

export default Index;