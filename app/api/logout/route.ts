// server/api/logout.js

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request, response) {
  const cookieStore = cookies(request.headers);
  const token = cookieStore.get('UserLoginToken')?.value;

  try {
    console.log('Starting logout process...');

    // Your logic for removing the cookie and any other logout-related operations
    // ...

    // response.setHeader('Set-Cookie', `LoginToken=; Path=/; HttpOnly; Max-Age=0`);
    cookies().delete('UserLoginToken');
    console.log('Logout successful.');

    // Make an API call or perform any other logout-related actions here

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.error(new Error('Logout failed'));
  }
}
