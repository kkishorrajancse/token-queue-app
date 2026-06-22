# 🏥 TokenQ — Live Queue Management System

A real-time token/queue management system built for clinics and hospitals to reduce patient waiting confusion. Built for [Your Hackathon Name] hackathon.

## Problem
Patients waiting at clinics often have no idea how long they'll wait or how many people are ahead of them. Receptionists manage this manually, leading to confusion and frustration.

## Solution
TokenQ provides two connected, real-time screens:
- **Receptionist View** — add patients, call the next token, and set average consultation time
- **Waiting Room Display** — shows the current token being served, tokens ahead, and estimated wait time

Both screens update **instantly** the moment the receptionist clicks "Call Next" — no refresh needed.

## Tech Stack
- **Node.js + Express** — backend server
- **Socket.IO** — real-time, bidirectional communication between screens
- **HTML/CSS/JavaScript** — frontend

## How It Works
1. Receptionist adds a patient → assigned a token number
2. Receptionist clicks "Call Next" → server updates the current token and broadcasts to all connected screens
3. Waiting room screen calculates estimated wait time using: `tokens ahead × average consultation time`

## How to Run Locally
```bash
npm install
node server.js
```
Then open:
- Receptionist view: `http://localhost:3000/receptionist.html`
- Waiting room view: `http://localhost:3000/waitingroom.html`

## Future Improvements
- Persist daily queue stats to a database for analytics
- SMS/notification alerts when a patient's token is approaching
- Multi-counter / multi-doctor support