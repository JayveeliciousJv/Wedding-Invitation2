export const WEDDING = {
  bride: "Joy",
  groom: "Dexter",
  // Couple display order: groom & bride per requirements ("Dexter and Joy")
  coupleOrder: ["Dexter", "Joy"] as const,
  monogram: "D&J",
  date: "2026-06-13T13:30:00+08:00",
  dateLabel: "June 13, 2026 · 1:30 PM",
  timeLabel: "1:30 PM (Philippine Time)",
  quote: "The Lord has made everything beautiful in His time.",
  quoteRef: "Ecclesiastes 3:11",
  tagline: "The Lord has made everything beautiful in His time.",
  motif: ["#545454", "#737373", "#A6A6A6", "#B4B4B4"],
  attire: {
    title: "Attire",
    detail: "Semi-Formal",
    note:
      "We would like to see you in your best and most comfortable semi-formal attire that suits our motif.",
  },
  ceremony: {
    name: "Ceremony",
    time: "1:30 PM",
    place: "St. Martin de Porres Parish",
    address: "Tagongtong, Goa, Camarines Sur",
    mapsLink:
      "https://www.google.com/maps/dir/?api=1&destination=St.+Martin+de+Porres+Parish+Tagongtong+Goa+Camarines+Sur",
    mapsEmbed:
      "https://www.google.com/maps?q=St.+Martin+de+Porres+Parish+Tagongtong+Goa+Camarines+Sur&output=embed",
  },
  reception: {
    name: "Reception",
    time: "4:00 PM",
    place: "Casa Veronica Events Place",
    address: "Villa Peña Subdivision, Goa, Camarines Sur",
    mapsLink:
      "https://www.google.com/maps/dir/?api=1&destination=Casa+Veronica+Events+Place+Villa+Pena+Subdivision+Goa+Camarines+Sur",
    mapsEmbed:
      "https://www.google.com/maps?q=Casa+Veronica+Events+Place+Villa+Pena+Subdivision+Goa+Camarines+Sur&output=embed",
  },
  timeline: [
    { time: "1:30 PM", label: "Entourage Processional" },
    { time: "2:00 PM", label: "Ceremony" },
    { time: "3:30 PM", label: "Photos" },
    { time: "4:00 PM", label: "Reception" },
    { time: "4:30 PM", label: "Program" },
    { time: "6:00 PM", label: "Dinner" },
    { time: "6:30 PM", label: "Party" },
  ],
  faqs: [
    {
      q: "What time should I arrive?",
      a: "Please arrive by 1:00 PM so we can start the ceremony promptly at 1:30 PM.",
    },
    {
      q: "Is parking available?",
      a: "Yes, parking is available at both the ceremony and reception venues.",
    },
    {
      q: "Can I bring a plus one?",
      a: "Due to limited seating, we kindly ask that you only bring guests named on your invitation.",
    },
    {
      q: "Can I bring kids?",
      a: "We love your little ones, but our celebration is intended to be an adults-only affair, with the exception of immediate family.",
    },
  ],
  privacy:
    "This wedding is a quiet celebration with the people closest to us. We kindly ask you to refrain from sharing this invitation.",
  unplugged:
    "Kindly put away your phones and cameras and be fully present with us as we say \"I do.\" You may take photos after the ceremony.",
  registry:
    "Your presence is more than enough. If you wish to give, a monetary gift for our future would be greatly appreciated.",
  entourage: {
    parents: {
      bride: ["Mr. & Mrs. Father & Mother of the Bride"],
      groom: ["Mr. & Mrs. Father & Mother of the Groom"],
    },
    principalSponsors: [
      "To be announced",
    ],
    secondarySponsors: {
      candle: ["—"],
      veil: ["—"],
      cord: ["—"],
    },
    bridesmaids: ["—"],
    groomsmen: ["—"],
    bestMan: "—",
    maidOfHonor: "—",
    flowerGirls: ["—"],
    ringBearer: "—",
    bibleBearer: "—",
    coinBearer: "—",
  },
  // Soft instrumental wedding music (royalty-free). Replace with your own track if desired.
  musicUrl:
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_4b1b1b6a5b.mp3?filename=romantic-piano-100013.mp3",
  // Replace with your Google Apps Script Web App URL
  rsvpEndpoint: "",
};
