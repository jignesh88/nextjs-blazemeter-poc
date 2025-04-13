import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
  const { name, email, address, city, zip, cardNumber, expDate, cvv } =
    req.body;
  // Validate required fields
  if (
    !name ||
    !email ||
    !address ||
    !city ||
    !zip ||
    !cardNumber ||
    !expDate ||
    !cvv
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  // Validate email
  if (!/\S+@\S+.\S+/.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }
  // Validate credit card (basic check)
  if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
    return res.status(400).json({
      success: false,
      message: "Invalid credit card number",
    });
  }
  // Validate expiration date (MM/YY format)
  if (!/^\d{2}\/\d{2}$/.test(expDate)) {
    return res.status(400).json({
      success: false,
      message: "Invalid expiration date format (MM/YY)",
    });
  }
  // Validate CVV
  if (!/^\d{3,4}$/.test(cvv)) {
    return res.status(400).json({
      success: false,
      message: "Invalid CVV",
    });
  }
  // Simulate payment processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  // Generate order ID
  const orderId = `ORD-${Math.floor(Math.random() * 1000000)}`;
  // Return success response
  return res.status(200).json({
    success: true,
    orderId,
    message: "Order placed successfully",
    timestamp: new Date().toISOString(),
  });
}
