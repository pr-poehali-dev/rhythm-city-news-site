import Icon from "@/components/ui/icon";
import { NAV_ITEMS, NEWSPAPER_NAME, NEWSPAPER_SLOGAN, Section } from "./data";

interface NewsHeaderProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const NewsHeader = ({ activeSection, setActiveSection, mobileMenuOpen, setMobileMenuOpen }: NewsHeaderProps) => {
  return (
    <>
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
                {NEWSPAPER_NAME}
              </h1>
              <div className="flex-1 newspaper-rule" />
            </div>
            <p className="font-cormorant italic text-base text-newspaper-muted tracking-wide">
              {NEWSPAPER_SLOGAN}
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
    </>
  );
};

export default NewsHeader;