import { useMemo, useState } from 'react';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  tech: string[];
  image: string;
  imageAlt?: string;
}

interface Props {
  projects: ProjectItem[];
}

export default function ProjectFilter({ projects }: Props) {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const allTech = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((project) => project.tech.forEach((item) => techSet.add(item)));
    return Array.from(techSet).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    if (!activeTech) return projects;
    return projects.filter((project) => project.tech.includes(activeTech));
  }, [projects, activeTech]);

  const filterBtn = (active: boolean) =>
    active
      ? 'rounded-md border border-cyan-400/40 bg-cyan-400/10 px-3 py-1.5 font-mono text-xs text-cyan-400'
      : 'rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 font-mono text-xs text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-200';

  return (
    <div>
      <p className="mb-4 font-mono text-xs text-zinc-500">filter_by(tech)</p>
      <div className="mb-10 flex flex-wrap gap-2">
        <button type="button" onClick={() => setActiveTech(null)} className={filterBtn(activeTech === null)}>
          All
        </button>
        {allTech.map((tech) => (
          <button
            key={tech}
            type="button"
            onClick={() => setActiveTech(tech)}
            className={filterBtn(activeTech === tech)}
          >
            {tech}
          </button>
        ))}
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {filtered.map((project) => (
          <article
            key={project.id}
            className="group flex flex-col overflow-hidden rounded-[10px] border border-zinc-700 bg-zinc-900 transition hover:-translate-y-1 hover:border-zinc-500 hover:shadow-[0_0_24px_-4px_rgb(34_211_238_/_0.15)]"
          >
            <a href={`/projects/${project.id}`} className="relative block overflow-hidden">
              <span className="absolute left-3 top-3 z-10 rounded border border-zinc-700 bg-zinc-950/80 px-2 py-0.5 font-mono text-[10px] text-cyan-400 backdrop-blur-sm">
                {project.tech[0]}
              </span>
              <img
                src={`/images/projects/${project.image}`}
                alt={project.imageAlt ?? `${project.title} project screenshot`}
                className="aspect-video w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                loading="lazy"
                decoding="async"
              />
            </a>
            <div className="flex flex-1 flex-col border-t border-zinc-700 p-6">
              <p className="font-mono text-xs text-cyan-400">{project.subtitle}</p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-50">
                <a href={`/projects/${project.id}`} className="transition hover:text-cyan-400">
                  {project.title}
                </a>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{project.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tech.slice(0, 4).map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 font-mono text-xs text-zinc-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <a
                href={`/projects/${project.id}`}
                className="mt-4 font-mono text-xs text-cyan-400 transition hover:text-cyan-300"
              >
                read_case_study() →
              </a>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center font-mono text-sm text-zinc-500">No projects match this filter.</p>
      )}
    </div>
  );
}
