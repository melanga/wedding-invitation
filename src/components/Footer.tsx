import { weddingConfig } from "@/lib/weddingConfig";
import { Reveal } from "@/components/Reveal";
import { Ornament } from "@/components/Ornament";

export function Footer() {
  const { couple, contact } = weddingConfig;

  return (
    <footer className="bg-charcoal px-6 py-16 text-center text-ivory lg:py-24">
      <Reveal>
        <p className="font-cursive text-4xl lg:text-5xl">
          {couple.partnerOne} &amp; {couple.partnerTwo}
        </p>
        <Ornament className="mt-5 text-gold-light" />
        <p className="mt-5 text-sm tracking-widest text-ivory/70 uppercase">
          {couple.hashtag}
        </p>
      </Reveal>

      {contact.length > 0 ? (
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-xs flex-col gap-2 text-sm text-ivory/80">
            <p className="mb-1 text-xs tracking-widest text-ivory/50 uppercase">
              Questions? Reach out
            </p>
            {contact.map((person) => (
              <p key={person.name}>
                {person.name}
                {person.phone ? ` — ${person.phone}` : ""}
              </p>
            ))}
          </div>
        </Reveal>
      ) : null}

      <p className="mt-12 text-xs text-ivory/40">
        With love, {couple.partnerOne} &amp; {couple.partnerTwo}
      </p>
    </footer>
  );
}
