import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
// import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get('UserLoginToken')?.value;
  try {
    const res = await fetch(`${process.env.BASE_URL}/cart`, {
      method: 'GET',
      headers: {
        Cookie: `UserLoginToken=${token}`,
      },
    });
    const data = await res.json();
    // revalidatePath('/cart');
    return NextResponse.json(data);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
