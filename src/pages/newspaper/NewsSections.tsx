import { useState } from "react";
import Icon from "@/components/ui/icon";
import { ARTICLES, JOBS, MONTHS, Article, Category, Section } from "./data";

interface ArticleCardProps {
  article: Article;
  large?: boolean;
}

export const ArticleCard = ({ article, large = false }: ArticleCardProps) => (
  <article className="article-card group cursor-pointer">
    {article.image && (
      <div className="overflow-hidden mb-3">
        <img
          src={article.image}
          alt={article.title}
          className={`w-full object-cover grayscale hover:grayscale-0 transition-all duration-500 ${large ? 'h-64' : 'h-40'}`}
        />
      </div>
    )}
    <div className="category-badge mb-2 inline-block">{article.categoryLabel}</div>
    <h3 className={`font-playfair font-bold leading-tight mb-2 article-title group-hover:text-newspaper-accent transition-colors ${large ? 'text-2xl' : 'text-lg'}`}>
      {article.title}
    </h3>
    <p className="font-ibm text-sm text-newspaper-muted leading-relaxed mb-3 line-clamp-3">
      {article.excerpt}
    </p>
    <div className="flex items-center gap-3 text-xs text-newspaper-muted font-ibm">
      <span>{article.date}</span>
      <span className="newspaper-rule-thin border-l h-3 border-newspaper-border inline-block" />
      <span>{article.author}</span>
    </div>
  </article>
);

export const HomeSection = () => {
  const featuredArticle = ARTICLES.find(a => a.featured);
  const secondaryArticles = ARTICLES.filter(a => !a.featured).slice(0, 2);

  return (
    <div className="animate-fade-in">
      {featuredArticle && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3">
            {featuredArticle.body ? (
              <article className="article-card group cursor-pointer">
                {featuredArticle.image && (
                  <div className="overflow-hidden mb-3">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full object-cover h-64 grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                )}
                <div className="category-badge mb-2 inline-block">{featuredArticle.categoryLabel}</div>
                <h3 className="font-playfair font-bold leading-tight mb-3 text-2xl article-title">
                  {featuredArticle.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-newspaper-muted font-ibm mb-4">
                  <span>{featuredArticle.date}</span>
                  <span className="newspaper-rule-thin border-l h-3 border-newspaper-border inline-block" />
                  <span>{featuredArticle.author}</span>
                </div>
                <div className="column-text font-ibm text-sm text-newspaper-ink leading-relaxed">
                  {featuredArticle.body.split('\n\n').map((para, i) => (
                    <p key={i} className={`mb-3 ${i === 0 ? 'drop-cap' : ''}`}>{para}</p>
                  ))}
                </div>
              </article>
            ) : (
              <ArticleCard article={featuredArticle} large />
            )}
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6">
            {secondaryArticles.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        </div>
      )}
      <div className="newspaper-rule-double mb-6" />
      <h2 className="font-playfair text-2xl font-bold mb-4">Свежие материалы</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARTICLES.filter(a => !a.featured).slice(2).map(a => <ArticleCard key={a.id} article={a} />)}
      </div>
    </div>
  );
};

