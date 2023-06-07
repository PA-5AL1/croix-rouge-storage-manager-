import { Handler, HandlerContext, HandlerEvent } from '@netlify/functions'

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const { name = 'stranger' } = event.queryStringParameters

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello from product, url?name=${name}!`,
    }),
  }
}
