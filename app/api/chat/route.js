import { NextResponse } from 'next/server';

require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// In-memory chat history storage (this will reset if the server restarts)
let chatHistory = [];

export async function POST(request) {
  const { message } = await request.json();
  console.log('Received text: ', message);

  // Add the user's message to the chat history
  chatHistory.push({ role: "user", parts: [{ text: message }] });

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are a real estate agent assistant who provides detailed property insights and market analysis.",
  });

  try {
    // Start a chat session with the accumulated history
    const chatSession = model.startChat({
      history: chatHistory,
    });

    // Send the user's message and get the full response
    const result = await chatSession.sendMessage(message);
    const reply = result.response.text();

    // Add the AI's reply to the chat history
    chatHistory.push({ role: "model", parts: [{ text: reply }] });

    // Return the full response
    return NextResponse.json({ reply });

  } catch (error) {
    console.error('Error with Gemini API:', error);
    return NextResponse.json({ error: 'Failed to generate text from Gemini' }, { status: 500 });
  }
}