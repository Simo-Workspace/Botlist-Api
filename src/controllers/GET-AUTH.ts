import axios from 'axios';
import { Request, Response } from "express";
import serialize from 'serialize-javascript';
import { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SCOPES } from "../../.config.json";

export const callback = async (req: Request, res: Response) => {
    const code = req.query.code;
    const data: any = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      scope: SCOPES.join(' ')
    };
  
    try {
      const tokenResponse = await axios.post('https://discord.com/api/v10/oauth2/token', new URLSearchParams(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      const accessToken = tokenResponse.data.access_token;
      const userResponse = await axios.get('https://discord.com/api/v10/users/@me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
  
      const { username, id, avatar } = userResponse.data;
      const user: any = {
        username: username,
        id: id,
        avatar: avatar
      }
  
      res.cookie('discordUser', serialize(user), { maxAge: 900000, httpOnly: false });
  
      res.redirect('http://localhost:5173');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao autenticar com o Discord');
    }
};