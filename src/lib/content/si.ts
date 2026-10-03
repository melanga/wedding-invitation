import { en } from "./en";
import type { InvitationContent } from "./types";

// Written as a Sinhala invitation would put it rather than translated line
// by line from en.ts. Sentences spell the couple's names in Sinhala script;
// the cursive hero and footer names stay in English (weddingConfig.couple).
const names = "ජනනී සහ මෙලංග";
const invitation = "අපගේ විවාහ මංගල්‍යයට ඔබට ආදරයෙන් ආරාධනා කරමු";
const description = "අපගේ ජීවිතයේ සුන්දරම දිනය ඔබත් සමඟ සැමරීමට අපි ආශා කරමු.";

export const si: InvitationContent = {
  meta: {
    title: `${names}ගේ විවාහ මංගල්‍යය`,
    description,
    ogLocale: "si_LK",
  },
  hero: {
    greetingEyebrow: "දෙපවුලේම ආශීර්‍වාදය ඇතිව",
    invitationLine: invitation,
    rsvpButton: "පැමිණීම දන්වන්න",
    scrollHint: "පහළට",
  },
  event: {
    eyebrow: "දිනය සහ ස්ථානය",
    title: "මංගල දිනය",
    displayDate: "2026 ඔක්තෝබර් මස 23 වැනි සිකුරාදා",
    displayTime: "පෙ.ව. 8.15 සිට",
  },
  venue: {
    name: "ග්‍රෑන්ඩ් වලව්ව",
    address: "අංක 190/8, මහනුවර පාර, කෑගල්ල",
    mapLink: "සිතියමෙන් බලන්න",
  },
  calendar: {
    googleButton: "Google Calendar හි සටහන් කරගන්න",
    icsButton: "Apple / Outlook හි සටහන් කරගන්න (.ics)",
    eventTitle: `${names}ගේ විවාහ මංගල්‍යය`,
    eventDescription: `${invitation}. ${description}`,
    // Calendar apps look the location up on a map, so it stays in English.
    eventLocation: en.calendar.eventLocation,
  },
  schedule: {
    eyebrow: "දවස ගෙවෙන හැටි",
    title: "උත්සව වැඩසටහන",
    items: [
      {
        time: "පෙ.ව. 8.15",
        title: "ආරාධිතයන්ගේ පැමිණීම",
        description: "සිනහවකින් ඔබ පිළිගැනීමට අපි සූදානම්. හැකි නම් මඳක් කලින්ම පැමිණෙන්න.",
      },
      {
        time: "පෙ.ව. 8.45",
        title: "විවාහ ලියාපදිංචිය",
        description: "අත්සන් කිහිපයක් පමණයි — එතැන් පටන් ජීවිත කාලයක්ම එකට.",
      },
      {
        time: "පෙ.ව. 10.00",
        title: "පෝරු චාරිත්‍රය",
        description: "දෙපවුලේ වැඩිහිටියන්ගේ ආශීර්‍වාද මැද, අපි එකට අලුත් ජීවිතයක් අරඹන මොහොත.",
      },
      {
        time: "ප.ව. 12.00",
        title: "දිවා භෝජන සංග්‍රහය",
        description: "බඩගින්නේම එන්න, ආයෙත් බෙදාගන්න — කේක් කෑල්ලකටත් බඩේ ඉඩක් තියාගන්න!",
      },
      {
        time: "ප.ව. 4.00",
        title: "සමුගැනීම",
        description: "ඔබගේ ආදරයෙන් හා සුබ පැතුම්වලින් අපට සමු දෙන්න.",
      },
    ],
  },
  closing: {
    title: "ඔබගේ පැමිණීම අපගේ සතුටයි",
    message:
      "මේ සුබ දිනයේ ඔබත් අප අසල සිටිනු දැකීමට අපි ආශා කරමු. ඔබ පැමිණෙන්නේදැයි කරුණාකර අපට දන්වන්න.",
    rsvpButton: "දැන්ම දන්වන්න",
  },
  rsvp: {
    title: "පැමිණීම දන්වන්න",
    closeLabel: "පෝරමය වසන්න",
    respondBy: "කරුණාකර {date} වැනිදාට පෙර පිළිතුරු එවන්න",
    deadlineDisplay: "ඔක්තෝබර් 10",
    form: {
      nameLabel: "සම්පූර්‍ණ නම",
      namePlaceholder: "ඔබගේ නම",
      emailLabel: "ඊමේල් ලිපිනය",
      emailPlaceholder: "you@example.com",
      attendingLegend: "ඔබ පැමිණෙන්නේද?",
      accept: "සතුටින් පැමිණෙමි",
      decline: "කනගාටුයි, පැමිණිය නොහැක",
      guestCountLabel: "පැමිණෙන ගණන (ඔබත් ඇතුළුව)",
      guestCountReserved: "ඔබ වෙනුවෙන්ම ආසනයක් වෙන් කර ඇත.",
      guestCountLimit: "ඔබත් ඇතුළුව {count} දෙනෙකුට ආසන වෙන් කර ඇත.",
      messageLabel: "නව යුවළට සුබ පැතුමක් (කැමති නම්)",
      messagePlaceholder: "ඔබගේ සුබ පැතුම මෙහි ලියන්න",
      submit: "පිළිතුර යවන්න",
      submitting: "යවමින්...",
      successTitle: "ස්තුතියි!",
      successMessage:
        "ඔබගේ පිළිතුර ලැබුණි. ඔබ සමඟ මේ සතුට බෙදා ගැනීමට අපි ආශාවෙන් බලා සිටිමු.",
      unavailableError:
        "මේ මොහොතේ පිළිතුරු යැවිය නොහැක. කරුණාකර අපට කෙලින්ම දන්වන්න.",
      genericError: "යම් දෝෂයක් සිදු විය. කරුණාකර මඳ වේලාවකින් නැවත උත්සාහ කරන්න.",
    },
    validation: {
      nameTooShort: "කරුණාකර ඔබගේ සම්පූර්‍ණ නම ඇතුළත් කරන්න",
      nameTooLong: "නම දිග වැඩියි",
      emailInvalid: "කරුණාකර නිවැරදි ඊමේල් ලිපිනයක් ඇතුළත් කරන්න",
      attendingRequired: "කරුණාකර ඔබ පැමිණෙන්නේද යන්න දන්වන්න",
      guestCountInvalid: "කරුණාකර පැමිණෙන ගණන ඇතුළත් කරන්න",
      guestCountMin: "ගණන එකට වඩා අඩු විය නොහැක",
      guestCountMax: "ඔබට වෙන් කර ඇති ආසන ගණනට වඩා වැඩියි",
      messageTooLong: "පණිවිඩය දිග වැඩියි",
    },
  },
  footer: {
    signOff: `ආදරයෙන්, ${names}`,
  },
};
