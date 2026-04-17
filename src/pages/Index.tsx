import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = 'home' | 'news' | 'society' | 'companies' | 'jobs' | 'lifehacks' | 'contacts';
type Category = 'all' | 'news' | 'society' | 'companies' | 'jobs' | 'lifehacks';

const HERO_IMAGE = "https://cdn.poehali.dev/projects/eecf8f30-cb2d-4782-a5a3-432d1b35f922/files/0866c5ed-bd3f-4fd5-a214-2a86b0335b85.jpg";

const NAV_ITEMS: { id: Section; label: string }[] = [
  { id: 'home', label: 'Главная' },
  { id: 'news', label: 'Новости' },
  { id: 'society', label: 'Общественная жизнь' },
  { id: 'companies', label: 'Новости компаний' },
  { id: 'jobs', label: 'Вакансии города' },
  { id: 'lifehacks', label: 'Лайфхаки и советы' },
  { id: 'contacts', label: 'Контакты редакции' },
];

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: Category;
  categoryLabel: string;
  date: string;
  author: string;
  featured?: boolean;
  image?: string;
}

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "Городской совет одобрил новый план развития инфраструктуры на 2026 год",
    excerpt: "На заседании городского совета был принят комплексный план развития городской инфраструктуры. Документ предусматривает ремонт дорог, обновление системы водоснабжения и строительство новых социальных объектов.",
    category: 'news',
    categoryLabel: 'Новости',
    date: '17 апреля 2026',
    author: 'Анна Соколова',
    featured: true,
    image: HERO_IMAGE,
  },
  {
    id: 2,
    title: "Городской фестиваль «Весна в парке» соберёт более десяти тысяч горожан",
    excerpt: "Организаторы анонсировали масштабную культурную программу с концертами, ярмарками и мастер-классами для всех возрастов.",
    category: 'society',
    categoryLabel: 'Общественная жизнь',
    date: '16 апреля 2026',
    author: 'Михаил Орлов',
  },
  {
    id: 3,
    title: "Местный завод открывает новый цех и создаёт 200 рабочих мест",
    excerpt: "Промышленное предприятие объявило о расширении производства и начале набора сотрудников различных специальностей.",
    category: 'companies',
    categoryLabel: 'Новости компаний',
    date: '15 апреля 2026',
    author: 'Виктор Петров',
  },
  {
    id: 4,
    title: "Срочно требуются медицинские работники в городскую поликлинику №3",
    excerpt: "Открыты вакансии терапевтов, педиатров и медицинских сестёр. Предоставляется служебное жильё и расширенный социальный пакет.",
    category: 'jobs',
    categoryLabel: 'Вакансии города',
    date: '14 апреля 2026',
    author: 'Редакция',
  },
  {
    id: 5,
    title: "Пять способов сократить коммунальные расходы без ущерба для комфорта",
    excerpt: "Практические советы от экспертов ЖКХ помогут горожанам оптимизировать потребление ресурсов и снизить ежемесячные платежи.",
    category: 'lifehacks',
    categoryLabel: 'Лайфхаки и советы',
    date: '13 апреля 2026',
    author: 'Елена Громова',
  },
  {
    id: 6,
    title: "Реконструкция центральной площади завершится к августу",
    excerpt: "Строительные работы идут по графику. Жители смогут увидеть обновлённую площадь с новым фонтаном и пешеходными зонами.",
    category: 'news',
    categoryLabel: 'Новости',
    date: '12 апреля 2026',
    author: 'Дмитрий Васильев',
  },
  {
    id: 7,
    title: "Ветераны труда получили почётные грамоты на торжественном собрании",
    excerpt: "В городском Доме культуры состоялась церемония награждения работников, отдавших производству более тридцати лет.",
    category: 'society',
    categoryLabel: 'Общественная жизнь',
    date: '11 апреля 2026',
    author: 'Наталья Иванова',
  },
  {
    id: 8,
    title: "ИТ-компания «ЦифраГрад» ищет программистов и дизайнеров",
    excerpt: "Молодая технологическая компания предлагает конкурентную зарплату, удалённый формат работы и возможность профессионального роста.",
    category: 'jobs',
    categoryLabel: 'Вакансии города',
    date: '10 апреля 2026',
    author: 'Редакция',
  },
  {
    id: 9,
    title: "Как правильно хранить продукты летом: советы диетолога",
    excerpt: "С наступлением тепла правила хранения продуктов меняются. Специалист рассказывает, что можно держать вне холодильника, а что нет.",
    category: 'lifehacks',
    categoryLabel: 'Лайфхаки и советы',
    date: '9 апреля 2026',
    author: 'Мария Степанова',
  },
];

