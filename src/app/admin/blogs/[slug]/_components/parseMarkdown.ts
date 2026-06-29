export function parseMarkdown(md: string): string {
  if (!md) return "";
  let html = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-900 text-slate-100 p-4 rounded-xl my-4 overflow-x-auto"><code>$1</code></pre>');
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-rose-600 px-1.5 py-0.5 rounded font-mono text-sm">$1</code>');
  // Headings
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-base font-bold text-slate-900 mt-4 mb-2">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-lg font-bold text-slate-900 mt-6 mb-3">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-xl font-extrabold text-slate-900 mt-8 mb-4">$1</h1>');
  // Bold & Italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em class="italic text-slate-800">$1</em>');
  // Blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote class="border-l-4 border-slate-300 pl-4 italic text-slate-600 my-4">$1</blockquote>');
  // Images
  html = html.replace(/\!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-xl max-w-full my-4 border" />');
  // Links
  html = html.replace(/\[([^\]]*)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-indigo-600 hover:underline font-medium">$1</a>');
  // Bullet lists
  html = html.replace(/^\s*\-\s+(.*$)/gim, '<li class="list-disc ml-6 text-slate-700">$1</li>');
  // Numbered lists
  html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="list-decimal ml-6 text-slate-700">$1</li>');
  // Paragraphs
  html = html.split(/\n{2,}/).map(p => {
    if (p.trim().startsWith('<h') || p.trim().startsWith('<pre') || p.trim().startsWith('<blockquote') || p.trim().startsWith('<li')) {
      return p;
    }
    return `<p class="leading-relaxed text-slate-700 my-3">${p.replace(/\n/g, "<br />")}</p>`;
  }).join("\n");

  return html;
}
