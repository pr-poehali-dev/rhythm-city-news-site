import { useState } from "react";
import { Section, NAV_ITEMS, SECTION_TITLES } from "./newspaper/data";
import NewsHeader from "./newspaper/NewsHeader";
import NewsSections from "./newspaper/NewsSections";
import NewsSidebar from "./newspaper/NewsSidebar";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-newspaper-paper">

      <NewsHeader
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Section breadcrumb */}
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
                {SECTION_TITLES[activeSection]}
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
              <NewsSections activeSection={activeSection} setActiveSection={setActiveSection} />
            </div>
            <NewsSidebar setActiveSection={setActiveSection} />
          </div>
        ) : (
          <div>
            <h2 className="font-playfair text-3xl font-bold mb-6 pb-3 border-b-2 border-newspaper-ink">
              {SECTION_TITLES[activeSection]}
            </h2>
            <NewsSections activeSection={activeSection} setActiveSection={setActiveSection} />
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
