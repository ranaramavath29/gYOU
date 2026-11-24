import type { MediaSource } from "@/components/ui/MediaFrame";

/*
 * Photos and videos supplied by gYOU (files in public/media). Each is used once
 * or twice where it supports the copy; see docs/BUILD_PROMPT.md → Media.
 * Not used: the "Brand without digital marketing" car poster (its baked-in
 * headline has a grammar error) and the city billboard (another brand's ad).
 */
/** Alt text describes what is shown. */
export const media = {
  studioShoot: {
    kind: "video",
    src: "/media/video/studio-shoot.mp4",
    poster: "/media/video/studio-shoot-poster.webp",
    label: "Behind the scenes on a shoot: a camera tethered to a laptop",
    ambient: true,
  },
  websiteDevices: {
    kind: "image",
    src: "/media/responsive-website-devices.webp",
    alt: "A responsive website shown on a laptop, tablet and phone",
    position: "38% 50%",
  },
  mobileSearch: {
    kind: "image",
    src: "/media/mobile-search.webp",
    alt: "Hands typing a search on a smartphone",
  },
  hourglass: {
    kind: "image",
    src: "/media/hourglass-growth.webp",
    alt: "An hourglass whose sand forms a rising bar chart, next to the words: Right marketing turns time into growth",
  },
  lightbulb: {
    kind: "image",
    src: "/media/idea-lightbulb.webp",
    alt: "A hand holding up a light bulb against a soft pink and blue sky",
  },
  peopleWalking: {
    kind: "image",
    src: "/media/people-walking-colour-wall.webp",
    alt: "Two professionals walking past a colourful wall",
    position: "50% 40%",
  },
  marketingTeam: {
    kind: "image",
    src: "/media/marketing-team-silhouettes.webp",
    alt: "The word marketing in cut-out letters over a team meeting in silhouette",
  },
  socialMediaStill: {
    kind: "image",
    src: "/media/video/social-media-poster.webp",
    alt: "Social media icons scattered across a light background",
  },
  socialMedia: {
    kind: "video",
    src: "/media/video/social-media-icons.mp4",
    poster: "/media/video/social-media-poster.webp",
    label: "Social media icons floating across the screen",
    ambient: true,
  },
} as const satisfies Record<string, MediaSource>;

/*
 * Industry photos for /industries. Source: Unsplash, free Unsplash Licence
 * (commercial use, no attribution required). Downloaded Nov 2026 and given one
 * shared warm colour grade so the set feels like a single shoot.
 * Original pages are listed so the licence can be re-checked.
 */
export const industryMedia = {
  // unsplash.com/photos/LUr7-nqB_r8
  "real-estate-infrastructure": {
    kind: "image",
    src: "/media/industries/real-estate-v2.webp",
    alt: "A tall residential tower rising above green trees on the city edge",
    position: "28% 50%",
  },
  // unsplash.com/photos/6qN9yEK5k9U
  "healthcare-wellness": {
    kind: "image",
    src: "/media/industries/healthcare-v2.webp",
    alt: "A doctor showing a patient a medical scan on a tablet",
    position: "82% 50%",
  },
  // unsplash.com/photos/zFSo6bnZJTw
  "education-training": {
    kind: "image",
    src: "/media/industries/education-v2.webp",
    alt: "Students in a classroom listening to a teacher",
  },
  // unsplash.com/photos/p3HTBsUIQQk
  "fintech-financial-services": {
    kind: "image",
    src: "/media/industries/fintech-v2.webp",
    alt: "A customer paying by tapping a phone at a shop counter",
    position: "60% 50%",
  },
  // unsplash.com/photos/k63Or81F8-M
  "ecommerce-retail": {
    kind: "image",
    src: "/media/industries/ecommerce-v2.webp",
    alt: "A seller checking an order package with a phone, beside a laptop and boxes",
  },
  // unsplash.com/photos/cW4lLTavU80
  "technology-saas": {
    kind: "image",
    src: "/media/industries/technology-v2.webp",
    alt: "A team meeting around a table in a bright, modern office",
    position: "72% 50%",
  },
  // unsplash.com/photos/b5Ju3_mjcJI
  "hospitality-lifestyle": {
    kind: "image",
    src: "/media/industries/hospitality-v2.webp",
    alt: "A heritage-style restaurant with arched windows and set tables",
  },
} as const satisfies Record<string, MediaSource>;
