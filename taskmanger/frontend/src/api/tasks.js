const API_BASE = 'http://localhost:5000';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getTasks() {
  const res = await fetch(`${API_BASE}/tasks`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? `Request failed (status ${res.status})`);
  return data;
}

/**
 * Fetch tasks with latency timing and X-Cache header inspection
 * Used by Practical 9 Cache Benchmark view
 */
export async function getTasksWithTiming() {
  const start = performance.now();
  const res = await fetch(`${API_BASE}/tasks`, {
    headers: getAuthHeaders(),
  });
  const durationMs = Math.round(performance.now() - start);
  const cacheStatus = res.headers.get('X-Cache') || 'MISS';
  const data = await res.json().catch(() => null);

  if (!res.ok) throw new Error(data?.error ?? `Request failed (status ${res.status})`);
  return {
    data,
    durationMs,
    cacheStatus,
  };
}

export async function createTask(taskData) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(taskData),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? `Request failed (status ${res.status})`);
  return data;
}

export async function updateTask(id, updates) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(updates),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? `Request failed (status ${res.status})`);
  return data;
}

export async function deleteTask(id) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? `Request failed (status ${res.status})`);
  return data;
}

export async function getCacheStats() {
  const res = await fetch(`${API_BASE}/tasks/cache/stats`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? `Failed to fetch stats`);
  return data;
}

export async function flushCache() {
  const res = await fetch(`${API_BASE}/tasks/cache/flush`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? `Failed to flush cache`);
  return data;
}

export async function seedDummyTasks() {
  const res = await fetch(`${API_BASE}/tasks/seed-dummy`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error ?? `Failed to seed dummy tasks`);
  return data;
}
