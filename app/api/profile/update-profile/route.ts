import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  const formData = await request.formData();
  const cookieStore = cookies();
  const token = cookieStore.get('LoginToken')?.value;

  try {
    const res = await fetch(`${process.env.BASE_URL}/update-profile`, {
      method: 'POST',
      headers: {
        Cookie: `UserLoginToken=${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
