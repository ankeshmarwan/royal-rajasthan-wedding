import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Heart, MapPin, Calendar, Share2, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Toaster } from "@/components/ui/sonner";

import heroPalace from "@/assets/hero-palace.jpg";
import mandala from "@/assets/mandala.png";
import couple from "@/assets/couple.jpg";
import haldiImg from "@/assets/haldi.jpg";
import sangeetImg from "@/assets/sangeet.jpg";
import weddingImg from "@/assets/wedding.jpg";
import g1 from "@/assets/gallery1.jpg";
import g2 from "@/assets/gallery2.jpg";
import g3 from "@/assets/gallery3.jpg";
import g4 from "@/assets/gallery4.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ankesh weds Drishti — A Royal Rajasthan Wedding" },
      { name: "description", content: "Join Ankesh & Drishti on 14 February 2027 in Udaipur for three days of royal Rajasthan celebrations — Haldi, Sangeet and Wedding." },
      { property: "og:title", content: "Ankesh weds Drishti — 14 Feb 2027, Udaipur" },
      { property: "og:description", content: "Three days of royal Rajasthan celebrations. RSVP inside." },
    ],
  }),
  component: InvitationPage,
});

// Wedding date — change here to update countdown everywhere
const WEDDING_DATE = new Date("2027-02-14T18:00:00+05:30");
const VENUE = "City Palace, Udaipur, Rajasthan";
const MAPS_EMBED = "https://www.google.com/maps?q=City+Palace+Udaipur+Rajasthan&output=embed";
const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=City+Palace+Udaipur+Rajasthan";

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff / 3_600_000) % 24);
  const minutes = Math.floor((diff / 60_000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

function InvitationPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Toaster position="top-center" richColors />
      <DecorativeBg />
      <Hero />
      <Countdown />
      <Couple />
      <Events />
      <Gallery />
      <Venue />
      <RSVP />
      <Footer />
    </main>
  );
}

function DecorativeBg() {
  return (
    <>
      <img
        src={mandala}
        alt=""
        aria-hidden
        className="pointer-events-none fixed -top-40 -left-40 h-[480px] w-[480px] opacity-[0.07] animate-spin-slow"
      />
      <img
        src={mandala}
        alt=""
        aria-hidden
        className="pointer-events-none fixed -bottom-40 -right-40 h-[520px] w-[520px] opacity-[0.07] animate-spin-slow"
        style={{ animationDirection: "reverse" }}
      />
    </>
  );
}

function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`divider-ornate ${className}`}>
      <Sparkles className="h-4 w-4" />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center px-4 py-16">
      <img
        src={heroPalace}
        alt="Royal Rajasthan palace with peacocks and marigolds"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/40 via-ivory/70 to-ivory" />

      <div className="relative z-10 mx-auto max-w-3xl text-center animate-blur-in">
        <p className="font-deva text-base sm:text-lg text-gold-deep tracking-wide">॥ श्री गणेशाय नमः ॥</p>
        <Ornament className="my-6" />
        <p className="font-body uppercase tracking-[0.4em] text-xs sm:text-sm text-maroon/70">
          With the blessings of our families
        </p>
        <h1 className="mt-8 font-script text-6xl sm:text-8xl md:text-9xl leading-[0.85] text-gold-gradient">
          Ankesh
        </h1>
        <p className="font-display italic text-2xl sm:text-3xl text-maroon my-3">weds</p>
        <h1 className="font-script text-6xl sm:text-8xl md:text-9xl leading-[0.85] text-gold-gradient">
          Drishti
        </h1>

        <Ornament className="my-8" />

        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-maroon">
          <div>
            <p className="font-display text-2xl sm:text-3xl">14</p>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">February</p>
          </div>
          <div className="border-x border-gold/40">
            <p className="font-display text-2xl sm:text-3xl">2027</p>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">Sunday</p>
          </div>
          <div>
            <p className="font-display text-2xl sm:text-3xl">Udaipur</p>
            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">Rajasthan</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-royal text-ivory shadow-royal hover:opacity-95 border-0">
            <a href="#rsvp">Send your blessings</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-gold-deep/40 text-maroon hover:bg-gold-light/30">
            <a href="#events">View events</a>
          </Button>
        </div>
      </div>

      <a href="#countdown" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold-deep/60 text-xs tracking-widest uppercase animate-float-slow">
        scroll
      </a>
    </section>
  );
}

