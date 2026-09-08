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
      const pushEvents = data.filter(event => event.type === 'PushEvent').slice(0, 12);
      
      const commitPromises = pushEvents.map(async (event) => {
        const repoName = event.repo.name;
        const createdAt = new Date(event.created_at);
        const refName = event.payload?.ref ? event.payload.ref.replace('refs/heads/', '') : 'main';
        
        // 1. If payload contains commit details directly in commits array
        if (event.payload && Array.isArray(event.payload.commits) && event.payload.commits.length > 0) {
          const lastCommit = event.payload.commits[event.payload.commits.length - 1];
          const sha = lastCommit.sha || event.payload.head || 'main';
          return {
            sha: sha.substring(0, 7),
            fullSha: sha,
            message: lastCommit.message ? lastCommit.message.split('\n')[0] : `Pushed code to ${refName}`,
            repo: repoName,
            branch: refName,
            date: createdAt,
            url: `https://github.com/${repoName}/commit/${sha}`
          };
        } 
        
        // 2. If payload contains head SHA (typical for GitHub public events feed)
        if (event.payload && event.payload.head) {
          const headSha = event.payload.head;
          let commitMessage = `Pushed updates to ${refName}`;
          
          try {
            // Fetch individual commit details from GitHub API via axios
            const commitRes = await axios.get(`https://api.github.com/repos/${repoName}/commits/${headSha}`);
            if (commitRes.data && commitRes.data.commit && commitRes.data.commit.message) {
              commitMessage = commitRes.data.commit.message.split('\n')[0];
            }
          } catch (e) {
            // Fallback message if rate-limited or private repo
            commitMessage = `Pushed updates to ${refName}`;
          }

          return {
            sha: headSha.substring(0, 7),
            fullSha: headSha,
            message: commitMessage,
            repo: repoName,
            branch: refName,
            date: createdAt,
            url: `https://github.com/${repoName}/commit/${headSha}`
          };
        }

        return null;
      });

      const resolvedCommits = (await Promise.all(commitPromises)).filter(Boolean);
      setCommits(resolvedCommits);
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
    <section className={`pt-6 pb-8 transition-colors duration-300 ${
      isDark ? 'border-t border-zinc-900' : 'border-t border-zinc-200'
    }`}>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold tracking-tight flex items-center gap-2 transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-zinc-900'
        }`}>
          <GitCommit className="w-5 h-5 text-emerald-500" />
          <span>Recent Pushed Commits</span>
        </h2>
        
        <button
          onClick={fetchGithubCommits}
          disabled={loading}
          className={`px-2.5 py-1 rounded-md transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-mono-code ${
            isDark 
              ? 'text-zinc-400 hover:text-white hover:bg-zinc-900' 
              : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
          }`}
          title="Refresh activity"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Sync</span>
        </button>
      </div>

      {/* Timeline Container */}
      <div className="relative pl-1 sm:pl-2">
        {loading ? (
          <div className="space-y-6 py-2 pl-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className={`w-3 h-3 rounded-full mt-1.5 ${isDark ? 'bg-zinc-800' : 'bg-zinc-300'}`} />
                <div className="space-y-2 flex-1">
                  <div className={`h-4 w-2/3 rounded ${isDark ? 'bg-zinc-800/80' : 'bg-zinc-200'}`} />
                  <div className={`h-3 w-1/3 rounded ${isDark ? 'bg-zinc-800/50' : 'bg-zinc-200/60'}`} />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className={`py-4 text-xs font-mono-code text-center ${
            isDark ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            <p>{error}</p>
            <button 
              onClick={fetchGithubCommits}
              className="mt-2 text-emerald-500 hover:underline font-semibold"
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
          <div 
            className="max-h-[320px] overflow-y-auto pr-2 pl-1 transition-colors duration-300"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: isDark ? '#3f3f46 transparent' : '#d4d4d8 transparent'
            }}
          >
            <div className="relative space-y-1.5 py-1">
              {commits.map((item, idx) => (
                <div key={idx} className="relative pl-6 group">
                  {/* L-shaped Reddit reply branch line */}
                  <div 
                    className={`absolute left-1 top-0 w-4 h-4 border-l-2 border-b-2 rounded-bl-lg transition-colors duration-200 ${
                      isDark 
                        ? 'border-zinc-800 group-hover:border-emerald-500/80' 
                        : 'border-zinc-300 group-hover:border-emerald-600/80'
                    }`}
                  />
                  
                  {/* Vertical line continuing down for non-last items */}
                  {idx !== commits.length - 1 && (
                    <div 
                      className={`absolute left-1 top-4 bottom-0 border-l-2 transition-colors duration-200 ${
                        isDark ? 'border-zinc-800' : 'border-zinc-300'
                      }`}
                    />
                  )}

                  {/* Timeline Item Content - Borderless */}
                  <div className={`p-2.5 rounded-lg transition-colors duration-200 ${
                    isDark ? 'hover:bg-zinc-900/50' : 'hover:bg-zinc-100/70'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                      <p className={`text-xs sm:text-sm font-medium transition-colors duration-200 ${
                        isDark ? 'text-zinc-200 group-hover:text-white' : 'text-zinc-800 group-hover:text-black'
                      }`}>
                        {item.message}
                      </p>
                      
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 text-xs font-mono-code flex-shrink-0 transition-colors ${
                          isDark 
                            ? 'text-emerald-400 hover:text-emerald-300' 
                            : 'text-emerald-600 hover:text-emerald-700'
                        }`}
                      >
                        <span>{item.sha}</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>
                    </div>

                    {/* Meta Information */}
                    <div className="flex items-center gap-2 mt-1.5 text-[11px] font-mono-code flex-wrap">
                      <span className={`flex items-center gap-1 ${
                        isDark ? 'text-zinc-400' : 'text-zinc-600'
                      }`}>
                        <GitBranch className="w-3 h-3 text-emerald-500 opacity-80" />
                        {item.repo}
                      </span>
                      <span className={isDark ? 'text-zinc-700' : 'text-zinc-300'}>•</span>
                      <span className={isDark ? 'text-zinc-500' : 'text-zinc-400'}>
                        {formatRelativeTime(item.date)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
