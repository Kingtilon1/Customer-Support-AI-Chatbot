require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMENI_KEY);



  // sending the users message to OpenAI
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
    systemInstruction: "You are a real estate agent assistant who provides detailed property insights and market analysis.",
   });
   console.log(model)


