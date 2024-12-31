export const baseStyles = `
  body { 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #2d3748; /* Dark text for readability */
    margin: 0;
    padding: 0;
    background-color: #ffe4e1; /* Light pink background for the body */
  }
  .container { 
    max-width: 600px;
    margin: 0 auto;
    padding: 24px;
    background-color: #ffffff; /* White container background for contrast */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  .header { 
    text-align: center;
    padding: 24px;
    background-color: #d81b60; /* Strong rose color for header */
    color: white;
    border-radius: 8px 8px 0 0;
    margin: -24px -24px 24px -24px;
  }
  .header h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  .content { 
    padding: 24px;
    background-color: #fff0f5; /* Light rose for the content area */
    border-radius: 4px;
    line-height: 1.8;
  }
  .content h2 {
    color: #c2185b; /* Deep rose for headings */
    font-size: 20px;
    margin-bottom: 16px;
    font-weight: 600;
  }
  .content p {
    color: #ad1457; /* Medium rose for text */
    margin-bottom: 16px;
  }
  .footer { 
    text-align: center;
    padding: 24px;
    font-size: 14px;
    color: #880e4f; /* Darker rose for footer text */
    border-top: 1px solid #f48fb1;
    margin-top: 24px;
  }
  .button {
    display: inline-block;
    padding: 12px 32px;
    background-color: white; /* Vibrant pink for buttons */
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    margin: 24px 0;
    text-align: center;
    transition: all 0.2s ease;
    box-shadow: 0 2px 6px rgba(233, 30, 99, 0.4);
  }
  .otp {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 4px;
    color: #b71c1c; /* Deep red for OTP */
    padding: 16px;
    background-color: #ffe4e1;
    border: 2px dashed #f48fb1;
    border-radius: 8px;
    margin: 24px auto;
    max-width: 240px;
    text-align: center;
    font-family: 'Courier New', monospace;
  }
  .highlight {
    background-color: #ffe4e1;
    border-left: 4px solid #c2185b; /* Deep rose border */
    padding: 16px;
    margin: 24px 0;
    border-radius: 0 8px 8px 0;
  }
  .divider {
    height: 1px;
    background-color: #f48fb1; /* Rose for divider */
    margin: 24px 0;
  }
  .social-links {
    text-align: center;
    margin-top: 24px;
  }
  .social-links a {
    color: #ad1457; /* Medium rose for links */
    text-decoration: none;
    margin: 0 8px;
  }
  .social-links a:hover {
    color: #d81b60; /* Strong rose hover effect */
  }
  .logo {
    width: 64px;
    height: 64px;
    margin: 0 auto 16px auto;
    display: block;
  }
  @media (max-width: 600px) {
    .container {
      padding: 16px;
    }
    .header {
      margin: -16px -16px 16px -16px;
      padding: 16px;
    }
    .content {
      padding: 16px;
    }
    .otp {
      font-size: 24px;
      letter-spacing: 3px;
      padding: 12px;
    }
  }
`;
