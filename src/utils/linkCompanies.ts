import companies from '../data/companies.json';

const linkClass = 'text-accent transition hover:text-cyan-300';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function linkCompanies(text: string): string {
  const entries = Object.entries(companies).sort((a, b) => b[0].length - a[0].length);

  let result = text;
  for (const [name, url] of entries) {
    const regex = new RegExp(`(?<![\\w/"'=])${escapeRegex(name)}(?![\\w])`, 'g');
    result = result.replace(
      regex,
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="${linkClass}">${name}</a>`,
    );
  }
  return result;
}

export function getCompanyUrl(name: string): string | undefined {
  return companies[name as keyof typeof companies];
}
