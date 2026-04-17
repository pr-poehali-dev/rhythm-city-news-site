import Icon from "@/components/ui/icon";
import { JOBS, NAV_ITEMS, Section } from "./data";

interface NewsSidebarProps {
  setActiveSection: (section: Section) => void;
}

const NewsSidebar = ({ setActiveSection }: NewsSidebarProps) => (
  <aside className="lg:col-span-1 space-y-6">
    <div>
      <div className="newspaper-rule-double mb-3" />
      <h3 className="font-playfair text-lg font-bold mb-4">Последние вакансии</h3>
      <div className="space-y-3">
        {JOBS.slice(0, 4).map((job, i) => (
          <div key={i} className="pb-3 border-b border-newspaper-border last:border-0">
            <div className="font-ibm text-sm font-medium leading-snug">{job.title}</div>
            <div className="font-ibm text-xs text-newspaper-muted mt-0.5">{job.org}</div>
            <div className="font-ibm text-xs text-newspaper-accent mt-0.5">{job.salary}</div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setActiveSection('jobs')}
        className="mt-3 font-ibm text-xs uppercase tracking-wider text-newspaper-accent hover:underline flex items-center gap-1"
      >
        Все вакансии <Icon name="ArrowRight" size={11} />
      </button>
    </div>

    <div>
      <div className="newspaper-rule-double mb-3" />
      <h3 className="font-playfair text-lg font-bold mb-4">Разделы</h3>
      <div className="space-y-1">
        {NAV_ITEMS.filter(n => n.id !== 'home').map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className="w-full text-left font-ibm text-sm py-2 border-b border-newspaper-border/50 hover:text-newspaper-accent flex items-center justify-between group transition-colors"
          >
            {item.label}
            <Icon name="ChevronRight" size={12} className="text-newspaper-border group-hover:text-newspaper-accent transition-colors" />
          </button>
        ))}
      </div>
    </div>

    <div className="border border-newspaper-border p-4 bg-newspaper-cream/30">
      <div className="font-ibm text-xs uppercase tracking-widest text-newspaper-muted mb-2">Реклама</div>
      <div className="font-playfair text-base font-bold leading-tight">Разместите рекламу в нашем издании</div>
      <p className="font-ibm text-xs text-newspaper-muted mt-2 leading-relaxed">
        Охват 50 000+ читателей. Свяжитесь с отделом рекламы.
      </p>
      <button
        onClick={() => setActiveSection('contacts')}
        className="mt-3 font-ibm text-xs uppercase tracking-wider border border-newspaper-ink px-3 py-1.5 hover:bg-newspaper-ink hover:text-newspaper-paper transition-all"
      >
        Подробнее
      </button>
    </div>
  </aside>
);

export default NewsSidebar;
