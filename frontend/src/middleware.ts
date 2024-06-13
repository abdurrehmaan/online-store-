import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { NextApiRequest } from "next";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/";

  const token = request.cookies.get("loginToken")?.value || "";

  //   if (token) {
  //     // this is how we sign= jwt.sign(object,secretKey)
  //     // now use the same secretKey to decode the token
  //    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  //    console.log(decodedToken)
  // //    userId = decodedToken?.issuer;
  //  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
export const config = {
  matcher: ["/", "/dashboard:path*"],
};

// // This function can be marked `async` if using `await` inside
// export function middleware(request : Request) {
//   console.log("hi i m middle")
//   const path = request.nextUrl.pathname;
//   const isPublicPath = path === "/admin/login" || path === "/";

//   const token = request.cookies.get("token")?.value || "";

//   console.log('token in middleware', token)

//   if(isPublicPath && token) {
//     return NextResponse.redirect(new URL('/admin/dashboard', request.url))
//   }

//   if(!isPublicPath && !token) {
//     return NextResponse.redirect(new URL('/admin/login', request.url))
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/","/dashboard:path*", "/admin/login", '/admin/dashboard:path*'],
// };
