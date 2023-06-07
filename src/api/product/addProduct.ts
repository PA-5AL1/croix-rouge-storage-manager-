import { Handler, HandlerContext, HandlerEvent } from '@netlify/functions'

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello from add product!`,
    }),
  }
}
