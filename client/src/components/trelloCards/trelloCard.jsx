import React from 'react';
import Card from '@mui/material/Card';
import FormDialog from '../dialogs/dialogs';
import CardContent from '@mui/material/CardContent';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import { Draggable } from 'react-beautiful-dnd';
import "./trelloCard.scss";

const CardContainer = styled.div`
  margin-bottom: 8px;
`

const TrelloCard = ({ title, id, indexList, index, listId, desc, time, userId, usersCard }) => {
  console.log()
  
  return (
    <Draggable draggableId={String(id)} index={index}>
      {provided => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <Grid>
              <CardContent className="card__content">
                <FormDialog
                  key={id}
                  text={title}
                  id={id}
                  index={index}
                  listId={listId}
                  desc={desc}
                  time={time}
                  userId={userId}
                  indexList={indexList}
                  usersCard={usersCard}
                />
              </CardContent>
            </Grid>
          </Card>
        </CardContainer>
      )}
    </Draggable>
  );
};



export default TrelloCard;

