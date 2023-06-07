import { Handler } from '@netlify/functions'
import Authentication from '../../domain/auth';
import CryptPassword from '../../domain/user/hashPassword';
import Users from '../../domain/user/users';
import BCryptEncryption from '../../infrastructure/bCryptEncryption';
import InMemoryUserRepository from '../../infrastructure/inMemoryUserRepository';

export const handler: Handler = async (event, context) => {
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

  const accessToken = await authenticationService.login(body.email, body.password);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: { access_token : accessToken },
    }),
  }
}
