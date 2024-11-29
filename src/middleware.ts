import { NextResponse } from "next/server";

export async function middleware(req: Request) {
  const cookies = req.headers.get("cookie");
  console.log("Cabeceras de la solicitud:", cookies);

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

  console.log("rol del usuario", role);

  // Define las rutas permitidas para cada rol
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

  // Verifica si la ruta solicitada está permitida para el rol del usuario
  if (
    (role === "user" && !routesForUser.includes(pathname)) ||
    (role === "admin" && !routesForAdmin.includes(pathname))
  ) {
    // Previene bucles de redireccionamiento comprobando si la URL actual ya es '/dashboard'
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
