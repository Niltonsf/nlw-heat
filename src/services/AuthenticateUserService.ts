import axios from 'axios';

interface AccessTokenProps {
	"access_token": String;
}

interface UserProps {
	avatar_url: String;
	login: String;
	id: number;
	name: String;
}

export class AuthenticateUserService {
	async execute(code: String) {
		const url = 'https://github.com/login/oauth/access_token';

		const { data: accessTokenResponse } = await axios.post<AccessTokenProps>(url, null, {
			params: {
				client_id: process.env.GITHUB_CLIENT_ID,
				client_secret: process.env.GITHUB_CLIENT_SECRET,
				code,
			},
			headers: {
				'Accept': 'application/json'
			}
		});

		const response = await axios.get<UserProps>('https://api.github.com/user', {
			headers: {
				authorization: `Bearer ${accessTokenResponse.access_token}`
			}
		});

		return response.data;
	}
}