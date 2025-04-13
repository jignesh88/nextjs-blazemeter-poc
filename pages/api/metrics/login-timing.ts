import type { NextApiRequest, NextApiResponse } from 'next';

type TimingData = {
  loginAttemptStart: number;
  formSubmissionTime: number;
  serverResponseTime: number;
  redirectTime: number;
  totalLoginTime: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Parse timing data from request
  const timingData: TimingData = req.body;

  // In a real app, you would save this data to a database
  // For now, just log it and return success
  console.log('Login timing data received:', timingData);

  // You could add data validation here

  // Return with benchmark data
  res.status(200).json({ 
    message: 'Timing data received',
    data: timingData,
    benchmark: {
      acceptable: timingData.totalLoginTime < 2000,
      recommendation: timingData.totalLoginTime > 2000 
        ? 'Login performance needs optimization' 
        : 'Login performance is acceptable'
    }
  });
}
