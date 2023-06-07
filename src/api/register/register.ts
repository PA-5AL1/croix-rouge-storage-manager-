import { Handler, HandlerContext, HandlerEvent } from '@netlify/functions'
import CryptPassword from '../../domain/user/hashPassword';
import BCryptEncryption from '../../infrastructure/bCryptEncryption';
import Users from '../../domain/user/users';
import Authentication from '../../domain/auth';
import InMemoryUserRepository from '../../infrastructure/inMemoryUserRepository';


export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Missing body, the following fields are required : email and password.",
      }),
    }
  }

  const body = JSON.parse(event.body);

  const encryptPassword: CryptPassword = new BCryptEncryption();
  const userRepository: Users = new InMemoryUserRepository();
  const authenticationService: Authentication = new Authentication(encryptPassword, userRepository);

  const registeredUser = await authenticationService.register(body.email, body.password);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: registeredUser,
    }),
  }
}


