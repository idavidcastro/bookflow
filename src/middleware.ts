import { NextResponse } from "next/server";

export async function middleware(req: Request) {
  const cookies = req.headers.get("cookie");

  const userCookie = cookies
    ?.split(";")
    .find((c) => c.trim().startsWith("user="));
  const userString = userCookie ? userCookie.split("=")[1] : null;

  const isLoginPage = req.url.includes("/auth/login");
  const url = new URL(req.url);
  const pathname = url.pathname;

  if (!userString && !isLoginPage) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  const user = userString ? JSON.parse(decodeURIComponent(userString)) : null;

  if (!user?.role) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  const role = user.role;

  const routesForUser = [
    "/dashboard/books",
    "/dashboard/loans",
    "/dashboard/reservations",
    "/dashboard/help",
    "/dashboard/profile",
    "/dashboard/settings",
  ];
  const routesForAdmin = [
    "/dashboard/inventory",
    "/dashboard/transactions",
    "/dashboard/users",
    "/dashboard/statistics",
    "/dashboard/help",
    "/dashboard/profile",
    "/dashboard/settings",
  ];

  if (
    (role === "user" && !routesForUser.includes(pathname)) ||
    (role === "admin" && !routesForAdmin.includes(pathname))
  ) {
    if (pathname !== "/dashboard") {
      const dashboardUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
