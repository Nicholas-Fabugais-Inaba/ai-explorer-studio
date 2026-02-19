import { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { learningModules, moduleConceptsMap } from "@/data/learningData";

interface SearchResult {
  type: "module" | "concept" | "code";
  moduleId: string;
  moduleTitle: string;
  conceptId?: string;
  title: string;
  snippet: string;
}

interface SearchDialogProps {
  onSelectModule: (moduleId: string) => void;
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  for (const mod of learningModules) {
    results.push({
      type: "module",
      moduleId: mod.id,
      moduleTitle: mod.title,
      title: mod.title,
      snippet: mod.description,
    });

    const concepts = moduleConceptsMap[mod.id] || [];
    for (const concept of concepts) {
      results.push({
        type: "concept",
        moduleId: mod.id,
        moduleTitle: mod.title,
        conceptId: concept.id,
        title: concept.title,
        snippet: concept.content.slice(0, 120) + "…",
      });

      if (concept.codeExample) {
        results.push({
          type: "code",
          moduleId: mod.id,
          moduleTitle: mod.title,
          conceptId: concept.id,
          title: `Code: ${concept.title}`,
          snippet: concept.codeExample.slice(0, 120) + "…",
        });
      }
    }
  }

  return results;
}

export const SearchDialog = ({ onSelectModule }: SearchDialogProps) => {
  const [open, setOpen] = useState(false);
  const index = useMemo(() => buildIndex(), []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (result: SearchResult) => {
    setOpen(false);
    onSelectModule(result.moduleId);
  };

  const typeLabel = (type: SearchResult["type"]) => {
    switch (type) {
      case "module": return "Module";
      case "concept": return "Concept";
      case "code": return "Code Example";
    }
  };

  const grouped = useMemo(() => {
    const map = new Map<string, SearchResult[]>();
    for (const r of index) {
      const key = r.moduleTitle;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(r);
    }
    return map;
  }, [index]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground text-sm transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search…</span>
        <kbd className="hidden md:inline-flex h-5 items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search modules, concepts, code…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {Array.from(grouped.entries()).map(([groupName, items]) => (
            <CommandGroup key={groupName} heading={groupName}>
              {items.map((result, i) => (
                <CommandItem
                  key={`${result.moduleId}-${result.conceptId ?? ""}-${result.type}-${i}`}
                  onSelect={() => handleSelect(result)}
                  className="flex flex-col items-start gap-1 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      {typeLabel(result.type)}
                    </span>
                    <span className="font-medium text-sm">{result.title}</span>
                  </div>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {result.snippet}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};
