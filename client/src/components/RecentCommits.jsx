import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GitCommit, ExternalLink, RefreshCw, GitBranch, Terminal } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function RecentCommits() {
  const { isDark } = useTheme();
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGithubCommits = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch public events for user Soumya1974 via axios
      const response = await axios.get('https://api.github.com/users/Soumya1974/events/public');
      const data = response.data;
      
      // Filter for PushEvent events which contain actual pushed commits
      const pushEvents = data.filter(event => event.type === 'PushEvent');
      
      const commitList = [];
      pushEvents.forEach(event => {
        const repoName = event.repo.name;
        const createdAt = new Date(event.created_at);
        
        if (event.payload && event.payload.commits) {
          event.payload.commits.forEach(commit => {
            commitList.push({
              sha: commit.sha.substring(0, 7),
              fullSha: commit.sha,
              message: commit.message,
              repo: repoName,
              date: createdAt,
              url: `https://github.com/${repoName}/commit/${commit.sha}`
            });
          });
        }
      });

      // Take latest 6 commits
      setCommits(commitList.slice(0, 6));
    } catch (err) {
      console.error('Failed to fetch GitHub commits:', err);
      setError('Unable to load GitHub commits right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubCommits();
  }, []);

  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <section className={`pt-6 pb-6 border-t transition-colors duration-300 ${
      isDark ? 'border-zinc-900' : 'border-zinc-100'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2 transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-black'
        }`}>
          <GitCommit className="w-5 h-5 text-emerald-500" />
          <span>Recent Pushed Commits</span>
        </h2>
        
        <button
          onClick={fetchGithubCommits}
          disabled={loading}
          className={`p-1.5 rounded-lg border transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono-code ${
            isDark 
              ? 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700' 
              : 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:text-black hover:border-zinc-300'
          }`}
          title="Refresh commits"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Sync</span>
        </button>
      </div>

      <div className={`p-4 sm:p-5 rounded-xl border transition-colors duration-300 ${
        isDark ? 'border-zinc-900 bg-zinc-950/80 text-zinc-300' : 'border-zinc-200 bg-white text-zinc-700'
      }`}>
        {loading ? (
          <div className="space-y-3 py-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`p-3 rounded-lg border animate-pulse space-y-2 ${
                isDark ? 'border-zinc-900 bg-zinc-900/40' : 'border-zinc-100 bg-zinc-50'
              }`}>
                <div className={`h-4 w-3/4 rounded ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
                <div className={`h-3 w-1/2 rounded ${isDark ? 'bg-zinc-800/60' : 'bg-zinc-200/60'}`} />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className={`p-4 rounded-lg text-xs font-mono-code text-center space-y-2 ${
            isDark ? 'bg-zinc-900/50 text-zinc-400' : 'bg-zinc-100 text-zinc-600'
          }`}>
            <p>{error}</p>
            <button 
              onClick={fetchGithubCommits}
              className="text-emerald-500 hover:underline font-semibold"
            >
              Try Again
            </button>
          </div>
        ) : commits.length === 0 ? (
          <p className={`text-xs font-mono-code text-center py-4 ${
            isDark ? 'text-zinc-500' : 'text-zinc-400'
          }`}>
            No recent public push events found.
          </p>
        ) : (
          <div className="space-y-2.5">
            {commits.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group ${
                  isDark 
                    ? 'border-zinc-900/80 bg-zinc-900/30 hover:border-zinc-800 hover:bg-zinc-900/60' 
                    : 'border-zinc-200/70 bg-zinc-50/60 hover:border-zinc-300 hover:bg-zinc-100/80'
                }`}
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <GitBranch className={`w-4 h-4 mt-0.5 flex-shrink-0 transition-colors ${
                    isDark ? 'text-emerald-400' : 'text-emerald-600'
                  }`} />
                  <div className="min-w-0">
                    <p className={`text-xs sm:text-sm font-semibold truncate transition-colors ${
                      isDark ? 'text-zinc-200 group-hover:text-white' : 'text-zinc-800 group-hover:text-black'
                    }`}>
                      {item.message}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-1 text-[11px] font-mono-code">
                      <span className={`px-1.5 py-0.5 rounded border text-[10px] ${
                        isDark ? 'bg-zinc-900 text-zinc-400 border-zinc-800' : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                      }`}>
                        {item.repo}
                      </span>
                      <span className={isDark ? 'text-zinc-500' : 'text-zinc-400'}>
                        {formatRelativeTime(item.date)}
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center space-x-1 font-mono-code text-[11px] px-2 py-1 rounded border flex-shrink-0 self-end sm:self-center transition-colors ${
                    isDark 
                      ? 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white' 
                      : 'bg-white text-zinc-700 border-zinc-300 hover:border-zinc-400 hover:text-black'
                  }`}
                >
                  <span>{item.sha}</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
