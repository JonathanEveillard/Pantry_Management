'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Modal, Stack, TextField, Typography, Button, Grid} from '@mui/material'
import { firestore } from '@/firebase'
import { collection, query, getDocs, setDoc, getDoc, doc,deleteDoc, writeBatch} from 'firebase/firestore'
import { set } from 'firebase/database'


export default function Home() {

  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(0)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot = await getDocs(collection(firestore, 'inventory'))
    const InventoryList = []
    snapshot.forEach((doc) => {
      InventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(InventoryList)
    console.log(InventoryList)
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()

        await setDoc(docRef, {quantity: quantity + 1})
      }
      else
      {
        await setDoc(docRef, {quantity: 1})
      }

      await updateInventory()
    }

    const deleteAllItems = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'inventory'));
      const batch = writeBatch(firestore);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      await updateInventory();
    };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const {quantity} = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      }
      else
      {
        await setDoc(docRef, {
          quantity: quantity - 1
        })
      }

      await updateInventory()
    }
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

return (
    <Box display="flex" width="100vw" height="100vh" justifyContent="center" alignItems="center" gap={2} flexDirection="column">
      <Modal
      open={open}
      onClose={handleClose}
      >
        <Box  position="absolute"
        top="50%"
        left="50%"
        width={400}
        bgcolor="white"
        border="2px solid #000"
        boxShadow={24}
        p={4}
        display="flex"
        flexDirection="column"
        gap={3}
        justifyContent="center"
        sx={{
          transform: 'translate(-50%, -50%)',
        }}>
          <Typography variant="h2" color="black">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
            variant='outlined'
            fullWidth
            value={itemName}
            onChange={(e)=>{
              setItemName(e.target.value)
            }}/>
            <Button variant="contained"
            onClick={()=> {
              addItem(itemName)
              setItemName('')
              handleClose()
            }}>Add</Button>
          </Stack>
        </Box>
      </Modal>


      <Box width="400" height="100px" alignContent="center" justifyContent="space-between">
        <Box display="flex" flexDirection="row">
          <Button variant="contained" onClick={handleOpen} style={{ marginRight: '25px' }}>Add Item</Button>
          <Button variant="contained" onClick={deleteAllItems}>Delete All Items</Button>
        </Box>
      </Box>

      <Box border="1px solid black" borderRadius={2} p={2} display="flex" flexDirection="column" gap={2} width="800px" height="100px" bgcolor='#ADD8E6'>
        <Typography variant="h3" color = "black" alignItems="center" justifyContent="center" display="flex">Inventory List</Typography>
      </Box>
      <Stack width="800px" height="300px" spacing={2} overflow="auto">
  {
    inventory.map(({ name, quantity }) => (
      <Box
        key={name}
        color="black"
        width="100%"
        minHeight={name.length > 6 ? "200px" : "150px"}
        bgcolor="#f0f0f0"
        borderRadius="25px"
        padding={5}
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={3}>
            <Typography
              variant='h3'
              color="black"
              textAlign="center"
              sx={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant='h3' color="black" textAlign="center">
              {quantity}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={() => addItem(name)}>Add</Button>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={() => removeItem(name)}>Remove</Button>
          </Grid>
        </Grid>
      </Box>
    ))
  }
</Stack>
    </Box>
  )
}
