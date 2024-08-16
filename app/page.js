"use client";
import {
  Box,
  Container,
  Button,
  Stack,
  Input,
  TextField,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import "./globals.css";
import Image from "next/image";

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
          content:
            "I'm sorry, but I encountered an error. Please try again later.",
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
        py: { xs: 1, sm: 2 },
        backgroundColor: "#6e4b9b",
        backgroundImage: "url('/images/skyline.png')", // Background image
        backgroundSize: "cover", // Adjust size to cover the whole container
        backgroundRepeat: "no-repeat", // Prevents repeating the image
        backgroundPosition: "center", // Centers the background image
      }}
    >
      {/* Navigation bar Finish Working on this*/}

      <Stack
        direction={"column"}
        width={{ xs: "90%", sm: "70%", md: "50%", lg: "500px" }}
        height={{ xs: "80%", sm: "70%", md: "600px" }}
        border="3px solid white"
        borderTop={0}
        p={{ xs: 1, sm: 2 }}
        pt={{ xs: 0, sm: 0 }}
        spacing={3}
        boxShadow={20}
        sx={{ borderRadius: "15px", backgroundColor: "white", mt: 2 }}
      >
        <AppBar
          position="static"
          sx={{
            position: "relative",
            backgroundColor: "#333",
            height: "50px", 
            mb: 2, // Add margin below the AppBar
            mt: -1,
            borderTopLeftRadius: "10px", // Top-left corner radius
            borderTopRightRadius: "10px",
            width: "calc(100% + 35.5px)", // Extend width to account for 32px padding on both sides
            left: "-17.9px",
          }}
        >
          <Toolbar sx={{ minHeight: "30px" }}>
            <Typography
              variant="h7"
              sx={{
                flexGrow: 1,

                textOverflow: "ellipsis", // Add ellipsis (...) if text overflows
                whiteSpace: "nowrap", // Prevents the text from wrapping to the next line

                lineHeight: "10px", // Align the text vertically within the AppBar
              }}
            >
              Real Estate Chat Assistant
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Display chat history */}
        <Stack
          direction={"column"}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {/* Working on the text bubble for chat */}

          {chatHistory.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "user" ? "flex-end" : "flex-start"
              }
              mb={2} // Adds margin between messages
            >
              {message.role === "user" ? (
                <Box
                  sx={{
                    backgroundColor: "#9e379f",
                    borderRadius: "15px",
                    padding: "15px",
                    marginRight: "5px",
                    display: "inline-block",
                    maxWidth: "75%",
                    alignSelf: "flex-end", // Aligns to the right
                  }}
                >
                  <Typography variant="h6">{message.content}</Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    backgroundColor: "#f0f0f0",
                    borderRadius: "15px",
                    padding: "15px",
                    marginLeft: "5px",
                    display: "inline-block",
                    maxWidth: "75%",
                    alignSelf: "flex-start", // Aligns to the left
                  }}
                >
                  <Typography variant="h6">{message.content}</Typography>
                </Box>
              )}
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
            onKeyPress={(event) => {
              // Added on key press event for enter key
              if (event.key === "Enter") {
                handleSendMessage();
                setMessage("");
              }
            }}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            color="secondary"
          >
            <SendIcon fontSize="large" />
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
