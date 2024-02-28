import { cookies } from 'next/headers';

export async function GET(request) {
  const cookieStore = cookies(request.headers);
  const token = cookieStore.get('UserLoginToken')?.value;

  // Set the cookie in the response header
  if (token) {
    return new Response(token, {
      headers: {
        'Set-Cookie': `LoginToken=${token}; HttpOnly; Path=/`,
        'Content-Type': 'text/plain',
      },
    });
  } else {
    return new Response('Token not found', { status: 404 });
  }
}
