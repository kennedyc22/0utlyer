// Project index + detail pages. The `description` field is a multi-paragraph
// string with `\n\n` as paragraph separators — the detail page splits and
// renders one <p> per paragraph.

export type ProjectStatus = "In Development" | "In Production" | "Released";

export type Project = {
  slug: string;
  title: string;
  year: number;
  status: ProjectStatus;
  synopsis: string;
  description: string;
  hero: { src: string; alt: string };
  credits: Array<{ role: string; name: string }>;
  ogImage: string;
};

export const projects: Project[] = [
  {
    slug: "dream-fever",
    title: "Dream Fever",
    year: 2025,
    status: "In Development",
    synopsis:
      "An emotionally charged documentary on the journey of Emmanuel Kelly.",
    description:
      "DREAM FEVER is an emotionally charged 90-minute documentary that intimately captures the extraordinary journey of Emmanuel Kelly. A boy born different, he is now a man determined to make a difference in the world. His story is one of resilience, hope, and the power of the human spirit. This film tells the remarkable story of how Emmanuel imagined forever changing the way the world sees people with disability. The journey begins — prophetically — with him singing the song “Imagine” on a talent show and being instantly propelled toward global fame.",
    hero: {
      src: "/project-images/dream-fever.png",
      alt: "Dream Fever — hero still.",
    },
    credits: [],
    ogImage: "/project-images/dream-fever.png",
  },
  {
    slug: "crewel-work",
    title: "Crewel Work",
    year: 2025,
    status: "In Development",
    synopsis: "An Elizabethan murder mystery with an interactive twist.",
    description:
      "An Elizabethan murder mystery with an interactive twist.\n\nEDONY THINN is one of seven young women selected by Lord Walsingham to take part in the Virgin Fray, a prestigious contest held once a year to find England’s most proficient embroiderer. The winner will be given membership to the Brotherhood Of Broderers. This ancient guild allows only one woman a year to be admitted to their ranks and that woman will gain status, money and most crucially — a place in Walsingham’s Secret Service. Because unbeknownst to the warring courts of Europe, English linen is carrying hidden codes within their embroidered designs.\n\nEdony is tipped to be this year’s winner, but on the morning of the Virgin Fray her body is found in a casket, within a room bolted from the inside.\n\nThis locked-room mystery, woven with cryptic clues, challenges the audience to interactively play along, competing to be the first to solve the mystery.",
    hero: {
      src: "/project-images/crewel-work.avif",
      alt: "Crewel Work — hero still.",
    },
    credits: [],
    ogImage: "/project-images/crewel-work.avif",
  },
  {
    slug: "wolf-who-chased-the-sun",
    title: "Wolf Who Chased The Sun",
    year: 2025,
    status: "In Development",
    synopsis:
      "A turn-of-the-century duel between an outlaw wolf and a solitary hunter.",
    description:
      "At the turn of the last century, something unprecedented happened in South Dakota. For the first time a MOST WANTED poster was issued not for a man — but a wolf. Branded an outlaw, killing cattle on a relentless rampage, a bounty of $500 was put on the head of El Bruto. Rumour had it that this wolf possessed an intelligence beyond nature.\n\nThe challenge was accepted by only one man — the legendary wolf-hunter, HP Williams. A solitary and obscure man, Williams had spent years in the wilderness, teaching himself to think like a wolf. But these decades of preparation and countless successful hunts could not prepare Williams for the battle of wits, cunning and endurance that lay ahead of him.\n\n“The Wolf Who Chased The Sun” brings to life this extraordinary duel, where a wolf possesses a rare humanity and a man must find the beast within himself.",
    hero: {
      src: "/project-images/high-power-williams.avif",
      alt: "Wolf Who Chased The Sun — hero still.",
    },
    credits: [],
    ogImage: "/project-images/high-power-williams.avif",
  },
  {
    slug: "slippery-beast",
    title: "Slippery Beast",
    year: 2025,
    status: "In Development",
    synopsis: "A classic whodunnit told in a highly innovative way.",
    description:
      "When aspiring actress CONNIE KELLER lands the lead role in a studio movie, it seems as though her life is just beginning. Three months later, she’s found dead. And the cause is disputed — murder or suicide? This question bizarrely mimics the same mystery that has for centuries surrounded the famed historic character she was due to play in the movie. A classic whodunnit told in a highly innovative way, driven by a star-studded cast. Truth is a Slippery Beast…",
    hero: {
      src: "/project-images/slippery-beast.avif",
      alt: "Slippery Beast — hero still.",
    },
    credits: [],
    ogImage: "/project-images/slippery-beast.avif",
  },
  {
    slug: "game-of-hearts",
    title: "Game of Hearts",
    year: 2025,
    status: "In Development",
    synopsis:
      "A modern re-imagining of the hugely popular opera Cosi Fan Tutte.",
    description:
      "A modern re-imagining of the hugely popular opera Cosi Fan Tutte. When two strangers meet in a bar to snatch a drink before proposing to their girlfriends, events take an unexpected twist as a wager is made to test the fidelity of their brides-to-be.",
    hero: {
      src: "/project-images/game-of-hearts.avif",
      alt: "Game of Hearts — hero still.",
    },
    credits: [],
    ogImage: "/project-images/game-of-hearts.avif",
  },
  {
    slug: "the-widow-man",
    title: "The Widow Man",
    year: 2025,
    status: "In Development",
    synopsis:
      "A widow accepts the sheriff’s badge — and the man who keeps her alive.",
    description:
      "When a sheriff is murdered his wife has the right to serve out his term. This is known as “Widow’s Succession”. Few women ever dared. It was a violent and lawless time. But one widow accepts the badge. She will bring law. And she will seek justice. But she knows her first duty is to survive in office. There are plenty ready to prevent a woman from wielding a sheriff’s badge. She needs protection, someone she can trust. She needs THE WIDOW MAN.",
    hero: {
      src: "/project-images/the-widow-man.avif",
      alt: "The Widow Man — hero still.",
    },
    credits: [],
    ogImage: "/project-images/the-widow-man.avif",
  },
  {
    slug: "mission-creep",
    title: "Mission Creep",
    year: 2025,
    status: "In Development",
    synopsis:
      "An elite marine unit’s retrieval mission collides with something darker.",
    description:
      "A unit of elite marines known as the Relix are sent to retrieve a highly-trained but deeply troubled soldier who has gone AWOL from an experimental PTSD treatment facility. Arriving in the wilds of the Ozark mountains, the Relix soon discover that there is more to this retrieval than they were told: the so-called facility is a church, and the PTSD treatment is exorcism — an experiment that has gone catastrophically wrong. Inspired by true events.",
    hero: {
      src: "/project-images/mission-creep.avif",
      alt: "Mission Creep — hero still.",
    },
    credits: [],
    ogImage: "/project-images/mission-creep.avif",
  },
  {
    slug: "an-orc-in-new-york",
    title: "An Orc In New York",
    year: 2025,
    status: "In Development",
    synopsis:
      "A fresh take on a timeless tale — when we seek to save another, we often save ourselves.",
    description:
      "MIKKI ORC finds himself forced to flee from the subterranean polar province of Orcadia by ruthless industrial frackers who are plumbing the volcanic depths below the ice-caps. With his habitat destroyed, Mikki is relocated as a refugee into the hustle and bustle of New York, not the easiest place for a giant Orc to fit in, either socially, emotionally or even physically. Have you ever tried being twelve feet tall and squeezing onto the subway?\n\nElsewhere in the upstate town of Cringle Ridge, a little boy called LOUIE is facing his first Christmas since his mother LAVENDER passed away. His father DEXTER and GREAT UNCLE FINGAL wonder how they will find a way through the season that Lavender loved so much. It hardly seems like home without her…\n\nThe story introduces us to a carnival of characters both human and animal as a magical destiny leads Louie and Mikki to meet. And as the action rises to a kaleidoscopic climax in Rockefeller Square, AN ORC IN NEW YORK delivers a fresh take on a timeless tale — that when we seek to save another, we often save ourselves.",
    hero: {
      src: "/project-images/an-orc-in-new-york.avif",
      alt: "An Orc In New York — hero still.",
    },
    credits: [],
    ogImage: "/project-images/an-orc-in-new-york.avif",
  },
  {
    slug: "something-blue",
    title: "Something Blue",
    year: 2025,
    status: "In Development",
    synopsis:
      "Murder demands the same precious attention to detail as your wedding day.",
    description:
      "There are two big moments in your life when you hope that everything goes perfectly to plan. One is the day of your wedding when you pledge your life to someone. The smallest detail — from the napkin shade to the seating plan — must be rigorously reviewed.\n\nThe other is the day you take a life. Because murder demands the same precious attention to detail. One tiny oversight, one fragmentary detail left behind could lead to discovery. To ensure your marriage goes without a hitch, you hire a wedding planner. But who can you call to plan your murder? The answer is TIL DILLER.",
    hero: {
      src: "/project-images/something-blue.avif",
      alt: "Something Blue — hero still.",
    },
    credits: [],
    ogImage: "/project-images/something-blue.avif",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
