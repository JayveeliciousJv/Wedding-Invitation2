export const WEDDING = {
  bride: "Joy",
  groom: "Dexter",
  coupleOrder: ["Dexter", "Joy"] as const,
  monogram: "D&J",
  date: "2026-06-13T13:30:00+08:00",
  dateLabel: "June 13, 2026 · 1:30 PM",
  timeLabel: "1:30 PM (Philippine Time)",
  quote: "The Lord has made everything beautiful in His time.",
  quoteRef: "Ecclesiastes 3:11",
  tagline: "The Lord has made everything beautiful in His time.",
  // Motif swatches (display only)
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
    { time: "1:30 PM", label: "Entourage Processional", icon: "Users" },
    { time: "2:00 PM", label: "Ceremony", icon: "Church" },
    { time: "3:30 PM", label: "Photos", icon: "Camera" },
    { time: "4:00 PM", label: "Reception", icon: "MapPin" },
    { time: "4:30 PM", label: "Program", icon: "Mic" },
    { time: "6:00 PM", label: "Dinner", icon: "Utensils" },
    { time: "6:30 PM", label: "Party", icon: "PartyPopper" },
  ] as { time: string; label: string; icon: string }[],
  faqs: [
    {
      q: "What time should I arrive?",
      a: "Please arrive at least 15 minutes before the ceremony.",
    },
    {
      q: "Is there parking available?",
      a: "Yes, but parking at the church is limited. Ample parking will be available at the reception venue.",
    },
    {
      q: "Can I bring a plus one?",
      a: "Due to limited capacity, we can only accommodate guests listed on the invitation.",
    },
    {
      q: "Can I bring kids?",
      a: "As much as we love your little ones, we can only accommodate children who are part of the entourage.",
    },
  ],
  privacy:
    "This wedding is a quiet celebration with the people closest to us. We kindly ask you to refrain from sharing this invitation.",
  unplugged:
    "Kindly put away your phones and cameras and be fully present with us as we say \"I do.\" You may take photos after the ceremony.",
  registry:
    "Your presence is more than enough. If you wish to give, a monetary gift for our future would be greatly appreciated.",

  // Officiant
  officiant: "Rev. Fr. Danilo Vargas",

  // RSVP deadline
  rsvpDeadline: "May 20, 2026",

  // Detailed entourage (custom rich content)
  entourage: {
    invocation:
      "With praise and thanksgiving to God and blessings from our beloved parents",
    parents: {
      groom: ["Mr. Dennis S. Vargas", "Mrs. Melba P. Vargas"],
      bride: ["Engr. Francisco P. Imperial", "Mrs. Marissa C. Imperial"],
    },
    principalSponsorsHeading: "With our Principal Sponsors",
    principalSponsors: [
      "Dr. Bobby G. Felipe & Ms. Lisa A. Cea",
      "Mr. Dante Santelices & Mrs. Lani P. Santelices",
      "Mr. Valerio A. Cea Jr. & Mrs. Rosalina V. Cea",
      "Mr. Cesar Panti & Mrs. Arlene V. Panti",
      "Mr. Ronnie de San Andres & Mrs. Teresita I. de San Andres",
      "Mr. Victor S. Vargas & Mrs. Lani O. Vargas",
      "Mr. Arnulfo P. Imperial & Mrs. Nora S. Imperial",
    ],
    weddingPartyHeading: "To assist us with our needs",
    bestMan: "Mr. Darwin P. Vargas",
    maidOfHonor: "Ms. Valerie Rose V. Cea",
    matronOfHonor: "Mrs. Vanessa Mae R. Hernandez",

    bridalEntourageHeading: "Bridal Entourage — to guide our way ahead",
    groomsmen: [
      "Mr. Marc Joseph C. Imperial",
      "Mr. John Ford Eleccion",
      "Mr. Jethro Vargas",
      "Engr. Julius V. Panti",
    ],
    bridesmaids: [
      "Ms. Thea Ysabelle I. Millares",
      "Ms. Maydelyn P. Vargas",
      "Ms. Paula Louise de San Andres",
      "Ms. Nicole R. Magno",
    ],
    littleGroomsmen: [
      "Allen Matthew V. Evangelista",
      "Thomas Clark G. Amor",
    ],
    littleBridesmaids: [
      "Althea Mae V. Evangelista",
      "Julliana Ysabelle G. Cea",
    ],

    secondarySponsorsHeading: "Secondary Sponsors",
    secondarySponsors: {
      candle: {
        intent: "To light our path",
        names: ["Atty. Val V. Cea", "Atty. Anna Charmaine P. Guerrero"],
      },
      veil: {
        intent: "To clothe us as one",
        names: ["Atty. Keith Ulrick B. Imperial", "Ms. Melody P. Vargas"],
      },
      cord: {
        intent: "To bind us together",
        names: ["Arch. Francis John C. Imperial", "Ms. Noleen May V. dela Cruz"],
      },
    },

    bearersHeading: "To carry our symbols of love, faith & treasures",
    bibleBearer: "Prince Ulrich I. Medroso",
    coinBearer: "Timothy O. Vargas",
    ringBearer: "Lukas Millian R. Hernandez",

    flowerGirlsHeading: "To shower our path with flowers",
    flowerGirls: [
      "Amari Soliel C. Manaog",
      "Annaiah Reyne E. Cuadrante",
      "Hestia Kate A. Aspe",
    ],

    offertoryHeading: "Offertory Procession — Presentation of the Gifts",
    offertory: [
      { gift: "Candle", name: "Mr. Dennis P. Vargas Jr." },
      { gift: "Flowers", name: "Ms. Athena Liane O. Vargas" },
      { gift: "Eggs", name: "Mr. Felix O. Briones" },
      { gift: "Groceries", name: "Mr. John Michael Rodriguez" },
      { gift: "Wine", name: "Ms. Melden V. Evangelista" },
      { gift: "Host", name: "Ms. Kristel May B. Imperial" },
      { gift: "Chalice", name: "Mr. Jezam Vargas" },
      { gift: "Fruits", name: "Mr. Michael Elmer Cea" },
    ],
  },

  musicUrl:
    "https://cdn.pixabay.com/download/audio/2022/03/15/audio_4b1b1b6a5b.mp3?filename=romantic-piano-100013.mp3",
  rsvpEndpoint: "",
};
