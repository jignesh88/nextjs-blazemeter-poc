import type { NextApiRequest, NextApiResponse } from 'next';
import { setTimeout } from 'timers';
// Simple in-memory rate limiter
const ipAttempts = new Map<string, { count: number, lastReset: number }>();
// Reset rate limits every 15 minutes
const RATE_LIMIT_RESET_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
export default async function handler(
req: NextApiRequest,
res: NextApiResponse
) {
if (req.method !== 'POST') {
return res.status(405).json({ success: false, message: 'Method not allowed' });
}
const { email, password } = req.body;
// Basic input validation
if (!email || !password) {
return res.status(400).json({ success: false, message: 'Email and password are required' });
}
// Check email format
if (!/\S+@\S+.\S+/.test(email)) {
return res.status(400).json({ success: false, message: 'Invalid email format' });
}
// IP-based rate limiting
const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
const ipKey = String(ip);
const now = Date.now();
if (!ipAttempts.has(ipKey)) {
ipAttempts.set(ipKey, { count: 0, lastReset: now });
}
const attempt = ipAttempts.get(ipKey)!;
// Reset counter if time has passed
if (now - attempt.lastReset > RATE_LIMIT_RESET_MS) {
attempt.count = 0;
attempt.lastReset = now;
}
// Check rate limit
if (attempt.count >= MAX_ATTEMPTS) {
return res.status(429).json({
success: false,
message: 'Too many login attempts, please try again later'
});
}
// Increment attempt counter
attempt.count++;
// Simulate auth delay (this would be a database check in a real app)
await new Promise(resolve => setTimeout(resolve, 500));
// Simple credential check (in a real app, you'd check against a database)
if (email === 'test@example.com' && password === 'password123') {
return res.status(200).json({
success: true,
user: {
id: 'user_123',
email,
name: 'Test User'
},
token: 'mock_jwt_token'
});
}
// Failed login
return res.status(401).json({
success: false,
message: 'Invalid credentials'
});
}
