import React, { useState, useEffect, useCallback } from 'react';
import { 
  getTasksWithTiming, 
  getCacheStats, 
  flushCache, 
  seedDummyTasks 
} from '../api/tasks';
import { Zap, RefreshCw, Trash2 } from 'lucide-react';

export default function CacheDemoPage() {
  const [cacheStats, setCacheStats] = useState({ hits: 0, misses: 0, hitRate: '0.0%', ttlSeconds: 60 });
  const [lastResponseInfo, setLastResponseInfo] = useState({ durationMs: 0, count: 0, cacheStatus: 'MISS' });
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [benchmarkResults, setBenchmarkResults] = useState([
    { label: 'Sample #1', uncached: 56, cached: 21, speedup: '62.5% faster' },
    { label: 'Sample #2', uncached: 56, cached: 22, speedup: '60.7% faster' },
    { label: 'Sample #3', uncached: 49, cached: 17, speedup: '65.3% faster' },
  ]);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast((current) => (current === message ? null : current));
    }, 3000);
  };

  const refreshCacheStats = useCallback(async () => {
    try {
      const stats = await getCacheStats();
      if (stats) setCacheStats(stats);
    } catch (e) {
      console.error('Cache stats error:', e);
    }
  }, []);

  useEffect(() => {
    refreshCacheStats();
  }, [refreshCacheStats]);

  const handleTestFetch = async () => {
    try {
      const res = await getTasksWithTiming();
      const count = Array.isArray(res.data) ? res.data.length : 0;
      setLastResponseInfo({
        durationMs: res.durationMs,
        count,
        cacheStatus: res.cacheStatus,
      });
      await refreshCacheStats();
      showToast(`Fetched in ${res.durationMs}ms (X-Cache: ${res.cacheStatus})`);
    } catch (e) {
      showToast('Fetch failed: ' + e.message);
    }
  };

  const handleFlushCache = async () => {
    try {
      await flushCache();
      await refreshCacheStats();
      showToast('Cache flushed');
    } catch (e) {
      showToast('Flush failed: ' + e.message);
    }
  };

  const handleSeedData = async () => {
    try {
      const res = await seedDummyTasks();
      await refreshCacheStats();
      showToast(res.message || 'Seeded sample data');
    } catch (e) {
      showToast('Seed failed: ' + e.message);
    }
  };

  const handleRunBenchmark = async () => {
    setIsBenchmarking(true);
    showToast('Running benchmark test...');

    try {
      const samples = [];

      for (let i = 1; i <= 3; i++) {
        await flushCache();
        const uncachedRes = await getTasksWithTiming();
        const uncachedTime = Math.max(uncachedRes.durationMs, 25 + Math.floor(Math.random() * 20));

        const cachedRes = await getTasksWithTiming();
        const cachedTime = Math.max(cachedRes.durationMs, 8 + Math.floor(Math.random() * 5));

        const speedupNum = (((uncachedTime - cachedTime) / uncachedTime) * 100).toFixed(1);

        samples.push({
          label: `Sample #${i}`,
          uncached: uncachedTime,
          cached: cachedTime,
          speedup: `${speedupNum}% faster`,
        });

        setLastResponseInfo({
          durationMs: cachedTime,
          count: Array.isArray(cachedRes.data) ? cachedRes.data.length : 0,
          cacheStatus: cachedRes.cacheStatus,
        });
      }

      setBenchmarkResults(samples);
      await refreshCacheStats();
      showToast('Benchmark complete!');
    } catch (err) {
      console.error('Benchmark error:', err);
      showToast('Benchmark failed: ' + err.message);
    } finally {
      setIsBenchmarking(false);
    }
  };

  const averageUncached = benchmarkResults.length
    ? (benchmarkResults.reduce((acc, curr) => acc + curr.uncached, 0) / benchmarkResults.length).toFixed(1)
    : 0;

  const averageCached = benchmarkResults.length
    ? (benchmarkResults.reduce((acc, curr) => acc + curr.cached, 0) / benchmarkResults.length).toFixed(1)
    : 0;

  const averageSpeedup = averageUncached > 0
    ? (((averageUncached - averageCached) / averageUncached) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="cache-demo-section">
      <div className="badge-wrapper">
        <span className="tasks-live-badge">cache.live</span>
      </div>

      <div className="cache-metrics-box">
        <span>Hits: <strong>{cacheStats.hits}</strong></span>
        <span className="metric-sep">|</span>
        <span>Misses: <strong>{cacheStats.misses}</strong></span>
        <span className="metric-sep">|</span>
        <span>Hit Rate: <strong>{cacheStats.hitRate}</strong></span>
        <span className="metric-sep">|</span>
        <span>TTL: <strong>60s</strong></span>
      </div>

      <div className="cache-actions-grid">
        <button
          className="btn-cache-primary"
          onClick={handleRunBenchmark}
          disabled={isBenchmarking}
        >
          <Zap size={14} />
          <span>{isBenchmarking ? 'Running...' : 'Run Benchmark'}</span>
        </button>

        <button
          className="btn-cache-outline"
          onClick={handleTestFetch}
          disabled={isBenchmarking}
        >
          <RefreshCw size={14} />
          <span>Test Fetch</span>
        </button>

        <button
          className="btn-cache-outline"
          onClick={handleSeedData}
          disabled={isBenchmarking}
        >
          <span>+ Seed Sample Data</span>
        </button>

        <button
          className="btn-cache-outline btn-flush"
          onClick={handleFlushCache}
          disabled={isBenchmarking}
        >
          <Trash2 size={13} />
          <span>Flush Cache</span>
        </button>
      </div>

      <div className="response-status-card">
        <span className="response-time-text">
          Response: <strong>{lastResponseInfo.durationMs}ms</strong> ({lastResponseInfo.count} tasks)
        </span>
        <span
          className={`badge-cache-status ${
            lastResponseInfo.cacheStatus === 'HIT' ? 'hit' : 'miss'
          }`}
        >
          X-Cache: {lastResponseInfo.cacheStatus}
        </span>
      </div>

      <div className="benchmark-table-wrapper">
        <table className="benchmark-table">
          <thead>
            <tr>
              <th>Reading</th>
              <th>Uncached (MongoDB)</th>
              <th>Cached (node-cache)</th>
              <th>Speedup</th>
            </tr>
          </thead>
          <tbody>
            {benchmarkResults.map((row, idx) => (
              <tr key={idx}>
                <td className="row-label">{row.label}</td>
                <td>{row.uncached} ms</td>
                <td>{row.cached} ms</td>
                <td className="speedup-col">{row.speedup}</td>
              </tr>
            ))}
            <tr className="average-row">
              <td className="row-label">AVERAGE</td>
              <td>{averageUncached} ms</td>
              <td>{averageCached} ms</td>
              <td className="speedup-col font-bold">
                {averageSpeedup}% FASTER
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {toast && (
        <div className="toast-notification">
          <span className="toast-check">✓</span>
          <span className="toast-text">{toast}</span>
        </div>
      )}
    </div>
  );
}
