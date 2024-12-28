import NextAuth, { AuthError, CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { User as myUser } from './lib/types'
import { loginFormSchema } from "./lib/zod/schema"
import { fetchUserFromDb } from "./lib/db"

declare module "next-auth" {
  interface User extends myUser {}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({    
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
          email: { label: "Email", type: "email", placeholder: "Enter your Email" },
          password: { label: "Password", type: "password", placeholder: "Enter your Password" },
      },
      authorize: async (credentials) => {

        let user = null

        // validate credentials
        const parsedCredentials = loginFormSchema.safeParse(credentials);
        
        if (!parsedCredentials.success) throw new CredentialsSignin({cause: "Validation Failed."});

        const { email, password } = parsedCredentials.data

        // logic to verify if the user exists
        user = await fetchUserFromDb(email)

        if (!user) throw new CredentialsSignin({cause: "User is not Registered."});

        if (!user.isverified) throw new CredentialsSignin({cause: "Email is not Verified."});

        //TODO logic to salt and hash password
        const isAuthenticated = user.password === password

        if (!isAuthenticated) throw new CredentialsSignin({cause: "Invalid Credentials."});

        // return user object with their profile data
        return user                                    
      }
    }),
  ],
  callbacks: {
    authorized: async ({ auth,request: { nextUrl }}) => {
      // Logged in users are authenticated, otherwise redirect to login page
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === 'admin'

      const isOnCreate = nextUrl.pathname.startsWith('/create');
      const isOnResutlt = nextUrl.pathname.startsWith('/result');
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      
      if (isOnDashboard) {
        if (isLoggedIn && isAdmin) return true;
        if (isLoggedIn && !isAdmin) return Response.redirect(new URL('/', nextUrl));;
        return false
      }

      if (isOnCreate || isOnResutlt) {
        if (isLoggedIn && !isAdmin) return true;
        if (isLoggedIn && isAdmin) return Response.redirect(new URL('/dashboard', nextUrl));;
        return false        
      }

      if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL('/', nextUrl));
      }

      return true

      /*if (isOnCreate || isOnResutlt || isOnDashboard) {
        if (isLoggedIn) { 
          if (auth.user?.role === 'admin') return Response.redirect(new URL('/dashboard', nextUrl));
          return true
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isOnLogin) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;      */
    }, 
    async redirect({ url }) { 
        //TODO allow redirects on same origin only see function example
        const urlSearchParams = new URLSearchParams(url.split('?')[1]); 
        return urlSearchParams.get('callbackUrl') ?? '/';
    },
    async session({session, token}) {
      session.user.id = token.sub as string;
      session.user.role = token.role as string;
      return session
    },
    async jwt({ token, user }) {
        if(user) token.role = user.role
        return token
    },
  },
  pages: {
    signIn: "/login"
  }
})

