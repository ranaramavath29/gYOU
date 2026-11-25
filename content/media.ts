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
  /** Still frame of the social video (kept for places that need a static image). */
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
 * Industry photos for /industries and the homepage industries grid.
 * v3 images (25 Nov 2026) were supplied by gYOU and chosen per sector; their
 * source and licence are NOT recorded here yet. Confirm each is licensed for
 * commercial web use before launch (healthcare and fintech look like stock
 * previews at 612px and should be replaced with full-size licensed files).
 * Hospitality v3 (25 Nov 2026) is also supplied by gYOU.
 */
export const industryMedia = {
  // Supplied by gYOU, Nov 2026. Licence to confirm.
  "real-estate-infrastructure": {
    kind: "image",
    src: "/media/industries/real-estate-v3.webp",
    alt: "Modern glass office and residential towers against a clear blue sky",
    position: "72% 50%",
  },
  // Supplied by gYOU, Nov 2026. Licence to confirm. Low resolution (612px).
  "healthcare-wellness": {
    kind: "image",
    src: "/media/industries/healthcare-v3.webp",
    alt: "A woman meditating in a yoga pose outdoors among green plants",
    position: "68% 50%",
  },
  // Supplied by gYOU, Nov 2026. Licence to confirm.
  "education-training": {
    kind: "image",
    src: "/media/industries/education-v3.webp",
    alt: "Smiling students at their desks listening to a teacher in a bright classroom",
    position: "60% 50%",
  },
  // Supplied by gYOU, Nov 2026. Licence to confirm. Low resolution (612px).
  "fintech-financial-services": {
    kind: "image",
    src: "/media/industries/fintech-v3.webp",
    alt: "A hand selecting a glowing fintech tile among digital banking icons",
    position: "62% 50%",
  },
  // Supplied by gYOU, Nov 2026. Licence to confirm.
  "ecommerce-retail": {
    kind: "image",
    src: "/media/industries/ecommerce-v3.webp",
    alt: "A shopping bag with a sale tag beside a small cart of beauty products",
    position: "56% 50%",
  },
  // Supplied by gYOU, Nov 2026. Licence to confirm.
  "technology-saas": {
    kind: "image",
    src: "/media/industries/technology-v3.webp",
    alt: "A team talking at their desks in an open-plan tech office, code on a laptop screen",
    position: "80% 50%",
  },
  // Supplied by gYOU, Nov 2026. Licence to confirm. Cropped (blurred foreground
  // rail trimmed), lightly sharpened and warmed.
  "hospitality-lifestyle": {
    kind: "image",
    src: "/media/industries/hospitality-v3.webp",
    alt: "Smiling guests at a restaurant chef's counter while chefs plate dishes",
    position: "15% 50%",
  },
} as const satisfies Record<string, MediaSource>;
