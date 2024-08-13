"use client";

import { Box, Container, Button, Stack, TextField } from "@mui/material";
import OpenAI from "openai";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

export default function Home() {
  const [input, setInput] = useState("");
  const OpenAI = require("openai");
  const [userMessage, setUserMessage] = useState("");
  const systemPrompt =
    "You are a real estate agent assistant who provides detailed property insights and market analysis.";
  const messages = async function () {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: systemPrompt }],
      model: "gpt-4o-mini",
    });

    console.log(completion.choices[0]);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
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
          Pete
        </Stack>
        <Stack flexDirection="row">
          <TextField
            id="outlined-basic"
            label="Send Message"
            variant="outlined"
            sx={{ width: "400px" }}
          />
          <Button>
            <SendIcon fontSize="large" />
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
