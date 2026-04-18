"use client";

import { useState, useEffect } from "react";
import { 
  Flame, 
  Target, 
  Zap, 
  TrendingUp, 
  Plus, 
  Activity, 
  Moon, 
  Coffee,
  CheckCircle2,
  Trophy,
  Heart,
  Timer
} from "lucide-react";
import { generateSuggestion, UserActivity, Suggestion } from "@/lib/adaptive";
import { MILESTONES, calculateStreak } from "@/lib/motivation";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activities, setActivities] = useState<UserActivity[]>([
    { id: '1', type: 'workout', date: new Date(Date.now() - 24 * 60 * 60 * 1000), intensity: 'high' },
    { id: '2', type: 'workout', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), intensity: 'medium' },
  ]);
  
  const [streak, setStreak] = useState(0);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);

  useEffect(() => {
    setMounted(true);
    const s = calculateStreak(activities.map(a => a.date));
    setStreak(s);
    setSuggestion(generateSuggestion(activities));
  }, [activities]);

  if (!mounted) {
    return <div style={{ background: 'var(--background)', minHeight: '100vh' }}></div>;
  }

  const addActivity = (type: UserActivity['type'], intensity: UserActivity['intensity'] = 'medium') => {
    const newActivity: UserActivity = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      date: new Date(),
      intensity
    };
    setActivities([newActivity, ...activities]);
  };

  return (
    <main className="animate-fade-in" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 className="text-gradient-blue" style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.04em' }}>FitSphere</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem', fontSize: '1.1rem' }}>Your journey is built on consistency. Start today.</p>
        </div>
        <div className="glass" style={{ padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
          <Flame size={32} color={streak > 0 ? "var(--accent-orange)" : "var(--text-muted)"} fill={streak > 0 ? "var(--accent-orange)" : "none"} />
          <div>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, display: 'block' }}>{streak} Days</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Current Streak</span>
          </div>
        </div>
      </header>

      {/* Hero Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px', marginBottom: '2.5rem' }}>
        
        {/* Consistency Overview */}
        <section className="card" style={{ display: 'flex', alignItems: 'center', gap: '32px', minHeight: '220px' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Consistency Score</h2>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '4.5rem', fontWeight: 800 }}>82</span>
              <span style={{ fontSize: '1.5rem', color: 'var(--accent-mint)', fontWeight: 600 }}>%</span>
            </div>
            <p style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-mint)' }}>
              <TrendingUp size={18} />
              <span style={{ fontWeight: 600 }}>Top 5% of users this week</span>
            </p>
          </div>
          <div style={{ width: '120px', height: '120px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="120" height="120" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--card-border)" strokeWidth="6" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--accent-blue)" strokeWidth="6" 
                strokeDasharray="230 282" 
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            <Zap size={32} color="var(--accent-blue)" style={{ position: 'absolute' }} />
          </div>
        </section>

        {/* Adaptive Coach Insight */}
        {suggestion && (
          <section className="card" style={{ 
            borderLeft: `4px solid ${suggestion.type === 'recovery' ? 'var(--accent-mint)' : 'var(--accent-blue)'}`,
            background: `linear-gradient(135deg, ${suggestion.type === 'recovery' ? 'rgba(0, 223, 216, 0.08)' : 'rgba(0, 112, 243, 0.08)'} 0%, transparent 100%)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <Timer size={20} color={suggestion.type === 'recovery' ? 'var(--accent-mint)' : 'var(--accent-blue)'} />
              <h2 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Coach's Insight</h2>
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>{suggestion.title}</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '1rem' }}>
              {suggestion.message}
            </p>
            <button 
              className="btn-primary" 
              style={{ 
                background: suggestion.type === 'recovery' ? 'var(--accent-mint)' : 'var(--accent-blue)', 
                color: suggestion.type === 'recovery' ? '#000' : '#fff',
                width: 'fit-content',
                padding: '12px 32px'
              }}
              onClick={() => addActivity('rest', 'low')}
            >
              Log Suggestion
            </button>
          </section>
        )}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* Interactive Logger */}
        <section className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Plus size={20} /> Quick Log
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <LogOption icon={<Activity size={24}/>} label="Workout" color="var(--accent-blue)" onClick={() => addActivity('workout', 'high')} />
            <LogOption icon={<Coffee size={24}/>} label="Nutrition" color="var(--accent-orange)" onClick={() => addActivity('nutrition')} />
            <LogOption icon={<Moon size={24}/>} label="Sleep" color="var(--accent-mint)" onClick={() => addActivity('sleep')} />
            <LogOption icon={<Heart size={24}/>} label="Rest" color="#f3f3f3" onClick={() => addActivity('rest', 'low')} />
          </div>
        </section>

        {/* Milestone Gallery */}
        <section className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Trophy size={20} color="gold" /> Achievements
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))', gap: '16px' }}>
            {MILESTONES.map(m => (
              <div key={m.id} className="glass" style={{ 
                aspectRatio: '1', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                opacity: m.unlocked ? 1 : 0.3,
                filter: m.unlocked ? 'none' : 'grayscale(1)',
                transition: 'all 0.3s ease'
              }} title={m.name}>
                {m.icon === 'zap' && <Zap size={24} color="var(--accent-blue)" />}
                {m.icon === 'flame' && <Flame size={24} color="var(--accent-orange)" />}
                {m.icon === 'trophy' && <Trophy size={24} color="gold" />}
                {m.icon === 'heart' && <Heart size={24} color="var(--accent-mint)" />}
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Next: {streak}/7 days for 'Consistent Week'
          </p>
        </section>

        {/* Recent Feed */}
        <section className="card" style={{ gridColumn: 'span 1' }}>
           <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Recent Activity</h2>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {activities.slice(0, 4).map((a, i) => (
                <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px', borderBottom: i < 3 ? '1px solid var(--card-border)' : 'none' }}>
                  <div style={{ 
                    padding: '10px', 
                    borderRadius: '12px', 
                    background: a.type === 'workout' ? 'var(--accent-blue-glow)' : 'var(--glass-bg)',
                    color: a.type === 'workout' ? 'var(--accent-blue)' : 'var(--foreground)'
                  }}>
                    {a.type === 'workout' ? <Activity size={20} /> : a.type === 'nutrition' ? <Coffee size={20} /> : <Moon size={20} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '1rem' }}>{a.type.charAt(0).toUpperCase() + a.type.slice(1)}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {a.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                      <span style={{ margin: '0 8px', opacity: 0.3 }}>|</span>
                      <span style={{ textTransform: 'capitalize' }}>{a.intensity || 'Normal'}</span>
                    </div>
                  </div>
                  <CheckCircle2 size={18} color="var(--accent-mint)" />
                </div>
              ))}
           </div>
        </section>

      </div>
    </main>
  );
}

function LogOption({ icon, label, color, onClick }: { icon: React.ReactNode, label: string, color: string, onClick: () => void }) {
  return (
    <div className="glass" onClick={onClick} style={{ 
      padding: '16px', 
      textAlign: 'center', 
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px'
    }}>
      <div style={{ color }}>{icon}</div>
      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{label}</div>
    </div>
  );
}
