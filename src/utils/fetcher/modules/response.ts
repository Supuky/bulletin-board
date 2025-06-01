export const analyzeResponse = (response: Response) => {
  if (response.headers.get('content-type')?.includes('application/json')) {
    return response.json();
  }

  return response.text();
};
