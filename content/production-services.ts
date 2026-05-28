export type ProductionService = {
  id: string;
  image: { src: string; alt: string; width: number; height: number };
};

export const productionServicesIntro = {
  title: "PRODUCTION SERVICES",
  body: "0UTLYER offers a full vendor post-production service, encompassing sound and picture, as well as a state-of-the-art animation division which is also available for external hire. In line with our mission, our creative teams showcase talents from the 0utlyer community. As productions seek to be more equitable, working with our service providers can help productions meet their inclusion targets.",
};

export const productionServicesCta =
  "Reach out for a quote or to discuss your project with our team.";

export const productionServices: ProductionService[] = [
  {
    id: "outloud",
    image: {
      src: "/production-images/0utLoud.png",
      alt: "0utLoud production service.",
      width: 1536,
      height: 1024,
    },
  },
  {
    id: "outsell",
    image: {
      src: "/production-images/0utSell.png",
      alt: "0utSell production service.",
      width: 1536,
      height: 1024,
    },
  },
  {
    id: "outgun",
    image: {
      src: "/production-images/0utGun.png",
      alt: "0utGun production service.",
      width: 1536,
      height: 1024,
    },
  },
  {
    id: "outrageous",
    image: {
      src: "/production-images/0utRageous.png",
      alt: "0utRageous production service.",
      width: 1692,
      height: 929,
    },
  },
];
