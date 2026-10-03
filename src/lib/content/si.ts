import { en } from "./en";
import type { InvitationContent } from "./types";

// Sinhala sentences spell the couple's names in Sinhala script; the cursive
// hero and footer names stay in English (weddingConfig.couple).
const names = "ජනනී සහ මෙලංග";
const description = `${names} විවාහ වෙති — අපගේ සදාකාලික ජීවන ගමනේ ආරම්භය සමරන්නට අප හා එක්වන්න.`;

export const si: InvitationContent = {
  meta: {
    title: `${names} | අපි විවාහ වෙනවා`,
    description,
    ogLocale: "si_LK",
  },
  hero: {
    greetingEyebrow: "දෙපවුලේ ආශීර්‍වාදය ඇතිව",
    invitationLine: "සිය විවාහ මංගල්‍යයට ඔබට සාදරයෙන් ආරාධනා කරති",
    rsvpButton: "පැමිණීම දන්වන්න",
    scrollHint: "පහළට",
  },
  event: {
    eyebrow: "දිනය සටහන් කර ගන්න",
    title: "මංගල දිනය",
    displayDate: "2026 ඔක්තෝබර් 23 වැනි සිකුරාදා",
    displayTime: "පෙ.ව. 8.15 සිට",
  },
  venue: {
    name: "ද ග්‍රෑන්ඩ් වලව්ව",
    address: "අංක 190/8, මහනුවර පාර, කෑගල්ල, ශ්‍රී ලංකාව",
    mapLink: "Google සිතියමෙන් බලන්න",
  },
  calendar: {
    googleButton: "Google Calendar වෙත එක් කරන්න",
    icsButton: "Apple / Outlook (.ics) වෙත එක් කරන්න",
    eventTitle: `${names}ගේ විවාහ මංගල්‍යය`,
    eventDescription: `${names}ගේ විවාහ මංගල්‍යය සමරන්නට අප හා එක්වන්න. ${description}`,
    // Calendar apps look the location up on a map, so it stays in English.
    eventLocation: en.calendar.eventLocation,
  },
  schedule: {
    eyebrow: "දවසේ වැඩසටහන",
    title: "කාලසටහන",
    items: [
      {
        time: "පෙ.ව. 8.15",
        title: "අමුත්තන්ගේ පැමිණීම",
        description: "ඔබ සිනහවකින් පිළිගැනීමට හැකි වන පරිදි, කරුණාකර මඳක් කලින් පැමිණෙන්න.",
      },
      {
        time: "පෙ.ව. 8.45",
        title: "විවාහ ලියාපදිංචිය",
        description: "නිල වශයෙන් ‘ඔව්’ කියන මොහොත — අත්සන් කිහිපයක්, ඉන්පසු ජීවිත කාලයක්ම එකට.",
      },
      {
        time: "පෙ.ව. 10.00",
        title: "පෝරුව චාරිත්‍රය",
        description: "අප එක්ව මුල් පියවර තබන මොහොතේ, දෙපවුලේම ආශීර්‍වාදය.",
      },
      {
        time: "ප.ව. 12.00",
        title: "දිවා භෝජනය",
        description: "බඩගින්නේම එන්න, නැවතත් බෙදාගන්න, කේක් කෑල්ලකටත් ඉඩක් තබාගන්න.",
      },
      {
        time: "ප.ව. 4.00",
        title: "නික්ම යාම",
        description: "ඔබගේ ආදරය සමඟ අපට සමු දෙන්න.",
      },
    ],
  },
  closing: {
    title: "අප හා එක්වන්න",
    message:
      "ඔබගේ පැමිණීම අපට ලොවක් සේ වටී. ඔබ අප සමඟ මෙම සතුට බෙදාගන්නට එන්නේදැයි අපට දන්වන්න.",
    rsvpButton: "දැන්ම දන්වන්න",
  },
  rsvp: {
    title: "පැමිණීම දන්වන්න",
    closeLabel: "පෝරමය වසන්න",
    respondBy: "පැමිණීම දැන්වීමට අවසන් දිනය:",
    deadlineDisplay: "2026 ඔක්තෝබර් 10",
    form: {
      nameLabel: "සම්පූර්‍ණ නම",
      namePlaceholder: "ඔබගේ නම",
      emailLabel: "ඊමේල් ලිපිනය",
      emailPlaceholder: "you@example.com",
      attendingLegend: "ඔබ පැමිණෙන්නේද?",
      accept: "සතුටින් පැමිණෙමි",
      decline: "කනගාටුයි, පැමිණිය නොහැක",
      guestCountLabel: "අමුත්තන් ගණන (ඔබ ද ඇතුළුව)",
      guestCountReserved: "ඔබ වෙනුවෙන්ම ආසනයක් වෙන් කර ඇත.",
      guestCountLimit: "ඔබගේ ආරාධනය උපරිම අමුත්තන් {count} දෙනෙකු සඳහායි.",
      messageLabel: "නවයුවළට පණිවිඩයක් (අවශ්‍ය නම්)",
      messagePlaceholder: "නවයුවළට සුබ පැතුමක් ලියන්න",
      submit: "පිළිතුර යවන්න",
      submitting: "යවමින්...",
      successTitle: "ස්තුතියි!",
      successMessage:
        "ඔබගේ පිළිතුර අපට ලැබුණි. ඔබ සමඟ මෙම සතුට සමරන්නට අපි නොඉවසිල්ලෙන් බලා සිටිමු.",
      unavailableError:
        "පිළිතුරු යැවීම තාවකාලිකව අක්‍රියයි. කරුණාකර අපව සෘජුවම අමතන්න.",
      genericError: "යම් දෝෂයක් සිදු විය. කරුණාකර මඳ වේලාවකින් නැවත උත්සාහ කරන්න.",
    },
    validation: {
      nameTooShort: "කරුණාකර ඔබගේ සම්පූර්‍ණ නම ඇතුළත් කරන්න",
      nameTooLong: "නම මඳක් දිග වැඩි බව පෙනේ",
      emailInvalid: "කරුණාකර නිවැරදි ඊමේල් ලිපිනයක් ඇතුළත් කරන්න",
      attendingRequired: "කරුණාකර ඔබ පැමිණෙන්නේද යන්න අපට දන්වන්න",
      guestCountInvalid: "කරුණාකර අමුත්තන් ගණන ඇතුළත් කරන්න",
      guestCountMin: "අවම වශයෙන් එක් අමුත්තෙකු සිටිය යුතුය",
      guestCountMax: "ඔබගේ ආරාධනයට ඇතුළත් අමුත්තන් ගණනට වඩා වැඩිය",
      messageTooLong: "පණිවිඩය දිග වැඩියි",
    },
  },
  footer: {
    signOff: `ආදරයෙන්, ${names}`,
  },
};
