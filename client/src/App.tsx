import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-gradient mb-8 animate-fade-in-up">
          Portfolio Website
        </h1>

        <div className="glass-card mb-8 animate-float">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Your Portfolio</h2>
          <p className="text-muted-foreground mb-6">
            This is your modern, full-stack portfolio website built with React, TypeScript, and Tailwind CSS.
          </p>

          <div className="flex gap-4">
            <button
              className="btn-primary"
              onClick={() => setCount(count + 1)}
            >
              Count: {count}
            </button>
            <button className="btn-secondary">
              Learn More
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card animate-glow">
            <h3 className="text-xl font-semibold mb-2">Frontend</h3>
            <p className="text-sm text-muted-foreground">React + TypeScript + Vite</p>
          </div>
          <div className="card animate-glow" style={{animationDelay: '0.2s'}}>
            <h3 className="text-xl font-semibold mb-2">Backend</h3>
            <p className="text-sm text-muted-foreground">Node.js + Express + PostgreSQL</p>
          </div>
          <div className="card animate-glow" style={{animationDelay: '0.4s'}}>
            <h3 className="text-xl font-semibold mb-2">Deployment</h3>
            <p className="text-sm text-muted-foreground">Vercel + Railway</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App