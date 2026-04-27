"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Share2, 
  ExternalLink,
  ChevronDown,
  BookOpen
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { NewsArticle } from "@/types";
import { useReaderStore } from "@/lib/readerStore";
import ReaderMode from "@/components/ReaderMode";

export default function BriefsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const { isOpen, url, openReader, closeReader } = useReaderStore();

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch("/api/news?source=NewsBytes");
        const data = await response.json();
        
        const SPORTS_KEYWORDS = ["cricket", "t20", "runs", "wicket", "ipl", "football", "goal", "match", "score", "tennis", "olympics"];
        
        const filteredData = (data as NewsArticle[]).filter(article => {
          const content = `${article.title} ${article.category}`.toLowerCase();
          return !SPORTS_KEYWORDS.some(keyword => content.includes(keyword));
        });

        setArticles(filteredData);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();

    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const getBestVoice = () => {
    // Priority list for natural-sounding voices
    const priorities = ["Google US English", "Google UK English Female", "Samantha", "Victoria", "Microsoft Aria"];
    for (const name of priorities) {
      const voice = voices.find(v => v.name.includes(name));
      if (voice) return voice;
    }
    return voices.find(v => v.lang.startsWith("en")) || voices[0];
  };

  const toggleSpeaking = (article: NewsArticle) => {
    // 1. If we are clicking the SAME article that is already speaking, stop it.
    if (isSpeaking && currentlySpeakingId === article.id) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentlySpeakingId(null);
      return;
    }

    // 2. If something else is speaking (or we just want to start a new one), clear it first.
    window.speechSynthesis.cancel();
    
    const text = `${article.title}. ${article.summary}`;
    const utterance = new SpeechSynthesisUtterance(text);
    
    const bestVoice = getBestVoice();
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
    
    utterance.rate = 0.95;
    utterance.pitch = 1;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      setCurrentlySpeakingId(article.id);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentlySpeakingId(null);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setCurrentlySpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-950 gap-4">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent animate-pulse">
          Loading Intelligence...
        </p>
      </div>
    );
  }

  return (
    <main className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar">
      {/* Header Overlay */}
      <div className="fixed top-0 left-0 w-full z-50 p-6 flex items-center justify-between pointer-events-none">
        <Link 
          href="/" 
          className="p-3 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 text-white pointer-events-auto hover:bg-black/60 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Logo in the Pill Position */}
        <Link 
          href="/" 
          className="px-6 py-2 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 pointer-events-auto hover:bg-black/60 transition-all group select-none flex items-center gap-1 scale-75 md:scale-100"
        >
          <div className="flex items-baseline">
            <span className="font-sans font-black text-xl tracking-tighter text-white">
              Fin
            </span>
            <span className="text-[#3dd68c] font-black text-xl drop-shadow-sm font-hindi">
              कर
            </span>
            <span className="ml-1 text-[8px] font-black tracking-[0.3em] text-white/60 transition-colors group-hover:text-accent">
              NEWS
            </span>
          </div>
        </Link>
      </div>

      {articles.map((article, index) => {
        const matteColors = [
          "#3b4a3f", // Deep Sage
          "#3e4a59", // Dusty Blue
          "#4a3535", // Muted Burgundy
          "#2f3542", // Slate
          "#4d453e", // Mocha
          "#3d3d5c", // Muted Indigo
        ];
        const cardBg = matteColors[index % matteColors.length];

        return (
          <section 
            key={article.id} 
            className="h-screen w-full snap-start relative flex flex-col items-center justify-center overflow-hidden"
            style={{ backgroundColor: cardBg }}
          >
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0">
              {article.image_url ? (
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  className="object-cover opacity-10 mix-blend-overlay"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
            </div>

            {/* Content Card */}
            <div className="relative z-10 w-full max-w-2xl px-6 md:px-0">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-16 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]"
              >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-2 py-0.5 rounded-sm bg-accent/20 text-accent text-[9px] font-black uppercase tracking-widest border border-accent/20">
                  {article.category}
                </span>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40">
                  {article.source} • {new Date(article.published_at).toLocaleDateString()}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-serif font-black text-white mb-6 leading-tight tracking-tight">
                {article.title}
              </h1>

              <div className="text-base md:text-lg text-white/80 leading-relaxed font-medium mb-10 text-justify line-clamp-[8] md:line-clamp-none">
                {article.summary && article.summary.length > 500 
                  ? article.summary.substring(0, 500) + "..." 
                  : article.summary}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleSpeaking(article)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isSpeaking && currentlySpeakingId === article.id ? "bg-accent text-white" : "bg-white/10 text-white hover:bg-accent"
                    }`}
                  >
                    {isSpeaking && currentlySpeakingId === article.id ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button 
                    className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({ title: article.title, url: article.url });
                      }
                    }}
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openReader(article.url)}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-black text-[10px] uppercase tracking-widest transition-all"
                  >
                    <BookOpen className="w-4 h-4" />
                    Full Story
                  </button>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 text-white hover:bg-accent transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Swipe Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 animate-bounce">
            <span className="text-[8px] font-black uppercase tracking-[0.4em]">Swipe Up</span>
            <ChevronDown className="w-5 h-5" />
          </div>
          </section>
        );
      })}

      {/* Reader Mode Modal */}
      <ReaderMode 
        url={url} 
        isOpen={isOpen} 
        onClose={closeReader} 
      />
    </main>
  );
}
