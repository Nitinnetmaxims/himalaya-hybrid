/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Leaf, 
  Search, 
  MapPin, 
  ChevronRight, 
  FlaskConical, 
  Users, 
  Globe, 
  Calendar, 
  ArrowRight,
  Menu,
  X,
  Star,
  CheckCircle2
} from "lucide-react";

// --- Components ---

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm py-3" : "bg-transparent py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Leaf className={`w-8 h-8 ${isScrolled ? "text-primary" : "text-white"}`} />
          <span className={`text-2xl font-display font-bold tracking-[1px] uppercase ${isScrolled ? "text-primary" : "text-white"}`}>Himalaya Hybrid</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {["About Us", "Products", "R&D", "Farmer Corner", "Global Reach"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(" ", "-")}`} 
              className={`text-sm font-bold uppercase tracking-[1px] transition-colors hover:text-secondary ${isScrolled ? "text-text-main" : "text-white"}`}
            >
              {item}
            </a>
          ))}
          <button className="bg-primary text-white px-6 py-2.5 rounded-[4px] text-sm font-bold uppercase tracking-[1px] flex items-center gap-2 hover:bg-primary-dark transition-all">
            <MapPin className="w-4 h-4" />
            Locate Distributor
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className={isScrolled ? "text-primary" : "text-white"} /> : <Menu className={isScrolled ? "text-primary" : "text-white"} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {["About Us", "Products", "R&D", "Farmer Corner", "Global Reach"].map((item) => (
                <a key={item} href="#" className="text-text-main font-bold uppercase tracking-[1px]">{item}</a>
              ))}
              <button className="bg-primary text-white px-6 py-3 rounded-[4px] font-bold uppercase tracking-[1px] flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                Locate Distributor
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Counter = ({ value, label, suffix = "" }: { value: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
        {count}{suffix}
      </div>
      <div className="text-xs uppercase tracking-[1px] text-text-muted font-bold">{label}</div>
    </div>
  );
};

const ProductCard = ({ title, description, image, category }: { title: string; description: string; image: string; category: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group relative bg-card-bg rounded-[8px] overflow-hidden p-[20px] transition-all duration-500"
  >
    <div className="aspect-[4/5] overflow-hidden rounded-[8px] mb-6">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="text-text-main">
      <span className="text-xs font-bold uppercase tracking-[1px] text-secondary mb-2 block">{category}</span>
      <h3 className="text-xl font-display font-bold mb-3 uppercase tracking-[1px]">{title}</h3>
      <p className="text-sm text-text-muted mb-6">
        {description}
      </p>
      <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-[1px] text-primary group/btn">
        Explore Range <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
      </button>
    </div>
  </motion.div>
);

const SeedSelector = () => {
  const [season, setSeason] = useState("");
  const [crop, setCrop] = useState("");
  const [region, setRegion] = useState("");

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-card-bg rounded-[8px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
          <div className="flex-1 relative z-10 text-text-main">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight uppercase tracking-[1px]">Find Your Perfect <br />Hybrid Match</h2>
            <p className="text-text-muted max-w-md mb-8">
              Our intelligent seed selector helps you choose the right hybrid based on your specific climate and soil conditions.
            </p>
            <div className="flex flex-col gap-3 text-sm font-bold uppercase tracking-[1px]">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> High Yield</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary" /> Pest Resistant</div>
            </div>
          </div>

          <div className="w-full md:w-[450px] bg-white rounded-[8px] p-8 shadow-sm relative z-10">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[1px] text-text-muted mb-2">Select Season</label>
                <select 
                  value={season} 
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full bg-bg-light border border-gray-100 rounded-[4px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Choose Season...</option>
                  <option value="kharif">Kharif (Monsoon)</option>
                  <option value="rabi">Rabi (Winter)</option>
                  <option value="zaid">Zaid (Summer)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[1px] text-text-muted mb-2">Crop Category</label>
                <select 
                  value={crop} 
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full bg-bg-light border border-gray-100 rounded-[4px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Choose Crop...</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="cereals">Cereals</option>
                  <option value="cotton">Cotton</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[1px] text-text-muted mb-2">Your Region</label>
                <select 
                  value={region} 
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-bg-light border border-gray-100 rounded-[4px] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Choose Region...</option>
                  <option value="north">North India</option>
                  <option value="south">South India</option>
                  <option value="west">West India</option>
                  <option value="east">East India</option>
                </select>
              </div>
              <button className="w-full bg-primary text-white font-bold uppercase tracking-[1px] py-4 rounded-[4px] hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                View Recommended Seeds <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://picsum.photos/seed/agriculture/1920/1080" 
            alt="Lush green field" 
            className="w-full h-[120%] object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="absolute inset-0 hero-overlay z-[1]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-accent text-primary-dark px-4 py-1.5 rounded-[4px] text-xs font-bold uppercase tracking-[1px] mb-6">
              Pioneering Agricultural Excellence
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[1.1] uppercase tracking-[1px]">
              Nurturing the <br />
              <span className="text-secondary">Future</span> of Farming
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-10 leading-relaxed font-sans">
              Himalaya Hybrid Seeds combines traditional wisdom with cutting-edge biotechnology to deliver high-yield, resilient seeds for the modern farmer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary text-white px-10 py-4 rounded-[4px] font-bold uppercase tracking-[1px] text-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-2 group">
                View Our Hybrid Range <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-[#E9ECEF] text-[#495057] px-10 py-4 rounded-[4px] font-bold uppercase tracking-[1px] text-sm hover:bg-gray-200 transition-all">
                Download Sowing Guide
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          <Counter value={35} label="Years of Excellence" suffix="+" />
          <Counter value={10} label="Million Farmers" suffix="M" />
          <Counter value={500} label="Acres Covered" suffix="K+" />
          <Counter value={120} label="Hybrid Varieties" />
        </div>
      </section>

      {/* Product Categories */}
      <section id="products" className="py-32 bg-bg-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[1px] text-primary mb-4 block">Our Portfolio</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight uppercase tracking-[1px]">Engineered for Superior <br />Harvests</h2>
            </div>
            <p className="text-text-muted max-w-sm mb-2">
              Explore our diverse range of hybrid seeds, meticulously developed to thrive in varied agro-climatic zones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ProductCard 
              category="Vegetables"
              title="Gourmet Greens"
              description="High-yield, disease-resistant varieties for premium vegetable production."
              image="https://picsum.photos/seed/veggies/600/800"
            />
            <ProductCard 
              category="Cereals"
              title="Golden Grains"
              description="Robust hybrids of wheat and maize designed for maximum nutritional value."
              image="https://picsum.photos/seed/grains/600/800"
            />
            <ProductCard 
              category="Oilseeds"
              title="Pure Oilseeds"
              description="High oil content varieties that ensure profitability for commercial growers."
              image="https://picsum.photos/seed/oil/600/800"
            />
            <ProductCard 
              category="Cotton"
              title="White Gold"
              description="Long-staple cotton hybrids with exceptional pest resistance."
              image="https://picsum.photos/seed/cotton/600/800"
            />
          </div>
        </div>
      </section>

      {/* Seed Selector Tool */}
      <SeedSelector />

      {/* Innovation / R&D Section */}
      <section id="r&d" className="py-32 bg-primary text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative z-10 rounded-[8px] overflow-hidden aspect-square"
            >
              <img 
                src="https://picsum.photos/seed/lab/800/800" 
                alt="R&D Lab" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 bg-accent p-10 rounded-[8px] text-primary-dark z-20 hidden md:block">
              <FlaskConical className="w-12 h-12 mb-4" />
              <div className="text-3xl font-display font-bold">15+</div>
              <div className="text-xs font-bold uppercase tracking-[1px] opacity-70">Research Stations</div>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-[1px] text-secondary mb-6 block">Innovation Hub</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight uppercase tracking-[1px]">Where Science Meets <br />Sustainability</h2>
            <p className="text-white/80 text-lg mb-10 leading-relaxed font-sans">
              Our state-of-the-art Research & Development facilities are the heartbeat of Himalaya Hybrid. We invest heavily in molecular breeding and germplasm collection to ensure our seeds are ready for the challenges of climate change.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <FlaskConical className="w-6 h-6" />, title: "Molecular Breeding", desc: "Precision engineering for specific trait enhancement." },
                { icon: <Globe className="w-6 h-6" />, title: "Global Germplasm", desc: "Access to world-class genetic diversity." },
                { icon: <Users className="w-6 h-6" />, title: "Expert Agronomists", desc: "A team of 200+ scientists dedicated to your success." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="bg-white/10 p-3 rounded-[8px] text-secondary">{item.icon}</div>
                  <div>
                    <h4 className="text-lg font-display font-bold mb-1 uppercase tracking-[1px]">{item.title}</h4>
                    <p className="text-sm text-white/60 font-sans">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="farmer-corner" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-xs font-bold uppercase tracking-[1px] text-primary mb-4 block">Farmer Success Stories</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 uppercase tracking-[1px]">Voices from the Field</h2>
            <p className="text-text-muted font-sans">
              Thousands of farmers across the globe trust Himalaya Hybrid for their livelihoods. Here are some of their stories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rajesh Kumar", location: "Punjab, India", quote: "The yield from Himalaya's maize hybrid was 30% higher than what I've seen in the last decade. Truly remarkable stability.", crop: "Maize" },
              { name: "Sarah Jenkins", location: "Iowa, USA", quote: "Resilience is key for us. These seeds handled the drought conditions far better than any other variety we tested.", crop: "Soybean" },
              { name: "Ahmed Hassan", location: "Giza, Egypt", quote: "The quality of the vegetables is superior. My buyers specifically ask for the produce grown from Himalaya seeds.", crop: "Tomato" }
            ].map((t, i) => (
              <div key={i} className="bg-card-bg p-[20px] rounded-[8px] border-none relative group hover:bg-white hover:shadow-sm transition-all duration-500">
                <div className="flex gap-1 text-accent mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-md italic text-text-main mb-8 leading-relaxed font-sans">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-text-main uppercase tracking-[1px] text-sm">{t.name}</div>
                    <div className="text-xs text-text-muted font-sans">{t.location} • <span className="text-primary font-bold">{t.crop}</span></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section id="global-reach" className="py-32 bg-bg-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1">
            <span className="text-xs font-bold uppercase tracking-[1px] text-primary mb-6 block">Global Presence</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 leading-tight uppercase tracking-[1px]">Feeding the World, <br />One Seed at a Time</h2>
            <p className="text-text-muted text-lg mb-10 font-sans">
              With a distribution network spanning 40+ countries and 5 continents, Himalaya Hybrid is a truly global partner in agriculture.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-3xl font-display font-bold text-primary mb-1">40+</div>
                <div className="text-xs font-bold uppercase tracking-[1px] text-text-muted">Countries Served</div>
              </div>
              <div>
                <div className="text-3xl font-display font-bold text-primary mb-1">5000+</div>
                <div className="text-xs font-bold uppercase tracking-[1px] text-text-muted">Distributors</div>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white p-4 rounded-[8px] shadow-sm"
            >
              <img 
                src="https://picsum.photos/seed/map/800/600" 
                alt="Global Map" 
                className="w-full h-auto rounded-[8px]"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-dark text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <Leaf className="w-8 h-8 text-secondary" />
                <span className="text-2xl font-display font-bold tracking-[1px] uppercase">Himalaya Hybrid</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-8 font-sans">
                Empowering farmers with high-performance hybrid seeds for a sustainable and prosperous future.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary-dark transition-all cursor-pointer">
                    <Globe className="w-4 h-4" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-display font-bold mb-8 uppercase tracking-[1px]">Quick Links</h4>
              <ul className="space-y-4 text-sm text-white/60 font-sans">
                <li><a href="#" className="hover:text-secondary transition-colors">Our Legacy</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Research Stations</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Product Catalog</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Farmer Resources</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Career Opportunities</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-display font-bold mb-8 uppercase tracking-[1px]">Contact Us</h4>
              <ul className="space-y-6 text-sm text-white/60 font-sans">
                <li className="flex gap-4">
                  <MapPin className="w-5 h-5 text-secondary shrink-0" />
                  <span>123 Agri-Tech Park, Sector 45, <br />Gurgaon, Haryana, India</span>
                </li>
                <li className="flex gap-4">
                  <Globe className="w-5 h-5 text-secondary shrink-0" />
                  <span>info@himalayahybrid.com <br />+91 124 456 7890</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-display font-bold mb-8 uppercase tracking-[1px]">Newsletter</h4>
              <p className="text-sm text-white/60 mb-6 font-sans">Get the latest agricultural insights and product updates.</p>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-[4px] px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 font-sans"
                />
                <button className="absolute right-2 top-2 bottom-2 bg-secondary text-primary-dark px-4 rounded-[4px] font-bold text-xs uppercase tracking-[1px]">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/40 font-bold uppercase tracking-[1px]">
            <div>© 2026 Himalaya Hybrid Seeds. All rights reserved.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
