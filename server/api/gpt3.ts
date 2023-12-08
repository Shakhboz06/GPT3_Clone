export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  let reqbody = await readBody(event)
  let messages = JSON.parse(reqbody)
  
  
  const req = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.OPENAI_API_KEY}`
    },

    body: JSON.stringify({
      model: "gpt-3.5-turbo-1106",
      messages: messages,
      temperature: 0.7,
      max_tokens: 512,
      top_p: 1.0,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: ["user:", "assistant:"]
    })
  })

  const res = await req.json()
  const result = res.choices[0].message.content
  return {
    message: result,
    finish_reason: res.choices[0].finish_reason
  }
})
