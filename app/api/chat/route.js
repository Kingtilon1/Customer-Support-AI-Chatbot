import { NextResponse } from "next/server";

require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
// const apiKey = process.env.API_KEY
// Just for testing the api
const apiKey = "AIzaSyBDnEIHtPz93osbkvLkdEAmiVt50XkkcGE";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request) {
  const { message } = await request.json();
  console.log("Received text: ", message);

  // sending the users message to OpenAI
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You are a real estate agent assistant who provides detailed property insights and market analysis.",
  });
  // retreive the response
  const result = await model.generateContent(message);
  const reply = await result.response.text();
  return NextResponse.json({ reply });
}
