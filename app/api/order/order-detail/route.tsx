import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('UserLoginToken')?.value;
  const body = await request.json();
  try {
    const res = await fetch(`${process.env.BASE_URL}/orders/show/${body.id}`, {
      method: 'GET',
      headers: {
        Cookie: `UserLoginToken=${token}`,
      },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
