import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import { useDispatch } from "react-redux";
// import { createUser } from "../../store/listsSlice"


const drawerWidth = 240;

export default function ClippedDrawer() {
  const dispatch = useDispatch()

  let [createUserOpen, setCreateUserOpen] = useState(false)
  let [userName, setUserName] = useState("")
  let [userEmail, setUserEmail] = useState("")

  
  const userOpen = () => { setCreateUserOpen(!createUserOpen) }
  const changeTextName = (e) => { setUserName(e.target.value) }
  const changeTextEmail = (e) => { setUserEmail(e.target.value) }

  const addUser = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!re.test(String(userEmail).toLocaleLowerCase())) {
      alert("Email не корректен")
    }
    else if (userName.length > 10) {
      alert("Имя длиннее 15 символов")
    }
    else{
      // dispatch(createUser({ email: userEmail.trim(), name: userName.trim() }))
      setUserEmail(userEmail = "")
      setUserName(userName = "")
      userOpen()
    }
  }



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Trello
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Create User'].map((text) => (
              <ListItem onClick={userOpen} button key={text}>
                <ListItemIcon>
                  <PersonAddAlt1Icon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}

            <Dialog open={createUserOpen} onClose={userOpen}>
              <Card sx={{ maxWidth: 385 }}>
                <CardContent className="card__content">
                  <TextField
                    fullWidth
                    type="text"
                    margin="dense"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    onChange={changeTextEmail}
                    value={userEmail}
                  />
                  <TextField
                    fullWidth
                    type="email"
                    margin="dense"
                    label="Name"
                    variant="outlined"
                    onChange={changeTextName}
                    value={userName}
                  />
                  <CardActions style={{ justifyContent: "space-between" }}>
                    <Button size="small" onClick={userOpen}>Close</Button>
                    <Button size="small" onClick={addUser}>Save</Button>
                  </CardActions>
                </CardContent>
              </Card>
            </Dialog>
          </List>

          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}></Box>
    </Box>
  );
}