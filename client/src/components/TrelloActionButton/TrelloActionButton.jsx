import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import TextareaAutosize from 'react-textarea-autosize';
import CancelIcon from '@mui/icons-material/Cancel';
import moment from 'moment';
import { useState, React } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon } from '@mui/material';
import { createList, addCards} from "../../store/listsSlice"
import "./TrelloActionButton.scss"


function TrelloActionButton(props) {
    const dispatch = useDispatch();
    const time = moment().format("DD.MM.YYYY HH:mm");
    const { list, _id, text, index } = props

    let [formOpen, setForm] = useState(true)
    let [textCard, setText] = useState(text)

    const handleInputChange = (e) => { setText(e.target.value) }
    const buttonTextOpacity = list ? 1 : 0.5;
    const openForm = (e) => {
        e.preventDefault();
        setForm(!formOpen)
    }

    const createLists = (e) => {
        console.log(text)
        e.preventDefault();
        if (textCard) {
            dispatch(createList({ text: textCard.trim() }))
            setText("")
        }
        else {
            alert("пустое поле")
        }
    }

    const createCard = (e) => {
        e.preventDefault();
        console.log(_id)
        if (textCard) {
            dispatch(addCards({ title: textCard.trim(), time, description: "", listId: _id }))
            setText("")
        }
        else {
            alert("пустое поле")
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            createCard(e)
        }
    }

    const styles = {
        openFormButtonGroup: {
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            borderRadius: 3,
            height: 36,
            width: 272,
            paddingleft: 10,
        },
        formButtonGroup: {
            marginTop: 8,
            display: "flex",
            alignItems: "center"
        }
    }

    return (
        formOpen ?
            <div className="btn"
                onClick={openForm}
                style={
                    {
                        ...styles.openFormButtonGroup,
                        opacity: buttonTextOpacity,
                        color: list ? "while" : "inherit",
                        backgroundColor: list ? "rgba(0,0,0,.15)" : "inherit"
                    }
                }
            >
                <AddIcon />
                <p>{list ? "Add a list" : "Add a card"}</p>
            </div>

            :

            <div>
                <Card style={{
                    minHeight: 80,
                    minWidth: 272,
                    marginTop: 16,
                    marginBottom: 16,
                    padding: "8px, 8px, 2px"
                }}>
                    <TextareaAutosize
                        placeholder={list ? "Enter list title..." : "Enter a title for this card..."}
                        onBlur={openForm}
                        value={textCard}
                        onKeyDown={handleKeyDown}
                        onChange={handleInputChange}
                        autoFocus
                        style={{
                            resize: "none",
                            width: "100%",
                            overflow: "hidden",
                            outline: "none",
                            border: "none"
                        }}
                    />
                </Card>
                <div style={styles.openFormButtonGroup}>
                    <Button
                        onMouseDown={list ? createLists : createCard}
                        variant="contained"
                        style={{
                            color: "while",
                            backgroundColor: "#5aac44"
                        }}>
                        {list ? "Add List" : "Add Card"}
                    </Button>
                    <Icon style={{
                        marginLeft: 8,
                        cursor: "pointer",
                    }}>
                        <CancelIcon onClick={openForm}
                        />
                    </Icon>
                </div>
            </div>
    )
}


export default TrelloActionButton;
