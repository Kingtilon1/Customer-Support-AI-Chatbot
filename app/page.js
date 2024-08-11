import { Box, Container, Button, Stack } from "@mui/material";
import OpenAI from "openai";
import { useState } from "react";

export default function Home() {
const [input, setInput] = useState('')
const openai = new OpenAI();
const systemPrompt =  "You are a real estate agent assistant who provides detailed property insights and market analysis."
const messages = async function() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: systemPrompt}],
    model: "gpt-4o-mini",
  });

  console.log(completion.choices[0]);
}

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
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
  <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
          >
            hjb
          </Stack>

      </Stack>

    </Box>
  );
}
