import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('UserLoginToken')?.value;
  try {
    const response = await fetch(`${process.env.BASE_URL}/cart/add`, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json',
        Cookie: `UserLoginToken=${token}`,
      },
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
