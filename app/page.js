"use client";
import { Box, Container, Button, Stack, Input } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
 

  const handleSendMessage = async () =>{
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    console.log('Server response:', data.reply)
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
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
        <Stack
          direction={"column"}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          <Input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder={"Type your message here..."}
          />
          <Button onClick={handleSendMessage}>click me</Button>
        </Stack>
      </Stack>
    </Box>
  );
}
