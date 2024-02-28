import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface ParamT {
  params: {
    id: string;
  };
}
export async function POST(request: Request, { params }: ParamT) {
  const cookieStore = cookies();
  const token = cookieStore.get('UserLoginToken')?.value;
  try {
    const res = await fetch(`${process.env.BASE_URL}/cart/remove/${params.id}`, {
      method: 'POST',
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
