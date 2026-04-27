"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Loader2, 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  Clock,
  BookOpen,
  Settings,
  ExternalLink,
  Share2
} from "lucide-react";
import { useThemeStore } from "@/lib/themeStore";

interface ReaderModeProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

interface ArticleContent {
  title: string;
  content: string;
  byline: string;
  siteName: string;
}

export default function ReaderMode({ url, isOpen, onClose }: ReaderModeProps) {
  const [content, setContent] = useState<ArticleContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg" | "xl">("lg");
  const { theme, setTheme } = useThemeStore();
  const [readingProgress, setReadingProgress] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isShared, setIsShared] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && url) {
      fetchContent();
      window.history.pushState({ readerOpen: true }, "");
    } else {
      stopSpeaking();
      setContent(null);
      setError(null);
    }

    const handlePopState = () => {
      if (isOpen) {
        onClose();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isOpen, url]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleClose = () => {
    if (isOpen) {
      window.history.back();
      onClose();
    }
  };

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Intelligence system is still deploying or unreachable. Please refresh in a moment.");
      }
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setContent(data);
      const text = data.content.replace(/<[^>]*>/g, '');
      const wordCount = text.split(/\s+/).length;
      setReadingTime(Math.max(1, Math.ceil(wordCount / 200)));
    } catch (err: any) {
      setError(err.message || "Failed to load article content");
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setReadingProgress(progress);
    }
  };

  const getBestVoice = () => {
    const priorities = ["Google US English", "Google UK English Female", "Samantha", "Victoria", "Microsoft Aria"];
    for (const name of priorities) {
      const voice = voices.find(v => v.name.includes(name));
      if (voice) return voice;
    }
    return voices.find(v => v.lang.startsWith("en")) || voices[0];
  };

  const startSpeaking = () => {
    if (!content) return;
    stopSpeaking();
    const fullText = `${content.title}. By ${content.byline || content.siteName}. ${content.content.replace(/<[^>]*>/g, ' ')}`;
    const chunks = fullText.match(/[^.!?]+[.!?]+/g) || [fullText];
    let currentChunkIndex = 0;

    const speakNextChunk = () => {
      if (currentChunkIndex >= chunks.length) {
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(chunks[currentChunkIndex].trim());
      const bestVoice = getBestVoice();
      if (bestVoice) utterance.voice = bestVoice;
      utterance.rate = 0.95;
      utterance.onend = () => {
        currentChunkIndex++;
        speakNextChunk();
      };
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    };
    speakNextChunk();
    setIsSpeaking(true);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/?read=${encodeURIComponent(url)}`;
    const shareData = {
      title: content?.title || "Finkar News Intelligence",
      text: `Check out this intelligence on Finkar News: ${content?.title}`,
      url: shareUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } catch (err) {
        console.error("Error copying to clipboard:", err);
      }
    }
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      startSpeaking();
    }
  };

  const themeStyles = {
    black: "bg-zinc-950 text-zinc-100 border-zinc-800",
    light: "bg-white text-zinc-900 border-zinc-200",
    paper: "bg-[#f4ecd8] text-[#5b4636] border-[#e4d4b1]"
  };

  const proseThemeStyles = {
    black: "prose-invert text-zinc-100/90",
    light: "text-zinc-900/90",
    paper: "text-[#5b4636]/90"
  };

  const fontClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm md:p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className={`relative w-full h-full max-w-5xl border shadow-2xl md:rounded-[2rem] overflow-hidden flex flex-col transition-colors duration-500 ${themeStyles[theme]}`}
          >
            <div className="absolute top-0 left-0 w-full h-1 z-[60] bg-zinc-800/20">
              <motion.div 
                className="h-full bg-accent"
                style={{ width: `${readingProgress}%` }}
              />
            </div>

            <div className={`flex items-center justify-between p-3 md:p-6 border-b transition-colors duration-500 z-50 ${themeStyles[theme]}`}>
              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={handleClose}
                  className="p-1.5 md:p-2 hover:bg-black/5 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="hidden sm:block">
                  <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-widest opacity-50 mb-0.5">Currently Reading</h3>
                  <p className="text-[10px] md:text-xs font-serif font-bold truncate max-w-[120px] md:max-w-[200px]">{content?.title || "Intelligence Summary"}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 md:gap-4">
                {content && (
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <button
                      onClick={toggleSpeaking}
                      className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full border transition-all ${
                        isSpeaking ? "bg-accent text-white border-accent" : "hover:bg-accent/10 border-transparent text-muted"
                      }`}
                    >
                      {isSpeaking ? <Pause className="w-3.5 h-3.5 md:w-4 h-4" /> : <Play className="w-3.5 h-3.5 md:w-4 h-4" />}
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest hidden lg:inline">
                        {isSpeaking ? "Listening" : "Listen"}
                      </span>
                    </button>
                    
                    <button
                      onClick={handleShare}
                      className={`flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-transparent hover:bg-accent/10 transition-all ${isShared ? "text-accent" : "text-muted"}`}
                    >
                      <Share2 className="w-3.5 h-3.5 md:w-4 h-4" />
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest hidden lg:inline">
                        {isShared ? "Link Copied" : "Share"}
                      </span>
                    </button>

                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-transparent hover:bg-accent/10 text-muted transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5 md:w-4 h-4" />
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest hidden lg:inline">Full Article</span>
                    </a>
                  </div>
                )}

                <div className="h-5 w-[1px] bg-border mx-0.5 hidden md:block"></div>

                <div className="flex items-center gap-1 p-1 bg-black/5 rounded-full scale-90 md:scale-100">
                  {(["light", "black", "paper"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`w-5 h-5 md:w-6 md:h-6 rounded-full border transition-all ${
                        theme === t ? "border-accent scale-110 shadow-sm" : "border-transparent opacity-50"
                      } ${
                        t === "light" ? "bg-white" : t === "black" ? "bg-zinc-900" : "bg-[#f4ecd8]"
                      }`}
                    />
                  ))}
                </div>

                <div className="h-5 w-[1px] bg-border mx-0.5 hidden md:block"></div>

                <div className="flex items-center gap-0.5 md:gap-1">
                  {(["sm", "base", "lg", "xl"] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full text-[9px] md:text-[10px] font-bold transition-all ${
                        fontSize === size ? "bg-accent text-white" : "hover:bg-black/5 opacity-50"
                      }`}
                    >
                      {size === "sm" ? "A" : size === "base" ? "A" : size === "lg" ? "A+" : "A++"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto custom-scrollbar"
            >
              <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
                {loading ? (
                  <div className="space-y-12 animate-pulse">
                    <div className="space-y-6">
                      <div className="h-4 w-24 bg-current/10 rounded" />
                      <div className="h-12 w-full bg-current/10 rounded-2xl" />
                      <div className="h-12 w-2/3 bg-current/10 rounded-2xl" />
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-4 w-full bg-current/5 rounded" style={{ opacity: 1 - i * 0.1 }} />
                      ))}
                    </div>
                    <div className="flex flex-col items-center justify-center py-10 gap-4">
                      <Loader2 className="w-6 h-6 text-accent animate-spin opacity-40" />
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30">
                        Distilling Intelligence...
                      </p>
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center py-20">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 text-red-500 mb-6">
                      <X className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-serif font-bold mb-4">Content Extraction Failed</h2>
                    <p className="opacity-60 mb-8 max-w-md mx-auto">{error}</p>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-accent/20"
                    >
                      Read on Original Site
                    </a>
                  </div>
                ) : content ? (
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <header className="space-y-6 mb-16">
                      <div className="flex items-center gap-4">
                        <span className="px-2 py-0.5 rounded-sm bg-accent/10 text-accent text-[10px] font-black uppercase tracking-widest border border-accent/20">
                          {content.siteName || "Intelligence Source"}
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest opacity-50">
                          <Clock className="w-3 h-3" />
                          {readingTime} min read
                        </span>
                      </div>
                      
                      <h1 className="text-4xl md:text-6xl font-serif font-black tracking-editorial leading-[1.1]">
                        {content.title}
                      </h1>
                      
                      {content.byline && (
                        <div className="flex items-center gap-4 pt-6 border-t border-border">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                            <span className="font-bold text-accent">{content.byline[0]}</span>
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Reported By</p>
                            <p className="text-sm font-serif font-bold italic">{content.byline}</p>
                          </div>
                        </div>
                      )}
                    </header>

                    <div 
                      className={`prose prose-lg max-w-none font-serif leading-[1.8] space-y-8 text-justify hyphens-auto editorial-reading-area ${proseThemeStyles[theme]} ${fontClasses[fontSize]}`}
                      dangerouslySetInnerHTML={{ __html: content.content }}
                    />
                    
                    <footer className="mt-24 pt-12 border-t border-border">
                      <div className="flex flex-col items-center gap-8">
                        <div className="flex items-center gap-2 opacity-30">
                          <div className="w-2 h-2 rounded-full bg-current" />
                          <div className="w-2 h-2 rounded-full bg-current" />
                          <div className="w-2 h-2 rounded-full bg-current" />
                        </div>
                        
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-50">
                          Intelligence Digest Complete
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                          <button
                            onClick={handleClose}
                            className={`px-10 py-5 rounded-full border border-border hover:border-accent transition-all font-black text-xs uppercase tracking-widest ${theme === 'black' ? 'bg-zinc-900' : 'bg-white shadow-xl'}`}
                          >
                            Back to News Feed
                          </button>
                          
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-10 py-5 rounded-full bg-accent text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-accent/20 hover:scale-105 transition-all flex items-center gap-2"
                          >
                            Read Full Article
                            <ArrowLeft className="w-4 h-4 rotate-180" />
                          </a>
                        </div>
                      </div>
                    </footer>
                  </motion.article>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