export const NewsSection = () => {
  const [filterCategory, setFilterCategory] = useState<Category>('all');
  const [filterMonth, setFilterMonth] = useState("Все");

  const filteredArticles = ARTICLES.filter(a => {
    const catMatch = filterCategory === 'all' || a.category === filterCategory;
    const monthMatch = filterMonth === 'Все' || a.date.includes(filterMonth.split(' ')[0].toLowerCase().slice(0, 3));
    return catMatch && monthMatch;
  });

  return (
    <div className="animate-fade-in">
      <div className="flex flex-wrap gap-2 mb-6 items-center">
        <span className="font-ibm text-sm text-newspaper-muted mr-2">Раздел:</span>
        {([
          { id: 'all', label: 'Все' },
          { id: 'news', label: 'Новости' },
          { id: 'society', label: 'Общественная жизнь' },
          { id: 'companies', label: 'Компании' },
          { id: 'lifehacks', label: 'Лайфхаки' },
        ] as { id: Category; label: string }[]).map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-3 py-1 text-xs font-ibm font-medium uppercase tracking-wider border transition-all ${
              filterCategory === cat.id
                ? 'bg-newspaper-ink text-newspaper-paper border-newspaper-ink'
                : 'bg-transparent text-newspaper-ink border-newspaper-border hover:border-newspaper-ink'
            }`}
          >
            {cat.label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <Icon name="Calendar" size={14} className="text-newspaper-muted" />
          <select
            value={filterMonth}
            onChange={e => setFilterMonth(e.target.value)}
            className="text-xs font-ibm bg-transparent border border-newspaper-border px-2 py-1 text-newspaper-ink focus:outline-none focus:border-newspaper-ink"
          >
            {MONTHS.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(a => <ArticleCard key={a.id} article={a} />)}
      </div>
      {filteredArticles.length === 0 && (
        <div className="text-center py-16 text-newspaper-muted font-ibm">
          По выбранным фильтрам материалов не найдено
        </div>
      )}
    </div>
  );
};

export const SimpleArticleSection = ({ category }: { category: Category }) => {
  const articles = ARTICLES.filter(a => a.category === category);
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map(a => <ArticleCard key={a.id} article={a} />)}
      </div>
    </div>
  );
};

export const JobsSection = ({ onContactClick }: { onContactClick: () => void }) => (
  <div className="animate-fade-in">
    <p className="font-cormorant italic text-lg text-newspaper-muted mb-6">
      Актуальные вакансии от работодателей города — обновляется ежедневно
    </p>
    <div className="space-y-0">
      {JOBS.map((job, i) => (
        <div
          key={i}
          className="group grid grid-cols-12 gap-4 py-4 border-b border-newspaper-border hover:bg-newspaper-cream/50 transition-colors cursor-pointer px-2"
        >
          <div className="col-span-12 md:col-span-5">
            <h3 className="font-playfair font-semibold text-lg group-hover:text-newspaper-accent transition-colors">{job.title}</h3>
            <p className="font-ibm text-sm text-newspaper-muted mt-0.5">{job.org}</p>
          </div>
          <div className="col-span-6 md:col-span-4 flex items-center">
            <span className="font-ibm font-medium text-newspaper-ink">{job.salary}</span>
          </div>
          <div className="col-span-6 md:col-span-3 flex items-center justify-end">
            <span className="font-ibm text-xs text-newspaper-muted">{job.date}</span>
            <Icon name="ChevronRight" size={16} className="ml-2 text-newspaper-muted group-hover:text-newspaper-accent transition-colors" />
          </div>
        </div>
      ))}
    </div>
    <div className="mt-8 p-6 border border-newspaper-border bg-newspaper-cream/30">
      <h3 className="font-playfair text-xl font-bold mb-2">Разместить вакансию</h3>
      <p className="font-ibm text-sm text-newspaper-muted mb-4">Охватите тысячи потенциальных соискателей города. Свяжитесь с редакцией для размещения объявления.</p>
      <button
        onClick={onContactClick}
        className="px-6 py-2 bg-newspaper-ink text-newspaper-paper font-ibm text-sm font-medium uppercase tracking-wider hover:bg-newspaper-accent transition-colors"
      >
        Связаться с редакцией
      </button>
    </div>
  </div>
);

export const ContactsSection = () => (
  <div className="animate-fade-in max-w-2xl">
    <div className="font-cormorant italic text-xl text-newspaper-muted mb-8">
      «Городской вестник» — независимое городское издание с 1998 года
    </div>
    <div className="space-y-6">
      {[
        { icon: "MapPin" as const, label: "Адрес редакции", value: "ул. Советская, д. 14, офис 201" },
        { icon: "Phone" as const, label: "Телефон", value: "+7 (800) 123-45-67" },
        { icon: "Mail" as const, label: "Электронная почта", value: "redaction@gorodvest.ru" },
        { icon: "Clock" as const, label: "Часы работы", value: "Пн–Пт, 9:00–18:00" },
      ].map(item => (
        <div key={item.label} className="flex items-start gap-4 pb-5 border-b border-newspaper-border">
          <Icon name={item.icon} size={18} className="text-newspaper-accent mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-ibm text-xs uppercase tracking-widest text-newspaper-muted mb-1">{item.label}</div>
            <div className="font-playfair text-lg font-medium">{item.value}</div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-8">
      <h3 className="font-playfair text-xl font-bold mb-4">Написать в редакцию</h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Ваше имя"
          className="w-full border border-newspaper-border bg-transparent px-4 py-2.5 font-ibm text-sm focus:outline-none focus:border-newspaper-ink placeholder:text-newspaper-muted/60"
        />
        <input
          type="email"
          placeholder="Электронная почта"
          className="w-full border border-newspaper-border bg-transparent px-4 py-2.5 font-ibm text-sm focus:outline-none focus:border-newspaper-ink placeholder:text-newspaper-muted/60"
        />
        <textarea
          rows={5}
          placeholder="Ваше сообщение..."
          className="w-full border border-newspaper-border bg-transparent px-4 py-2.5 font-ibm text-sm focus:outline-none focus:border-newspaper-ink placeholder:text-newspaper-muted/60 resize-none"
        />
        <button className="px-8 py-2.5 bg-newspaper-ink text-newspaper-paper font-ibm text-sm font-medium uppercase tracking-wider hover:bg-newspaper-accent transition-colors">
          Отправить
        </button>
      </div>
    </div>
  </div>
);

interface NewsSectionsProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const NewsSections = ({ activeSection, setActiveSection }: NewsSectionsProps) => {
  switch (activeSection) {
    case 'home': return <HomeSection />;
    case 'news': return <NewsSection />;
    case 'society': return <SimpleArticleSection category="society" />;
    case 'companies': return <SimpleArticleSection category="companies" />;
    case 'jobs': return <JobsSection onContactClick={() => setActiveSection('contacts')} />;
    case 'lifehacks': return <SimpleArticleSection category="lifehacks" />;
    case 'contacts': return <ContactsSection />;
  }
};

export default NewsSections;