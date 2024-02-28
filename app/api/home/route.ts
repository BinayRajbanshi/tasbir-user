import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get('UserLoginToken')?.value;
  try {
    const res = await fetch(`${process.env.BASE_URL}/products`, {
      method: 'GET',
    });
    const data = await res.json();

    if (res.status == 200) {
      return NextResponse.json(data.data.data);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
}
