import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");
    
    console.log("收到请求，path:", path);
    console.log("所有查询参数:", Object.fromEntries(searchParams));
    
    if (!path) {
      return NextResponse.json({ error: "Path parameter is required" }, { status: 400 });
    }

    // 构建完整的URL
    const baseUrl = "http://43.130.247.176:50061";
    let targetUrl = `${baseUrl}${path}`;
    
    // 添加其他查询参数
    const otherParams = new URLSearchParams();
    searchParams.forEach((value, key) => {
      if (key !== "path") {
        otherParams.append(key, value);
      }
    });
    
    // 正确处理查询参数拼接
    if (otherParams.toString()) {
      const separator = targetUrl.includes('?') ? '&' : '?';
      targetUrl += `${separator}${otherParams.toString()}`;
    }

    console.log("代理请求到:", targetUrl);

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("后端响应状态:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("后端错误响应:", errorText);
      return NextResponse.json(
        { error: `后端错误: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("成功获取数据，数据大小:", JSON.stringify(data).length);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("API路由错误:", error);
    return NextResponse.json(
      { 
        error: "API路由内部错误", 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
