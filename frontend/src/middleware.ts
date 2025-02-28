import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const allowedRouteForOthers = "/dashboard/project";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("tokenjwt")?.value;
  const userInfoCookie = request.cookies.get("userInfo")?.value;
  const currentPath = request.nextUrl.pathname;
  const loginPath = "/login";
  const homePath = "/";

  if (!token) {
    if (currentPath === loginPath) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(loginPath, request.url));
  }

  try {
    const secretKey = "KEY_TEST_MEGAPAGOS";
    if (!secretKey) throw new Error("JWT_SECRET no está definido en el entorno");
    const secret = new TextEncoder().encode(secretKey);
    await jwtVerify(token, secret);

    let roleId = null;
    if (userInfoCookie) {
      const parsedUserInfo = JSON.parse(decodeURIComponent(userInfoCookie));
      roleId = parsedUserInfo.roleId;
    }
    if (currentPath === homePath || currentPath === loginPath) {
      return NextResponse.redirect(new URL(allowedRouteForOthers, request.url));
    }
    if (roleId === 1) {
      return NextResponse.next();
    } else {
      if (currentPath !== allowedRouteForOthers) {
        return NextResponse.redirect(new URL(allowedRouteForOthers, request.url));
      }
      return NextResponse.next();
    }
  } catch (error: any) {
    console.error("Error verificando el token:", error.message);
    if (currentPath === loginPath) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(loginPath, request.url));
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login"],
};
