export function isMissingArchiveColumn(error: { code: string; message: string }): boolean {
  return error.code === "42703" && /\barchived_at\b/i.test(error.message);
}
