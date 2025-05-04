# 🎤 AshLyricist
![image](https://github.com/user-attachments/assets/7ddf590a-c49c-4d90-bb7c-17e37f6891b4)

**AshLyricist** is your personal AI-powered lyric and beat generator. It transforms moods, ideas, and prompts into full song lyrics with suggested beats — perfect for rappers, poets, and music creators. Powered by **Gemini**, built using **Next.js** and **shadcn/ui**, and respects your privacy with user-supplied API keys.

---

## 🚀 Features

- ✍️ Generate rap, pop, or poetic lyrics from mood or topic
- 🎵 Get matching beat suggestions with tempo & vibe
- 🔐 User provides their **own Gemini API key** for AI usage
- ⚡ Built with **Next.js (App Router)** + **shadcn/ui**
- 💾 No user data or API keys stored — 100% client-side
- 📤 Export lyrics and share on social media

---

## 🧠 How It Works

1. Enter your **Gemini API key** (stored locally, never sent to a server)
2. Choose a **mood** or type a **custom prompt**
3. Select a **genre** (rap, sad pop, poetry, etc.)
4. Hit generate — get full lyrics + matching beat style
5. Copy, export, or share your creations

---

## 🛠 Tech Stack

- **Frontend**: [Next.js 14](https://nextjs.org/) (App Router)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) + Tailwind CSS
- **AI Backend**: Gemini Pro (via user-provided API key)
- **State Management**: React Hooks + Context API
- **Deployment**: [Vercel](https://vercel.com/)

---

## 📦 Local Development

```bash
git clone https://github.com/yourusername/ashlyricist.git
cd ashlyricist
npm install
npm run dev
