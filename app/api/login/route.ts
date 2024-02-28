'use server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log(process.env.BASE_URL);
  const body = await request.json();
  const res = await fetch(`${process.env.BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  const setCookie = res.headers.get('set-cookie');
  const parts = setCookie?.split(';');
  console.log('login response', res);
  let loginToken = '';
  let maxAge = 0;
  parts?.forEach((item) => {
    if (item.startsWith('UserLoginToken=')) {
      loginToken = item.substring('UserLoginToken='.length);
    }

    if (item.startsWith(' Max-Age=')) {
      maxAge = parseInt(item.substring(' Max-Age='.length), 10);
    }
    return;
  });
  console.log('login token ', loginToken);
  cookies().set({
    name: 'UserLoginToken',
    value: `${loginToken}`,
    httpOnly: true,
    sameSite: false,
    secure: false,
    maxAge,
    path: '/',
  });
  if (res.status == 200) {
    return NextResponse.json({
      data,
    });
  } else {
    throw new Error('Please Check your email & password');
  }
}
