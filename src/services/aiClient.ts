import axios from 'axios';

export const aiClient = axios.create({
  baseURL: import.meta.env.VITE_AI_SERVICE_URL ?? '/api/ai'
});

export interface AiSummaryRequest {
  bookId: string;
  chapter: number;
}

export interface AiSummaryResponse {
  summary: string;
  generatedAt: string;
}

export async function fetchChapterSummary(payload: AiSummaryRequest) {
  const { data } = await aiClient.post<AiSummaryResponse>('/summaries', payload);
  return data;
}
