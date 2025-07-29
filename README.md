# 🗳️ QR Voting App

A modern voting platform built with **React (Vite + TypeScript)** and **Node.js**, allowing admins to create teams, manage voters, and gather votes securely.  
Votes are cast using a simple PIN-based system and results are visualized with charts that can be downloaded as images or Excel files.

---

## ⚙️ Tech Stack

- Frontend: [Vite](https://vitejs.dev/) + [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- Backend: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- Charts: [Chart.js](https://www.chartjs.org/)
- Excel Export: [SheetJS](https://sheetjs.com/) (xlsx export)
- Image Export: Custom chart-to-image logic

---

## ✅ Features

### 👤 Admin Panel (Private Access Only)

- Create Teams:
  - Team name
  - Member name
  - Team image
- Add Voters:
  - Voter name
  - Unique PIN code for each voter
- Manage voting session

### 🗳️ Voting System

- Each voter can:
  - Login using their PIN
  - Vote on each team **once**
  - Give a score between **0 and 100**

### 📊 Statistics Dashboard

- Total scores automatically calculated for each team
- Visualized using **bar or pie charts**
- Charts can be:
  - 📸 **Downloaded as image (PNG)**
  - 📄 **Exported as XLSX (Excel)**

---

## 🧪 Usage Flow

1. **Admin login** (or pre-defined secure route)
2. **Create teams** (with name, members, and image)
3. **Create voters** (each with unique PIN)
4. **Voting phase**:
   - Voter enters PIN
   - Sees list of teams
   - Gives 0–100 score to each (once only)
5. **Result phase**:
   - Votes are auto-calculated
   - Statistics and rankings are displayed with visual charts
   - Export/download options available

---

## 🚀 Getting Started

### 📦 Clone & Install

```bash
git clone https://github.com/fuadsadiqov/qr-front.git
cd qr-voting-app
```
🔧 Setup Frontend
```bash
cd client
npm install
npm run dev
```
🙋‍♂️ Author
Built by @fuadsadiqov
For internal voting, competitions, or demo events.
