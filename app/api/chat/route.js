import { NextResponse } from 'next/server';

require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = process.env.API_KEY
const genAI = new GoogleGenerativeAI(apiKey);



export async function POST(request) {
  const { message } = await request.json();
  console.log('Received text: ', message);

  // Get the generative model with the system instruction
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are a real estate agent assistant who provides detailed property insights and market analysis.",
  });

  try {
    const result = await model.generateContentStream(message);

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          // Process each chunk of the streamed response
          for await (const chunk of result.stream) {
            const content = chunk.text();
            if (content) {
              const text = encoder.encode(content);
              controller.enqueue(text);
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    // Return the streaming response
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });

  } catch (error) {
    console.error('Error with Gemini API:', error);
    return NextResponse.json({ error: 'Failed to generate text from Gemini' }, { status: 500 });
  }
}

