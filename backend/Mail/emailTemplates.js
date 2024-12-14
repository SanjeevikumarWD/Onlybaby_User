import Handlebars from 'handlebars';
import { baseStyles } from './styles.js';

export const emailTemplates = {
  verifyEmail: Handlebars.compile(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="cid:logo" alt="Toy Store Logo" class="logo" />
          <h1>🧸 Toy Store - Email Verification</h1>
        </div>
        <div class="content">
          <h2>Hello {{name}}!</h2>
          <div class="highlight">
            <p>Welcome to Toy Store! Please use the following OTP to verify your email address:</p>
          </div>
          <div class="otp">{{otp}}</div>
          <p>This OTP will expire in 10 minutes.</p>
          <div class="divider"></div>
          <p>If you didn't request this verification, please ignore this email.</p>
        </div>
        <div class="footer">
          <div class="social-links">
            <a href="#">Facebook</a> • <a href="#">Twitter</a> • <a href="#">Instagram</a>
          </div>
          <p>© 2023 Toy Store. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `),

  welcome: Handlebars.compile(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="cid:logo" alt="Toy Store Logo" class="logo" />
          <h1>🎉 Welcome to Toy Store!</h1>
        </div>
        <div class="content">
          <h2>Welcome aboard, {{name}}!</h2>
          <div class="highlight">
            <p>We're excited to have you join our magical world of toys.</p>
            <p>Start exploring our collection and find the perfect toys for your little ones!</p>
          </div>
          <a href="{{shopUrl}}" class="button">Start Shopping</a>
          <div class="divider"></div>
          <p>If you have any questions, our support team is always here to help.</p>
        </div>
        <div class="footer">
          <div class="social-links">
            <a href="#">Facebook</a> • <a href="#">Twitter</a> • <a href="#">Instagram</a>
          </div>
          <p>© 2023 Toy Store. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `),

  resetPasswordButton: Handlebars.compile(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="cid:logo" alt="Toy Store Logo" class="logo" />
          <h1>🔐 Reset Your Password</h1>
        </div>
        <div class="content">
          <h2>Hello {{name}},</h2>
          <div class="highlight">
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
          </div>
          <a href="{{resetUrl}}" class="button">Reset Password</a>
          <div class="divider"></div>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this change, please ignore this email.</p>
        </div>
        <div class="footer">
          <div class="social-links">
            <a href="#">Facebook</a> • <a href="#">Twitter</a> • <a href="#">Instagram</a>
          </div>
          <p>© 2023 Toy Store. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `),

  resetPasswordOTP: Handlebars.compile(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="cid:logo" alt="Toy Store Logo" class="logo" />
          <h1>🔐 Password Reset OTP</h1>
        </div>
        <div class="content">
          <h2>Hello {{name}},</h2>
          <div class="highlight">
            <p>Use the following OTP to reset your password:</p>
          </div>
          <div class="otp">{{otp}}</div>
          <div class="divider"></div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this change, please ignore this email.</p>
        </div>
        <div class="footer">
          <div class="social-links">
            <a href="#">Facebook</a> • <a href="#">Twitter</a> • <a href="#">Instagram</a>
          </div>
          <p>© 2023 Toy Store. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `),

  resetSuccess: Handlebars.compile(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>${baseStyles}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="cid:logo" alt="Toy Store Logo" class="logo" />
          <h1>✅ Password Reset Successful</h1>
        </div>
        <div class="content">
          <h2>Hello {{name}},</h2>
          <div class="highlight">
            <p>Your password has been successfully reset.</p>
            <p>You can now log in to your account with your new password.</p>
          </div>
          <a href="{{loginUrl}}" class="button">Login to Your Account</a>
          <div class="divider"></div>
          <p>If you didn't make this change, please contact our support team immediately.</p>
        </div>
        <div class="footer">
          <div class="social-links">
            <a href="#">Facebook</a> • <a href="#">Twitter</a> • <a href="#">Instagram</a>
          </div>
          <p>© 2023 Toy Store. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `)
};