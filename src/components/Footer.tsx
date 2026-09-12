import { weddingConfig } from "@/lib/weddingConfig";
import { Reveal } from "@/components/Reveal";
import { Ornament } from "@/components/Ornament";
import {
  SPRITE_DISPLAY_WIDTH,
  SPRITE_HEIGHT,
  SPRITE_WIDTH,
} from "@/components/pixel-couple/sprites";

const FOOTER_CLEARANCE = `calc(${SPRITE_DISPLAY_WIDTH} * ${SPRITE_HEIGHT / SPRITE_WIDTH} + 6rem)`;

export function Footer() {
  const { couple } = weddingConfig;

  return (
    <footer
      className="bg-charcoal px-6 pt-16 text-center text-ivory lg:pt-24"
      style={{ paddingBottom: FOOTER_CLEARANCE }}
    >
      <Reveal>
        <p className="overflow-visible px-[0.35em] font-cursive text-4xl leading-[1.2] lg:text-5xl">
          {couple.partnerOne} &amp; {couple.partnerTwo}
        </p>
        <Ornament className="mt-5 text-gold-light" />
        <p className="mt-5 text-sm tracking-widest text-ivory/70 uppercase">
          {couple.hashtag}
        </p>
      </Reveal>

      <p className="mt-12 text-xs text-ivory/40">
        With love, {couple.partnerOne} &amp; {couple.partnerTwo}
      </p>
    </footer>
  );
}
