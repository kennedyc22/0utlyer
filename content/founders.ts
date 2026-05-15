export type Founder = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: { src: string; alt: string };
  link?: { label: string; href: string };
};

export const founders: Founder[] = [
  {
    slug: "emmanuel-kelly",
    name: "Emmanuel Kelly",
    role: "CVO & Co-Founder",
    bio: "A globally recognised icon in the entertainment space, Emmanuel broke new ground as the first differently-abled artist to perform on a stadium tour.",
    photo: {
      src: "/images/founders/emmanuel-kelly.jpg",
      alt: "Portrait of Emmanuel Kelly, CVO and Co-Founder of Outlyer.",
    },
    link: { label: "emmanuelkelly.com", href: "https://emmanuelkelly.com" },
  },
  {
    slug: "joanne-reay",
    name: "Joanne Reay",
    role: "CEO & Co-Founder",
    bio: "With over twenty-five years' experience in film and television, Joanne has headed up divisions in the BBC, Red Bull Media and The Discovery Channel.",
    photo: {
      src: "/images/founders/joanne-reay.jpg",
      alt: "Portrait of Joanne Reay, CEO and Co-Founder of Outlyer.",
    },
  },
  {
    slug: "lauren-hutton",
    name: "Lauren Hutton",
    role: "CCO & Founding Partner",
    bio: 'Lauren began her career in private investment markets, facilitating the funding of Hollywood blockbusters "Rush" and "Priceless." She was previously head of development for Brilliant Pictures, where she developed projects such as the survival thriller "Deep Fear" and Bille August\'s post-WWII coming-of-age drama "Me, You."',
    photo: {
      src: "/images/founders/lauren-hutton.jpg",
      alt: "Portrait of Lauren Hutton, CCO and Founding Partner of Outlyer.",
    },
  },
  {
    slug: "chris-martin",
    name: "Chris Martin",
    role: "Honorary Founder & President",
    bio: "",
    photo: {
      src: "/images/founders/chris-martin.jpg",
      alt: "Portrait of Chris Martin, Honorary Founder and President of Outlyer.",
    },
  },
];
