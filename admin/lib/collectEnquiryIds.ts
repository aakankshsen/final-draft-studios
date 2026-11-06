export async function collectEnquiryIds(fetchPage: (afterId: string | null) => Promise<string[]>): Promise<string[]> {
  const ids: string[] = [];
  let afterId: string | null = null;
  while (true) {
    const page = await fetchPage(afterId);
    if (page.length === 0) return ids;
    if ((afterId !== null && page[0] <= afterId) || page.some((id, index) => index > 0 && id <= page[index - 1])) {
      throw new Error("Could not select enquiries: invalid page order.");
    }
    ids.push(...page);
    afterId = page[page.length - 1];
  }
}
