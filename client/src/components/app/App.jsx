import React, { useEffect } from 'react';
import TrelloList from '../trelloList/trelloList';
import Sidebar from '../sidebar/sidebar';
import TrelloActionButton from '../TrelloActionButton/TrelloActionButton';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort, loadLists } from '../../store/listsSlice';
import './App.css';

const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    color: rgb(0, 0, 0);
    margin-top: 5rem;
  `;

function App() {
  const dispatch = useDispatch();
  
  const lists = useSelector(state => state.lists.lists)
  console.log(lists.map(list => list), "<<<<App")
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result

    if (!destination) return;

    dispatch(sort(
      {
      droppableIdStart: source.droppableId,
      droppableIdEnd: destination.droppableId,
      droppableIndexEnd: destination.index,
      droppableIndexStart: source.index,
      draggableId: draggableId,
      type: type
      }
    ))
  }

  useEffect(() => {
    dispatch(loadLists())
  }, [])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {provided => (
          <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
            <Sidebar />
            {lists.map((list, index) =>  
              <TrelloList
                _id={list.id}
                key={list.id}
                title={list.title}
                cards={list.cards}
                email={list.email}
                name={list.name}
                index={index}
              />
            )}
            {provided.placeholder}
            <TrelloActionButton list />
          </ListContainer>
        )}
      </Droppable>
    </DragDropContext>
  )
}


export default App;
