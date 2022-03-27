import {
    getLists,
    addList,
    addUser,
    addCard,
    changeDate
} from "../../src/services/taskServices";

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const initialState = {
    users: [],
    lists: [],
};

export const listSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        sort(state, action) {
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexEnd,
                droppableIndexStart,
                type,
                move
            } = action.payload;

            if (type === "list") {
                const list = state.lists.splice(+droppableIndexStart, 1);
                state.lists.splice(+droppableIndexEnd, 0, ...list)
            }

            if (move === true) {
                const indexCardStart = state.lists[action.payload.indexStart].cards.findIndex(card => card.id === action.payload.id)
                const moveCard = state.lists[action.payload.indexStart].cards.splice(indexCardStart, 1)
                const indexCardEnd = state.lists[action.payload.indexEnd]  
                indexCardEnd.cards.push(...moveCard)
            }

            if (droppableIdStart !== "all-lists" && droppableIdStart === droppableIdEnd && move !== true) {
                console.log(action.payload, "<<<dasd")
                const list = state.lists.find((list) => +droppableIdStart === list.listId)
                const card = list.cards.splice(+droppableIndexStart, 1)
                list.cards.splice(+droppableIndexEnd, 0, ...card)
            }

            if (droppableIdStart !== droppableIdEnd) {
                const listStart = state.lists.find((list) => +droppableIdStart === list.listId)
                const card = listStart.cards.splice(+droppableIndexStart, 1)
                const listEnd = state.lists.find((list) => +droppableIdEnd === list.listId)
                listEnd.cards.splice(+droppableIndexEnd, 0, ...card)
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(loadLists.fulfilled, (state, action) => {
                state.lists = action.payload;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.lists = state.lists.concat(action.payload);
            })
            .addCase(createList.fulfilled, (state, action) => {
                let newList = {
                    id: action.payload.id,
                    title: action.payload.title,
                    cards: []
                }
                state.lists.push(newList)
            })
            .addCase(addCards.fulfilled, (state, action) => {
                console.log(action.payload, "action.payload")
                state.lists = state.lists.map((list)=>{
                    if(list.id === action.payload.listId)
                        return {...list, cards: [...list.cards, action.payload]}
                    return list
                })
            })
    }
})

export const { sort } = listSlice.actions

export default listSlice.reducer;

    export const loadLists = createAsyncThunk(
        'load/lists',
        async function () {
            try {
                const response = await getLists()
                const data = await response.data;
                return data
            } catch (error) {
                console.log(error)
            }
        }
    )

    export const createList = createAsyncThunk(
        'create/list',
        async function (payload) {
            try {
                const response = await addList({ title: payload.text})
                const data = await response.data;
                return data
            } catch (error) {
                console.log(error)
            }
        }
    )

    export const createUser = createAsyncThunk(
        'create/user',
        async function (payload) {
            try {
                const response = await addUser({ name: payload.name, email: payload.email })
                const data = await response.data;
                return data
            } catch (error) {
                console.log(error)
            }
        }
    )

    export const addCards = createAsyncThunk(
        'create/card',
        async function(payload) {
            try {
                console.log(payload)
                const response = await addCard(payload);
                const data = await response.data;
                console.log(data)
                return data
            } catch (error) {
                console.log(error)
            }
        }
    )

    export const changeCardDate = createAsyncThunk(
        'changeDate/card',
        async function(payload) {
            try {
                console.log(payload, "changeDate")
                const response = await changeDate(payload);
                const data = await response.data;
                console.log(data)
                return data
            } catch (error) {
                console.log(error)
            }
        }
    )

    




















    
// import { createSlice } from '@reduxjs/toolkit'

// let listId = 3;

// export const listsSlice = createSlice({
//     name: 'lists',
//     initialState: {
//         users: [],
//         lists: []
//     },
//     reducers: {
        // sort(state, action) {
        //     const {
        //         droppableIdStart,
        //         droppableIdEnd,
        //         droppableIndexEnd,
        //         droppableIndexStart,
        //         type,
        //         move
        //     } = action.payload;

        //     if (type === "list") {
        //         const list = state.lists.splice(+droppableIndexStart, 1);
        //         state.lists.splice(+droppableIndexEnd, 0, ...list)
        //     }

        //     if (move === true) {
        //         const indexCardStart = state.lists[action.payload.indexStart].cards.findIndex(card => card.id === action.payload.id)
        //         const moveCard = state.lists[action.payload.indexStart].cards.splice(indexCardStart, 1)
        //         const indexCardEnd = state.lists[action.payload.indexEnd]  
        //         indexCardEnd.cards.push(...moveCard)
        //     }

        //     if (droppableIdStart !== "all-lists" && droppableIdStart === droppableIdEnd && move !== true) {
        //         const list = state.lists.find((list) => +droppableIdStart === list.listId)
        //         const card = list.cards.splice(+droppableIndexStart, 1)
        //         list.cards.splice(+droppableIndexEnd, 0, ...card)
        //     }

        //     if (droppableIdStart !== droppableIdEnd) {
        //         const listStart = state.lists.find((list) => +droppableIdStart === list.listId)
        //         const card = listStart.cards.splice(+droppableIndexStart, 1)
        //         const listEnd = state.lists.find((list) => +droppableIdEnd === list.listId)
        //         listEnd.cards.splice(+droppableIndexEnd, 0, ...card)
        //     }
        // },

//         addList(state, action) {
//             const newList = {
//                 title: action.payload.text,
//                 listId: Date.now(),
//                 cards: []
//             }
//             state.lists.push(newList)
//         },

//         addCard(state, action) {
//             console.log(action.payload)
//             const newCard = {
//                 usersCard: [],
//                 id: Date.now(),
//                 text: action.payload.text,
//                 description: action.payload.desc,
//                 time: action.payload.time,        
//             }
//             state.lists[action.payload.index].cards.push(newCard)
//             console.log(newCard)
//         },

//         changeCardDate(state, action) {
//             state.lists[action.payload.indexList].cards = state.lists[action.payload.indexList].cards.map(card => ({
//                 ...card,
//                 text: card.id === action.payload.id ? action.payload.text : card.text,
//                 description: card.id === action.payload.id ? action.payload.desc : card.description
//             }))
//         },

//         changeListTitle(state, action) {
//             state.lists[action.payload._id].title = action.payload.titleText
//         },

//         deleteUser(state, action) {
//             state.lists[action.payload.indexList].cards[action.payload.indexCard].usersCard = 
//             state.lists[action.payload.indexList].cards[action.payload.indexCard].usersCard.filter((elem) => {return elem !== action.payload.id})
//         },
//         addUser(state, action) {
//             if(!state.lists[action.payload.indexList].cards[action.payload.indexCard].usersCard.find(user => user === action.payload.id)){
//                 state.lists[action.payload.indexList].cards[action.payload.indexCard].usersCard.push(action.payload.id) 
//             }      
//         },
//         createUser(state, action) {           
//             const newUser = {
//                 userId: Date.now(),
//                 name: action.payload.name,
//                 email: action.payload.email
//             }
//             state.users.push(newUser)
//         }
//     },
// })

// export const { addList, addCard, sort, changeCardDate, changeListTitle, deleteUser, addUser, createUser } = listsSlice.actions
// export default listsSlice.reducer;