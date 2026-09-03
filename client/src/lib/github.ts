/*
 * Public GitHub contribution loader for the static portfolio.
 * A browser-safe username is read from VITE_GITHUB_USERNAME; GITHUB_TOKEN is
 * intentionally never referenced here because VITE_* values are client-visible.
 */

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
  weekday: number;
};

export type ContributionWeek = {
  days: ContributionDay[];
};

export type GitHubActivity = {
  login: string;
  profileUrl: string;
  totalContributions: number;
  contributions: ContributionDay[];
  weeks: ContributionWeek[];
  source: "live" | "placeholder";
};

type PublicContribution = {
  date?: unknown;
  count?: unknown;
  level?: unknown;
};

type PublicResponse = {
  total?: Record<string, number>;
  contributions?: PublicContribution[];
};

const API_ROOT = "https://github-contributions-api.jogruber.de/v4";

function toUtcDate(date: string) {
  return new Date(`${date}T00:00:00.000Z`);
}

function toIsoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function clampLevel(value: unknown): ContributionLevel {
  const number = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.min(4, Math.max(0, Math.round(number))) as ContributionLevel;
}

function createEmptyWeeks(days = 365): ContributionWeek[] {
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());

  const paddedDays: ContributionDay[] = [];
  for (let index = 0; index < 371; index += 1) {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    paddedDays.push({ date: toIsoDate(date), count: 0, level: 0, weekday: date.getUTCDay() });
  }

  const weeks: ContributionWeek[] = [];
  for (let index = 0; index < paddedDays.length; index += 7) {
    weeks.push({ days: paddedDays.slice(index, index + 7) });
  }
  return weeks;
}

function normalizeContributions(username: string, payload: PublicResponse): GitHubActivity {
  const rawDays = Array.isArray(payload.contributions) ? payload.contributions : [];
  const validDays: ContributionDay[] = rawDays
    .filter((day) => typeof day.date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(day.date))
    .map((day) => ({
      date: day.date as string,
      count: typeof day.count === "number" ? day.count : Number(day.count) || 0,
      level: clampLevel(day.level),
      weekday: toUtcDate(day.date as string).getUTCDay(),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (validDays.length === 0) {
    return {
      login: username,
      profileUrl: `https://github.com/${username}`,
      totalContributions: 0,
      contributions: [],
      weeks: createEmptyWeeks(),
      source: "placeholder",
    };
  }

  const first = toUtcDate(validDays[0].date);
  first.setUTCDate(first.getUTCDate() - first.getUTCDay());
  const last = toUtcDate(validDays[validDays.length - 1].date);
  last.setUTCDate(last.getUTCDate() + (6 - last.getUTCDay()));
  const byDate = new Map(validDays.map((day) => [day.date, day]));
  const paddedDays: ContributionDay[] = [];

  for (const cursor = new Date(first); cursor <= last; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
    const date = toIsoDate(cursor);
    paddedDays.push(byDate.get(date) ?? { date, count: 0, level: 0, weekday: cursor.getUTCDay() });
  }

  const weeks: ContributionWeek[] = [];
  for (let index = 0; index < paddedDays.length; index += 7) {
    weeks.push({ days: paddedDays.slice(index, index + 7) });
  }

  const totalContributions = Object.values(payload.total ?? {}).reduce((sum, value) => sum + (Number(value) || 0), 0);
  return {
    login: username,
    profileUrl: `https://github.com/${username}`,
    totalContributions,
    contributions: validDays,
    weeks,
    source: "live",
  };
}

export function getConfiguredGithubUsername() {
  return (import.meta.env.GITHUB_USERNAME ?? "").trim();
}

export function createPlaceholderActivity(username = "yourusername"): GitHubActivity {
  return {
    login: username,
    profileUrl: `https://github.com/${username}`,
    totalContributions: 0,
    contributions: [],
    weeks: createEmptyWeeks(),
    source: "placeholder",
  };
}

export async function loadGithubActivity(username: string, signal?: AbortSignal) {
  const normalizedUsername = username.trim();
  if (!normalizedUsername) {
    return createPlaceholderActivity();
  }

  const response = await fetch(`${API_ROOT}/${encodeURIComponent(normalizedUsername)}?y=last`, {
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok) {
    throw new Error(`GitHub activity request failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as PublicResponse;
  return normalizeContributions(normalizedUsername, payload);
}
