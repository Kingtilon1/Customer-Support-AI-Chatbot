"use client";
import {
  Box,
  Container,
  Button,
  Stack,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import "./globals.css";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      role: "model",
      content: "Hi! I'm the real estate assistant. How can I help you today?",
    },
  ]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return; // Avoid sending empty messages

    // Update the chat history to show the user's message
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", content: message },
    ]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Update the chat history to show the AI's response
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { role: "model", content: data.reply },
      ]);

      // Clear the input field
      setMessage("");
    } catch (error) {
      console.error("Error:", error.message);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          role: "model",
          content: "I'm sorry, but I encountered an error. Please try again later.",
        },
      ]);
    }
  };
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        px: { xs: 2, sm: 4 },
        py: { xs: 2, sm: 4 },
        backgroundColor: "#e1e0df",
      }}
    >
      <Stack
        direction={"column"}
        width={{ xs: "90%", sm: "70%", md: "50%", lg: "500px" }}
        height={{ xs: "80%", sm: "70%", md: "600px" }}
        border="3px solid black"
        p={{ xs: 1, sm: 2 }}
        spacing={3}
        boxShadow={20}
        sx={{ borderRadius: "15px", backgroundColor: "white" }}
      >
        {/* Display chat history */}
        <Stack
          direction={"column"}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {chatHistory.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "user" ? "flex-end" : "flex-start"
              }
            >
              <Box
                bgcolor={message.role === "user" ? "secondary.main" : "primary.main"}
                color="white"
                borderRadius={16}
                p={3}
              >
                <Typography variant="body1">{message.content}</Typography>
              </Box>
            </Box>
          ))}
        </Stack>

        {/* Input area */}
        <Stack direction={"row"} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={handleInputChange}
          />
          <Button variant="contained" onClick={handleSendMessage}>
            <SendIcon fontSize="large" />
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}