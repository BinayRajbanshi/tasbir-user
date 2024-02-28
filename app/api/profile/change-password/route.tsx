import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('UserLoginToken')?.value;
  const body = await request.json();
  console.log(JSON.stringify(body));
  try {
    const response = await fetch(`${process.env.BASE_URL}/change-password`, {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json',
        Cookie: `UserLoginToken=${token}`,
        redirect: 'follow',
      },
    });
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
