import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any, req) {
        const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };

        if (user && credentials.password === 'password123') {
          return user;
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/sign-in',
  },
});