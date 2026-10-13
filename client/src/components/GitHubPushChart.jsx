import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { GitBranch, ExternalLink } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const GITHUB_USERNAME = 'Soumya1974';

export default function GitHubPushChart() {
  const { isDark } = useTheme();
  const [pushData, setPushData] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredBar, setHoveredBar] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch public events
        const eventsRes = await axios.get(
          `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`
        );
        const events = eventsRes.data;

        // Build push counts per day (last 14 days)
        const now = new Date();
        const days = [];
        for (let i = 13; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(d.getDate() - i);
          const key = d.toISOString().split('T')[0];
          days.push({ date: key, count: 0, label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) });
        }

        const pushEvents = events.filter(e => e.type === 'PushEvent');
        pushEvents.forEach(event => {
          const eventDate = new Date(event.created_at).toISOString().split('T')[0];
          const dayEntry = days.find(d => d.date === eventDate);
          if (dayEntry) {
            dayEntry.count += event.payload?.commits?.length || 1;
          }
        });

        setPushData(days);

        // Extract unique recently worked repos from events
        const repoMap = new Map();
        events.forEach(event => {
          const name = event.repo.name;
          if (!repoMap.has(name)) {
            repoMap.set(name, {
              name: name.split('/').pop(),
              fullName: name,
              lastActive: new Date(event.created_at),
              eventType: event.type,
            });
          }
        });

        setRepos(Array.from(repoMap.values()).slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch GitHub data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const maxCount = Math.max(...pushData.map(d => d.count), 1);

  const formatRelativeTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Skeleton loader
  if (loading) {
    return (
      <section className={`pt-6 pb-6 border-t transition-colors duration-300 ${
        isDark ? 'border-zinc-900' : 'border-zinc-100'
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-5 h-5 rounded ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'} animate-pulse`} />
          <div className={`h-5 w-40 rounded ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'} animate-pulse`} />
        </div>
        <div className={`rounded-xl border p-4 ${isDark ? 'border-zinc-900 bg-zinc-950/80' : 'border-zinc-200 bg-white'}`}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 h-40 flex items-end gap-1">
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-sm animate-pulse ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}
                  style={{ height: `${20 + Math.random() * 60}%` }}
                />
              ))}
            </div>
            <div className="lg:w-48 space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-10 rounded ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'} animate-pulse`} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`pt-6 pb-6 border-t transition-colors duration-300 ${
      isDark ? 'border-zinc-900' : 'border-zinc-100'
    }`}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2 transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          Push Activity
        </h2>
        <span className={`font-mono-code text-xs transition-colors duration-300 ${
          isDark ? 'text-zinc-500' : 'text-zinc-400'
        }`}>
          Last 14 days
        </span>
      </div>

      {/* Main Card */}
      <div className={`rounded-xl border transition-colors duration-300 ${
        isDark ? 'border-zinc-900 bg-zinc-950/80' : 'border-zinc-200 bg-white'
      }`}>
        <div className="flex flex-col lg:flex-row">
          {/* Chart Area */}
          <div className="flex-1 p-4 sm:p-5">
            <div className="relative" ref={chartRef}>
              {/* SVG Line Graph */}
              <svg
                viewBox={`0 0 ${pushData.length > 0 ? (pushData.length - 1) * 50 + 20 : 100} 140`}
                className="w-full overflow-visible"
                style={{ height: '140px' }}
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Area fill gradient */}
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={isDark ? 'rgba(161,161,170,0.25)' : 'rgba(113,113,122,0.18)'} />
                    <stop offset="100%" stopColor={isDark ? 'rgba(161,161,170,0)' : 'rgba(113,113,122,0)'} />
                  </linearGradient>
                </defs>

                {/* Horizontal grid lines */}
                {[0.25, 0.5, 0.75].map((frac) => (
                  <line
                    key={frac}
                    x1="0"
                    y1={140 - frac * 130}
                    x2={(pushData.length - 1) * 50 + 20}
                    y2={140 - frac * 130}
                    stroke={isDark ? 'rgba(63,63,70,0.35)' : 'rgba(228,228,231,0.7)'}
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Area fill */}
                {pushData.length > 1 && (
                  <path
                    d={(() => {
                      const points = pushData.map((d, i) => {
                        const x = i * 50 + 10;
                        const y = 140 - (maxCount > 0 ? (d.count / maxCount) * 120 : 0) - 5;
                        return { x, y };
                      });
                      // Smooth curve using catmull-rom to bezier
                      let path = `M ${points[0].x} ${points[0].y}`;
                      for (let i = 0; i < points.length - 1; i++) {
                        const p0 = points[Math.max(0, i - 1)];
                        const p1 = points[i];
                        const p2 = points[i + 1];
                        const p3 = points[Math.min(points.length - 1, i + 2)];
                        const cp1x = p1.x + (p2.x - p0.x) / 6;
                        const cp1y = p1.y + (p2.y - p0.y) / 6;
                        const cp2x = p2.x - (p3.x - p1.x) / 6;
                        const cp2y = p2.y - (p3.y - p1.y) / 6;
                        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
                      }
                      const lastX = points[points.length - 1].x;
                      path += ` L ${lastX} 140 L ${points[0].x} 140 Z`;
                      return path;
                    })()}
                    fill="url(#areaGrad)"
                  />
                )}

                {/* Line stroke */}
                {pushData.length > 1 && (
                  <path
                    d={(() => {
                      const points = pushData.map((d, i) => {
                        const x = i * 50 + 10;
                        const y = 140 - (maxCount > 0 ? (d.count / maxCount) * 120 : 0) - 5;
                        return { x, y };
                      });
                      let path = `M ${points[0].x} ${points[0].y}`;
                      for (let i = 0; i < points.length - 1; i++) {
                        const p0 = points[Math.max(0, i - 1)];
                        const p1 = points[i];
                        const p2 = points[i + 1];
                        const p3 = points[Math.min(points.length - 1, i + 2)];
                        const cp1x = p1.x + (p2.x - p0.x) / 6;
                        const cp1y = p1.y + (p2.y - p0.y) / 6;
                        const cp2x = p2.x - (p3.x - p1.x) / 6;
                        const cp2y = p2.y - (p3.y - p1.y) / 6;
                        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
                      }
                      return path;
                    })()}
                    fill="none"
                    stroke={isDark ? 'rgba(161,161,170,0.7)' : 'rgba(113,113,122,0.6)'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Data points (dots) */}
                {pushData.map((day, idx) => {
                  const x = idx * 50 + 10;
                  const y = 140 - (maxCount > 0 ? (day.count / maxCount) * 120 : 0) - 5;
                  const isHovered = hoveredBar === idx;

                  return (
                    <g key={day.date}>
                      {/* Invisible wider hit area */}
                      <circle
                        cx={x}
                        cy={y}
                        r="12"
                        fill="transparent"
                        onMouseEnter={() => setHoveredBar(idx)}
                        onMouseLeave={() => setHoveredBar(null)}
                        style={{ cursor: 'pointer' }}
                      />
                      {/* Visible dot */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? 4.5 : 3}
                        fill={isHovered
                          ? (isDark ? '#d4d4d8' : '#3f3f46')
                          : (isDark ? 'rgba(161,161,170,0.6)' : 'rgba(113,113,122,0.5)')
                        }
                        stroke={isDark ? '#18181b' : '#ffffff'}
                        strokeWidth="1.5"
                        className="transition-all duration-150"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Floating tooltip */}
              {hoveredBar !== null && pushData[hoveredBar] && (
                <div
                  className={`absolute px-2 py-1 rounded text-[10px] font-mono-code whitespace-nowrap z-10 pointer-events-none ${
                    isDark ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-700 text-white'
                  }`}
                  style={{
                    left: `${(hoveredBar / (pushData.length - 1)) * 100}%`,
                    top: '-4px',
                    transform: 'translateX(-50%)',
                  }}
                >
                  {pushData[hoveredBar].count} push{pushData[hoveredBar].count !== 1 ? 'es' : ''} · {pushData[hoveredBar].label}
                </div>
              )}

              {/* X-axis date labels */}
              <div className="flex justify-between mt-2 px-1">
                {pushData.map((day, idx) => (
                  <span
                    key={day.date}
                    className={`font-mono-code transition-colors duration-300 ${
                      isDark ? 'text-zinc-600' : 'text-zinc-400'
                    }`}
                    style={{ fontSize: '9px', width: 0, textAlign: 'center' }}
                  >
                    {idx % 3 === 0 ? day.label : ''}
                  </span>
                ))}
              </div>
            </div>

            {/* Summary stats row */}
            <div className={`flex items-center gap-4 mt-3 pt-3 border-t text-xs font-mono-code ${
              isDark ? 'border-zinc-800/60 text-zinc-500' : 'border-zinc-100 text-zinc-400'
            }`}>
              <span>{pushData.reduce((s, d) => s + d.count, 0)} total pushes</span>
              <span>·</span>
              <span>{pushData.filter(d => d.count > 0).length}/{pushData.length} active days</span>
            </div>
          </div>

          {/* Right sidebar — Recent Repos */}
          <div className={`lg:w-56 xl:w-64 p-4 sm:p-5 border-t lg:border-t-0 lg:border-l flex flex-col ${
            isDark ? 'border-zinc-900' : 'border-zinc-200'
          }`}>
            <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 transition-colors duration-300 ${
              isDark ? 'text-zinc-400' : 'text-zinc-500'
            }`}>
              Recent Repos
            </h3>

            <div className="space-y-2 flex-1">
              {repos.length === 0 ? (
                <p className={`text-xs font-mono-code ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  No recent activity
                </p>
              ) : (
                repos.map((repo, idx) => (
                  <a
                    key={idx}
                    href={`https://github.com/${repo.fullName}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block p-2 rounded-lg transition-colors duration-200 group ${
                      isDark ? 'hover:bg-zinc-900/60' : 'hover:bg-zinc-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GitBranch className={`w-3.5 h-3.5 flex-shrink-0 ${
                        isDark ? 'text-zinc-600' : 'text-zinc-400'
                      }`} />
                      <span className={`text-xs font-medium truncate transition-colors duration-200 ${
                        isDark
                          ? 'text-zinc-300 group-hover:text-white'
                          : 'text-zinc-700 group-hover:text-black'
                      }`}>
                        {repo.name}
                      </span>
                      <ExternalLink className={`w-3 h-3 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity ${
                        isDark ? 'text-zinc-500' : 'text-zinc-400'
                      }`} />
                    </div>
                    <span className={`text-[10px] font-mono-code ml-5.5 block mt-0.5 ${
                      isDark ? 'text-zinc-600' : 'text-zinc-400'
                    }`}>
                      {formatRelativeTime(repo.lastActive)}
                    </span>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
