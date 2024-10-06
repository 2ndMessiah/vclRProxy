// middleware.js
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const url = new URL(request.url);
  const path = url.pathname.slice(1);  // 去掉 "/"

  // 如果路径为空，返回默认主页或提示信息
  if (!path) {
    return new NextResponse('Mem: 291612K used, 199888K free, 26284K shrd, 5220K buff, 57220K cached', {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // 构造完整的目标 URL
  const targetUrl = `https://${path}`;
  
  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
    });

    return new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    return new NextResponse(`Error: ${error.message}`, { status: 500 });
  }
}