const JOBS = [
  { title: "Терапевт", org: "Поликлиника №3", salary: "от 65 000 ₽", date: "14 апр" },
  { title: "Инженер-технолог", org: "Завод «Горизонт»", salary: "от 80 000 ₽", date: "13 апр" },
  { title: "Frontend-разработчик", org: "ЦифраГрад", salary: "от 120 000 ₽", date: "10 апр" },
  { title: "Учитель математики", org: "Школа №14", salary: "от 45 000 ₽", date: "9 апр" },
  { title: "Водитель автобуса", org: "ГорТранс", salary: "от 55 000 ₽", date: "8 апр" },
];

const MONTHS = ["Все", "Апрель 2026", "Март 2026", "Февраль 2026"];

function formatDate(dateStr: string) {
  return dateStr;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<Category>('all');
  const [filterMonth, setFilterMonth] = useState("Все");

  const featuredArticle = ARTICLES.find(a => a.featured);
  const secondaryArticles = ARTICLES.filter(a => !a.featured).slice(0, 2);

  const filteredArticles = ARTICLES.filter(a => {
    const catMatch = filterCategory === 'all' || a.category === filterCategory;
    const monthMatch = filterMonth === 'Все' || a.date.includes(filterMonth.split(' ')[0].toLowerCase().slice(0, 3));
    return catMatch && monthMatch;
  });

  const sectionArticles = (cat: Category) => ARTICLES.filter(a => a.category === cat);

  const renderArticleCard = (article: Article, large = false) => (
    <article key={article.id} className="article-card group cursor-pointer">
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

  const renderHomeSection = () => (
    <div className="animate-fade-in">
      {/* Featured article */}
      {featuredArticle && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3">
            {renderArticleCard(featuredArticle, true)}
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6">
            {secondaryArticles.map(a => renderArticleCard(a))}
          </div>
        </div>
      )}

      <div className="newspaper-rule-double mb-6" />

      {/* 3-column grid */}
      <h2 className="font-playfair text-2xl font-bold mb-4">Свежие материалы</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ARTICLES.filter(a => !a.featured).slice(2).map(a => renderArticleCard(a))}
      </div>
    </div>
  );

  const renderNewsSection = () => (
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
        {filteredArticles.map(a => renderArticleCard(a))}
      </div>
      {filteredArticles.length === 0 && (
        <div className="text-center py-16 text-newspaper-muted font-ibm">
          По выбранным фильтрам материалов не найдено
        </div>
      )}
    </div>
  );

  const renderSocietySection = () => (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sectionArticles('society').map(a => renderArticleCard(a))}
      </div>
    </div>
  );

  const renderCompaniesSection = () => (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sectionArticles('companies').map(a => renderArticleCard(a))}
      </div>
    </div>
  );

  const renderJobsSection = () => (
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
        <button className="px-6 py-2 bg-newspaper-ink text-newspaper-paper font-ibm text-sm font-medium uppercase tracking-wider hover:bg-newspaper-accent transition-colors">
          Связаться с редакцией
        </button>
      </div>
    </div>
  );

  const renderLifehacksSection = () => (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sectionArticles('lifehacks').map(a => renderArticleCard(a))}
      </div>
    </div>
  );

  const renderContactsSection = () => (
    <div className="animate-fade-in max-w-2xl">
      <div className="font-cormorant italic text-xl text-newspaper-muted mb-8">
        «Городской вестник» — независимое городское издание с 1998 года
      </div>
      <div className="space-y-6">
        {[
          { icon: "MapPin", label: "Адрес редакции", value: "ул. Советская, д. 14, офис 201" },
          { icon: "Phone", label: "Телефон", value: "+7 (800) 123-45-67" },
          { icon: "Mail", label: "Электронная почта", value: "redaction@gorodvest.ru" },
          { icon: "Clock", label: "Часы работы", value: "Пн–Пт, 9:00–18:00" },
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

  const sectionTitles: Record<Section, string> = {
    home: '',
    news: 'Новости',
    society: 'Общественная жизнь',
    companies: 'Новости компаний',
    jobs: 'Вакансии города',
    lifehacks: 'Лайфхаки и советы',
    contacts: 'Контакты редакции',
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home': return renderHomeSection();
      case 'news': return renderNewsSection();
      case 'society': return renderSocietySection();
      case 'companies': return renderCompaniesSection();
      case 'jobs': return renderJobsSection();
      case 'lifehacks': return renderLifehacksSection();
      case 'contacts': return renderContactsSection();
    }
  };

  return (
    <div className="min-h-screen bg-newspaper-paper">

      {/* Top bar */}
      <div className="bg-newspaper-ink text-newspaper-paper">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex justify-between items-center">
          <div className="font-ibm text-xs text-newspaper-paper/60">
            {new Date().toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="font-ibm text-xs text-newspaper-paper/60 hidden md:block">
            Городское независимое издание
          </div>
        </div>
      </div>

      {/* Masthead */}
      <header className="border-b-2 border-newspaper-ink">
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-4 mb-1">
              <div className="flex-1 newspaper-rule" />
              <h1
                className="font-playfair font-black text-5xl md:text-7xl tracking-tight cursor-pointer text-newspaper-ink"
                style={{ letterSpacing: '-0.02em' }}
                onClick={() => setActiveSection('home')}
              >
                Городской вестник
              </h1>
              <div className="flex-1 newspaper-rule" />
            </div>
            <p className="font-cormorant italic text-base text-newspaper-muted tracking-wide">
              Правда. Честность. Профессионализм.
            </p>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex justify-center">
            <div className="flex border-t border-b border-newspaper-ink divide-x divide-newspaper-border">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`px-4 py-2 font-ibm text-xs uppercase tracking-widest transition-all ${
                    activeSection === item.id
                      ? 'bg-newspaper-ink text-newspaper-paper'
                      : 'text-newspaper-ink hover:bg-newspaper-ink/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Mobile nav toggle */}
          <div className="md:hidden flex justify-center mt-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-2 font-ibm text-xs uppercase tracking-widest border border-newspaper-ink px-4 py-2"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={14} />
              Разделы
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 border border-newspaper-ink divide-y divide-newspaper-border animate-fade-in">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                  className={`w-full text-left px-4 py-3 font-ibm text-sm transition-all ${
                    activeSection === item.id
                      ? 'bg-newspaper-ink text-newspaper-paper'
                      : 'text-newspaper-ink hover:bg-newspaper-ink/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Section title */}
      {activeSection !== 'home' && (
        <div className="bg-newspaper-cream/50 border-b border-newspaper-border">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveSection('home')}
                className="font-ibm text-xs text-newspaper-muted hover:text-newspaper-accent transition-colors flex items-center gap-1"
              >
                <Icon name="ChevronLeft" size={12} />
                Главная
              </button>
              <span className="text-newspaper-border">›</span>
              <span className="font-ibm text-xs uppercase tracking-wider text-newspaper-ink">
                {sectionTitles[activeSection]}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeSection === 'home' ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {renderContent()}
            </div>
            {/* Sidebar */}
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
          </div>
        ) : (
          <div>
            <h2 className="font-playfair text-3xl font-bold mb-6 pb-3 border-b-2 border-newspaper-ink">
              {sectionTitles[activeSection]}
            </h2>
            {renderContent()}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t-2 border-newspaper-ink bg-newspaper-ink text-newspaper-paper">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-playfair text-2xl font-black mb-2">Городской вестник</h3>
              <p className="font-ibm text-xs text-newspaper-paper/60 leading-relaxed">
                Независимое городское издание. Освещаем жизнь города с 1998 года.
              </p>
            </div>
            <div>
              <h4 className="font-ibm text-xs uppercase tracking-widest text-newspaper-paper/50 mb-3">Разделы</h4>
              <div className="grid grid-cols-2 gap-1">
                {NAV_ITEMS.filter(n => n.id !== 'home').map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className="font-ibm text-xs text-newspaper-paper/70 hover:text-newspaper-paper text-left transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-ibm text-xs uppercase tracking-widest text-newspaper-paper/50 mb-3">Контакты</h4>
              <div className="font-ibm text-xs text-newspaper-paper/70 space-y-1">
                <div>redaction@gorodvest.ru</div>
                <div>+7 (800) 123-45-67</div>
                <div>ул. Советская, д. 14</div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-newspaper-paper/20 font-ibm text-xs text-newspaper-paper/40 text-center">
            © 2026 Городской вестник. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;