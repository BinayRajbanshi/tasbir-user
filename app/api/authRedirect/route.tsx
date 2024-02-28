import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

type Platform = 'facebook' | 'google';

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('User token')?.value;
  const searchParams = request.nextUrl.searchParams;
  const platform = searchParams.get('platform') as Platform;

  if (!platform) {
    return NextResponse.json({ error: 'Platform parameter is required' }, { status: 400 });
  }

  console.log('Received platform:', platform);

  try {
    const response = await fetch(`https://api.tasbirstory.com/api/user/auth/${platform}/redirect`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Response Data:', responseData);
      if (responseData.code === 0) {
        return NextResponse.redirect(responseData.data);
      } else {
        return NextResponse.json({ error: 'Signup Failed' }, { status: responseData.code });
      }
    } else {
      return NextResponse.json({ error: 'Signup Failed' }, { status: 500 });
    }
  } catch (error) {
    console.log('Error:', error);
    return NextResponse.json({ error: 'Signup Failed' }, { status: 500 });
  }
}
