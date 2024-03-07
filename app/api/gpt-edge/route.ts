// https://vercel.com/blog/gpt-3-app-next-js-vercel-edge-functions#edge-functions-vs.-serverless-functions
import { NextResponse } from 'next/server';
import type { NextFetchEvent, NextRequest } from 'next/server';

import OpenAI from 'openai';

// let prompt = "You are a highly experienced legal marketer for elite international law firms, who is adept at mapping out the value propositions and key messages conveyed in language. You can provide guidance on identifying the benefits, unique selling points, and core values embedded in texts, helping users better understand and articulate the value being communicated. Please identify the differentiating factors in this lawyer’s biography that sets them apart from their competitors and would resonate with potential clients in the legal market."


//                 let gptConfig = {
//                     method: 'post',
//                     maxBodyLength: Infinity,
//                     url: '/api/gpt-edge',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     data: JSON.stringify({
//                         prompt,
//                         text,
//                     })
//                 };
//                 let response = await axios.request(gptConfig);
//                 newText = text = response.data.answer;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


export const runtime = "edge"
 
export async function POST(
  request: NextRequest,
  context: NextFetchEvent,
) {
try { 
  const body = await request.json();
  console.log('Ask gpt following ', body.prompt, body.text)
  const completion = await openai.chat.completions.create({
    // model: 'gpt-3.5-turbo',
    model: 'gpt-4',
    messages: [{"role":"system", "content":`${body.prompt}\n ${body.text}.`},],      
  });    
  console.log(completion)

  let cost: number | undefined;

  if (completion) {
    cost = ((completion.usage?.prompt_tokens || 0) * 0.0015 + (completion.usage?.completion_tokens || 0) * 0.002) / 1000;
  }
  
  return NextResponse.json({ answer: completion.choices[0].message.content, inputTokens: completion.usage?.prompt_tokens, outputTokens: completion.usage?.completion_tokens, cost });
  } catch (error: any) {
    console.log('---------------- error', error);
    return NextResponse.json({ error: error.message });
  }
}

// const comp = {"id":"chatcmpl-83ySPRJ8VkG8zNQ0wynoOBxMppaER","object":"chat.completion","created":1695958073,"model":"gpt-3.5-turbo-0613","choices":[{"index":0,"message":{"role":"assistant","content":"The baby had three sleep sessions in the last 24 hours. The total sleep time adds up to 11.5 hours, which is less than the recommended 13 hours for a 6-month-old baby. To improve the baby's sleep duration, it is suggested to establish a consistent bedtime routine, create a calm and soothing sleep environment, and ensure that the baby is well-rested during the day with regular naps. It may also be helpful to consult with a pediatrician for further guidance on improving the baby's sleep habits."},"finish_reason":"stop"}],"usage":{"prompt_tokens":110,"completion_tokens":108,"total_tokens":218}}