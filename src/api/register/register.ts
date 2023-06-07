import { Handler, HandlerContext, HandlerEvent } from '@netlify/functions'
import CryptPassword from '../../domain/hashPassword';
import BCryptEncryption from '../../infrastructure/bCryptEncryption';
import { register } from '../../domain/auth';

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log(event.body);
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing body",
      }),
    }
  }

  const body = JSON.parse(event.body);

  const encryptPassword: CryptPassword = new BCryptEncryption();
  const registeredUser = await register(encryptPassword, body.email, body.password);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: registeredUser,
    }),
  }
}