function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const items = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];
  return (
    <section id="countdown" className="relative py-20 px-4">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-script text-4xl text-gold-deep">counting down to forever</p>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl text-maroon">The Auspicious Day</h2>
        <Ornament className="my-6" />
        <div className="grid grid-cols-4 gap-2 sm:gap-6 max-w-2xl mx-auto">
          {items.map((it) => (
            <div
              key={it.label}
              className="relative rounded-lg border border-gold/30 bg-card/80 backdrop-blur p-3 sm:p-6 shadow-soft"
            >
              <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-gold-light/20 to-transparent pointer-events-none" />
              <p className="font-display text-3xl sm:text-5xl md:text-6xl text-gold-gradient tabular-nums">
                {String(it.value).padStart(2, "0")}
              </p>
              <p className="mt-1 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {it.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Couple() {
  return (
    <section className="relative py-24 px-4">
      <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-br from-gold-light/40 to-transparent rounded-2xl blur-xl" />
          <div className="relative rounded-2xl overflow-hidden border-2 border-gold/30 shadow-royal">
            <img
              src={couple}
              alt="Ankesh and Drishti in traditional Rajasthani wedding attire"
              width={1024}
              height={1280}
              loading="lazy"
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="text-center md:text-left">
          <p className="font-script text-4xl text-gold-deep">the love story</p>
          <h2 className="mt-2 font-display text-4xl text-maroon">Two souls, one journey</h2>
          <Ornament className="my-6 md:!justify-start md:before:hidden" />
          <p className="text-muted-foreground leading-relaxed font-body">
            From a chance meeting in the lanes of Jaipur to a thousand shared sunsets,
            our story has been written in laughter, long talks and quiet promises. We
            invite you to witness the next chapter — sealed by sacred fire, blessed by
            our elders, and celebrated with the people we love most.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-xl border border-gold/30 bg-card/60">
              <p className="font-script text-3xl text-gold-gradient">Ankesh</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                S/O Mr. &amp; Mrs. Sharma
              </p>
            </div>
            <div className="p-4 rounded-xl border border-gold/30 bg-card/60">
              <p className="font-script text-3xl text-gold-gradient">Drishti</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                D/O Mr. &amp; Mrs. Singhania
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const EVENTS = [
  {
    name: "Haldi",
    sub: "Auspicious turmeric ceremony",
    date: "Friday, 12 February 2027",
    time: "10:00 AM onwards",
    venue: "Haveli Courtyard, Udaipur",
    desc: "A morning of laughter, marigolds and the golden glow of turmeric — bring colours you don’t mind losing to joy.",
    img: haldiImg,
    accent: "from-haldi/30",
  },
  {
    name: "Sangeet",
    sub: "Night of music & dance",
    date: "Saturday, 13 February 2027",
    time: "7:00 PM onwards",
    venue: "Sheesh Mahal Ballroom",
    desc: "Dhols, dandiya and a dance floor that refuses to sleep — come ready to lose your voice and find your rhythm.",
    img: sangeetImg,
    accent: "from-maroon/30",
  },
  {
    name: "Wedding",
    sub: "The sacred vows",
    date: "Sunday, 14 February 2027",
    time: "6:00 PM onwards",
    venue: "City Palace, Udaipur",
    desc: "Under a canopy of marigolds and starlight, we take seven steps into forever. Followed by dinner and dancing.",
    img: weddingImg,
    accent: "from-gold/40",
  },
];

function Events() {
  return (
    <section id="events" className="relative py-24 px-4 bg-gradient-to-b from-transparent via-ivory-deep/60 to-transparent">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-script text-4xl text-gold-deep">three days of celebration</p>
          <h2 className="mt-2 font-display text-4xl text-maroon">The Festivities</h2>
          <Ornament className="my-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {EVENTS.map((e, i) => (
            <article
              key={e.name}
              className="group relative rounded-2xl overflow-hidden border border-gold/30 bg-card/80 backdrop-blur shadow-soft hover:shadow-royal transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={e.img}
                  alt={`${e.name} ceremony`}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${e.accent} via-transparent to-transparent`} />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-ivory/90 backdrop-blur text-xs uppercase tracking-widest text-gold-deep border border-gold/30">
                  Day {i + 1}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-3xl text-gold-gradient">{e.name}</h3>
                <p className="font-script text-xl text-maroon/70 -mt-1">{e.sub}</p>
                <Ornament className="my-4 !justify-start before:!max-w-[2rem] after:!hidden" />
                <ul className="space-y-2 text-sm text-muted-foreground font-body">
                  <li className="flex gap-2"><Calendar className="h-4 w-4 shrink-0 text-gold-deep" /> {e.date}</li>
                  <li className="flex gap-2"><Sparkles className="h-4 w-4 shrink-0 text-gold-deep" /> {e.time}</li>
                  <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-gold-deep" /> {e.venue}</li>
                </ul>
                <p className="mt-4 text-sm italic text-foreground/70">{e.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [
    { src: g1, alt: "Couple's hands with mehndi", span: "row-span-2" },
    { src: g2, alt: "Rajasthani palace courtyard", span: "" },
    { src: g3, alt: "Bridal mehndi close-up", span: "" },
    { src: g4, alt: "Marigold petals on silk", span: "row-span-2" },
  ];
  return (
    <section className="relative py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-script text-4xl text-gold-deep">moments &amp; memories</p>
          <h2 className="mt-2 font-display text-4xl text-maroon">Gallery</h2>
          <Ornament className="my-6" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[200px]">
          {imgs.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-xl border border-gold/30 shadow-soft group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section className="relative py-24 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="font-script text-4xl text-gold-deep">find your way</p>
          <h2 className="mt-2 font-display text-4xl text-maroon">The Venue</h2>
          <Ornament className="my-6" />
          <p className="text-muted-foreground max-w-xl mx-auto">
            <MapPin className="inline h-4 w-4 text-gold-deep" /> {VENUE}
          </p>
        </div>
        <div className="mt-8 rounded-2xl overflow-hidden border-2 border-gold/30 shadow-royal aspect-video">
          <iframe
            title="Wedding venue map"
            src={MAPS_EMBED}
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="outline" className="border-gold-deep/40 text-maroon hover:bg-gold-light/30">
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
              <MapPin className="h-4 w-4" /> Open in Google Maps
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function RSVP() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const guests = String(fd.get("guests") || "1");
    const attendance = String(fd.get("attendance") || "yes");
    const events = fd.getAll("events").join(", ") || "—";
    const message = String(fd.get("message") || "");

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    setSubmitting(true);
    // Persist locally (no backend wired); also open WhatsApp pre-fill to the couple
    try {
      const all = JSON.parse(localStorage.getItem("rsvps") || "[]");
      all.push({ name, guests, attendance, events, message, at: new Date().toISOString() });
      localStorage.setItem("rsvps", JSON.stringify(all));
    } catch {}

    const text = `Namaste! 🙏%0A*RSVP for Ankesh & Drishti*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Attending:* ${attendance}%0A*Guests:* ${guests}%0A*Events:* ${encodeURIComponent(events)}%0A*Message:* ${encodeURIComponent(message)}`;
    window.open(`https://wa.me/?text=${text}`, "_blank");
    toast.success("Thank you! Your RSVP is on its way 💛");
    setSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="rsvp" className="relative py-24 px-4">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <p className="font-script text-4xl text-gold-deep">with love, please reply by 20 Jan</p>
          <h2 className="mt-2 font-display text-4xl text-maroon">RSVP</h2>
          <Ornament className="my-6" />
        </div>
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-gold/30 bg-card/80 backdrop-blur p-6 sm:p-10 shadow-royal space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="name" className="text-maroon font-display text-base">Your name</Label>
            <Input id="name" name="name" placeholder="Full name" required className="bg-ivory border-gold/30" />
          </div>

          <div className="space-y-3">
            <Label className="text-maroon font-display text-base">Will you be there?</Label>
            <RadioGroup name="attendance" defaultValue="yes" className="grid grid-cols-2 gap-3">
              {[
                { v: "yes", l: "Joyfully accept" },
                { v: "no", l: "Regretfully decline" },
              ].map((o) => (
                <Label
                  key={o.v}
                  htmlFor={`att-${o.v}`}
                  className="flex items-center gap-3 rounded-lg border border-gold/30 bg-ivory px-4 py-3 cursor-pointer hover:bg-gold-light/30 transition-colors has-[:checked]:bg-gold-light/40 has-[:checked]:border-gold-deep"
                >
                  <RadioGroupItem id={`att-${o.v}`} value={o.v} />
                  <span className="font-body text-sm">{o.l}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests" className="text-maroon font-display text-base">Number of guests</Label>
            <Input id="guests" name="guests" type="number" min={1} max={10} defaultValue={1} className="bg-ivory border-gold/30" />
          </div>

          <div className="space-y-3">
            <Label className="text-maroon font-display text-base">Which events?</Label>
            <div className="grid sm:grid-cols-3 gap-3">
              {EVENTS.map((e) => (
                <Label
                  key={e.name}
                  className="flex items-center gap-2 rounded-lg border border-gold/30 bg-ivory px-3 py-2 cursor-pointer hover:bg-gold-light/30 has-[:checked]:bg-gold-light/40 has-[:checked]:border-gold-deep"
                >
                  <input type="checkbox" name="events" value={e.name} defaultChecked className="accent-[oklch(0.55_0.13_60)]" />
                  <span className="font-body text-sm">{e.name}</span>
                </Label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-maroon font-display text-base">A message for the couple</Label>
            <Textarea id="message" name="message" rows={3} placeholder="Blessings, wishes, dance requests…" className="bg-ivory border-gold/30" />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full bg-royal text-ivory border-0 shadow-royal hover:opacity-95"
          >
            <Send className="h-4 w-4" />
            Send RSVP via WhatsApp
          </Button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  const shareText = useMemo(
    () => `You're invited! 💛 Ankesh weds Drishti — 14 Feb 2027, Udaipur. Details & RSVP: ${typeof window !== "undefined" ? window.location.href : ""}`,
    []
  );

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Ankesh weds Drishti", text: shareText, url });
        return;
      } catch {}
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  return (
    <footer className="relative py-20 px-4 text-center">
      <Ornament className="mb-8" />
      <Heart className="mx-auto h-6 w-6 text-gold-deep animate-shimmer" />
      <p className="mt-4 font-script text-5xl text-gold-gradient">Ankesh &amp; Drishti</p>
      <p className="mt-2 text-sm uppercase tracking-[0.3em] text-muted-foreground">
        14 · 02 · 2027 — Udaipur
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={share} className="bg-royal text-ivory border-0 shadow-soft hover:opacity-95">
          <Share2 className="h-4 w-4" /> Share on WhatsApp
        </Button>
        <Button asChild variant="outline" className="border-gold-deep/40 text-maroon hover:bg-gold-light/30">
          <a href="#rsvp">RSVP</a>
        </Button>
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        Made with love · Pheras to pakka shaadi
      </p>
    </footer>
  );
}
