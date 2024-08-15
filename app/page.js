"use client";
import { Box, Container, Button, Stack, Input, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

export default function Home() {
  const [message, setMessage] = useState("");
  const [responses, setResponse] = useState("")

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
 

  const handleSendMessage = async () => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Server response:', data.reply);
      setResponse(data.reply)
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  return (
    <Box
      width="100vw"
      height="90vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction={"column"}
        width="500px"
        height="600px"
        border="3px solid black"
        p={2}
        spacing={3}
        boxShadow={20}
        sx={{ borderRadius: "15px" }}
      >
        <Stack
          direction={"column"}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          <Box>{responses}</Box>
        </Stack>
        <Stack flexDirection="row">
          <TextField
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder={"Type your message here..."}
            id="outlined-basic"
            label="Send Message"
            variant="outlined"
            sx={{ width: "400px" }}
          />
          <Button onClick={handleSendMessage}>
            <SendIcon fontSize="large" />
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
