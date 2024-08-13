import { NextResponse } from 'next/server';
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});



export async function POST(request){
  const { message } = await request.json();
  console.log('Received text: ', message);

  // sending the users message to OpenAI
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant specialized in real estate." }, 
      {role: "user", content: message}
    ],
    model: "gpt-4o-mini",
  });
  // retreive the response
  const reply = completion.choices[0].message.content;
  return NextResponse.json({reply})
}

