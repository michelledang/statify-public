export const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = '8286aa2886f744d09933877bc2490c40';
export const redirectUri = 'https://statify.michelledang.me/callback'; //http://michelledang.github.io/statify/ http://localhost:3000/callback https://statify.vercel.app/callback
// export const redirectUri = 'http://localhost:3000/callback';
export const scopes = [
  'user-top-read',
  'user-read-private',
  'user-read-email',
  'user-read-recently-played',
];
