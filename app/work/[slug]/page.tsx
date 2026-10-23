import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import NeedsContent from "@/components/NeedsContent";
import PhotoWall from "@/components/PhotoWall";
import BagichaPortfolio from "@/components/BagichaPortfolio";
import VideoWall, { type PortfolioAsset, type PortfolioVideo } from "@/components/VideoWall";
import Link from "next/link";
import Image from "next/image";

const projects = [
  { slug: "lakme", name: "Lakmē", category: "Ad Film", description: "Quick Commerce Digital Campaign for Lakme’s Sunscreen range" },
  { slug: "nissan", name: "Nissan x Lakshya", category: "Brand Film", description: "Digital Ads and Shoulder Content for Nissan Gravite" },
  { slug: "sparx", name: "Sparx x Raghu Rajiv", category: "Brand Campaign", description: "Celebrity campaigns, digital ads." },
  { slug: "bering", name: "Bering Watches", category: "Product Film", description: "Digital Ads, Model + Product Campaigns." },
  { slug: "afnan", name: "Sparx x Chunky Panday", category: "Brand Campaign", description: "Celebrity campaigns, digital ads." },
  { slug: "flite", name: "Flite x Ali Fazal & Sanya Malhotra", category: "Brand Campaign", description: "Celebrity campaigns, digital ads." },
  { slug: "nissan-gravite-launch", name: "Nissan Gravite Launch Event", category: "Event Coverage", description: "Full Event Coverage and live edits" },
  { slug: "bagicha-wilderness", name: "Bagicha Wilderness", category: "Property Photography & Video", description: "Interior, space, and property photos and videos" },
  { slug: "bhagat-tarachand", name: "B Bhagat Tarachand", category: "Property Photography & Video", description: "Interior, space, and property photos and videos" },
  { slug: "purple-finance", name: "Purple Finance", category: "Brand Film", description: "Corporate Documentaries/Brand Films for Purple Finance Limited" },
  { slug: "picnic-2026-by-district", name: "Picnic 2026 by District", category: "Event Coverage", description: "Full event coverage + Live edits for Picnic 2026 by District" },
  { slug: "armour-clothing", name: "Aramour Clothing", category: "Brand Campaign", description: "Brand Launch reels for Aramour Clothing" },
  { slug: "food-and-beverage", name: "Food & Beverage", category: "Food Photography", description: "F&B Photography for B Bhagat Tarachand and FinX Commune Cafe" },
  { slug: "motion-graphics", name: "Motion Graphics", category: "Digital Campaign", description: "Relaxo Website Launch Ad" },
  { slug: "sparx-product-launch", name: "Sparx Product Launch", category: "Product Launch", description: "Fashion/lifestyle reels for Sparx Footwear" },
];

export function generateStaticParams() {
  return [
    ...projects.map(({ slug }) => ({ slug })),
    { slug: "sparx-and-flite" },
    { slug: "property-and-interiors" },
  ];
}

const portfolioParents: Record<string, { href: string; label: string }> = {
  sparx: { href: "/work/sparx-and-flite", label: "Sparx & Flite" },
  afnan: { href: "/work/sparx-and-flite", label: "Sparx & Flite" },
  flite: { href: "/work/sparx-and-flite", label: "Sparx & Flite" },
  "bagicha-wilderness": {
    href: "/work/property-and-interiors",
    label: "Property and Interiors",
  },
  "bhagat-tarachand": {
    href: "/work/property-and-interiors",
    label: "Property and Interiors",
  },
};

const propertyProjects = [
  {
    slug: "bagicha-wilderness",
    name: "Bagicha Wilderness",
    image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/Bagicha.jpg",
    imageRatio: "aspect-[4/5] md:aspect-auto md:h-[420px]",
  },
  {
    slug: "bhagat-tarachand",
    name: "B Bhagat Tarachand",
    image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/btc.jpg",
    imageRatio: "aspect-[4/5] md:aspect-auto md:h-[420px]",
  },
];

const lakmePhotos = [
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Lakme%20Sun%20Expert/Lakme-tint-(model)1505.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Lakme%20Sun%20Expert/Lakme-Fluid(model)297%20copy.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Lakme%20Sun%20Expert/Lakme-tint-(model)1422.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Lakme%20Sun%20Expert/Lakme-Gel-(Model)788.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Lakme%20Sun%20Expert/Lakme-Lotion-(Model)683%20copy.jpg",
  "/work/lakme/24.webp",
  "/work/lakme/23.webp",
  "/work/lakme/20.webp",
  "/work/lakme/18.webp",
  "/work/lakme/17.webp",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Lakme%20Sun%20Expert/Lakme-Tint-(Model)1159.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Lakme%20Sun%20Expert/Lakme-Gel-(Model)821.jpg",
  "/work/lakme/16.webp",
  "/work/lakme/15.webp",
  "/work/lakme/14.webp",
  "/work/lakme/13.webp",
  "/work/lakme/12.webp",
  "/work/lakme/11.webp",
  "/work/lakme/10.webp",
  "/work/lakme/09.webp",
  "/work/lakme/08.webp",
  "/work/lakme/07.webp",
  "/work/lakme/04.webp",
  "/work/lakme/03.webp",
  "/work/lakme/02.webp",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Lakme%20Sun%20Expert/Lakme-tint-(product)1938%20copy.jpg",
];

const foodBeveragePhotos = [
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/2%20TOASTS.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/AMBIENCE%201.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/BAIGAN%20BHARTA%20PAIRED-2.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/BURGER%20FINAL.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/FALAFEL%20PLATTER.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/GAJAR%20HALWA.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/GRILLED%20CHEESE%202.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/ICED%20TEA%20POURING%20B%26W.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/Latte%201.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/MENU%20%2B%20CONDIMENTS.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/PASTRY%20FINAL.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/SAAG%201.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/SAAG%20PAIRED%20%2B%20CONDIMENTS.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/SAAG%20PAIRING%202.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/SALADS%206.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/Salads%201.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/Salads%203.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/TEA%20POURING.png",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/food%20and%20beverage%20/WINTER%20MENU.png",
];
const foodBeverageThumbnails = foodBeveragePhotos.map((_, index) =>
  `/work/food-and-beverage/${String(index + 1).padStart(2, "0")}.jpg`,
);

const bagichaPhotos = [
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bagicha%20Wilderness/DJI_20260616112745_0012_D.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bagicha%20Wilderness/DSC00565.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bagicha%20Wilderness/DSC00528.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bagicha%20Wilderness/DSC00538.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bagicha%20Wilderness/DSC01005.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bagicha%20Wilderness/DSC00986.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bagicha%20Wilderness/DSC00780.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bagicha%20Wilderness/DSC00677.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bagicha%20Wilderness/DSC00704.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bagicha%20Wilderness/DSC00752.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bagicha%20Wilderness/DSC00645.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bagicha%20Wilderness/DSC00918.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bagicha%20Wilderness/DSC00928.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bagicha%20Wilderness/DSC00657.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bagicha%20Wilderness/DSC00960.jpg",
];

const bagichaHeroVideo: PortfolioVideo = {
  title: "Hero",
  src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Alibaug%20Videos/HORIZONTAL%201.mp4",
  poster: "/work/posters/bagicha-hero.jpg",
};

const bagichaReels: PortfolioVideo[] = [
  {
    title: "Reel 1",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Alibaug%20Videos/RESYNC%201.mp4",
    poster: "/work/posters/bagicha-reel-1.jpg",
  },
  {
    title: "Reel 2",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Alibaug%20Videos/1st%20FLOOR.mp4",
    poster: "/work/posters/bagicha-reel-2.jpg",
  },
  {
    title: "Reel 3",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Alibaug%20Videos/FOOD%20REEL.mp4",
    poster: "/work/posters/bagicha-reel-3.jpg",
  },
];

const bhagatPhotos = [
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bhagat%20Tarachand/Combined/HERO%201.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bhagat%20Tarachand/Combined/Hero%202.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bhagat%20Tarachand/Combined/DAYLIGHT%20FACADE.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bhagat%20Tarachand/Combined/DAYLIGHT%20VINTAGE.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bhagat%20Tarachand/Combined/EXTRA%20B%26W.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bhagat%20Tarachand/Combined/SHA_1633-HDR-2.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bhagat%20Tarachand/Combined/NIGHT%20SEPIA.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bhagat%20Tarachand/Combined/any.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bhagat%20Tarachand/Combined/SHA_1163-HDR-2.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bhagat%20Tarachand/Combined/SHA_1170-HDR-2.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bhagat%20Tarachand/Combined/SHA_1177-HDR.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bhagat%20Tarachand/Combined/SHA_1470-HDR.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bhagat%20Tarachand/Combined/SHA_1499-HDR.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bhagat%20Tarachand/Combined/SHA_1505-HDR.jpg",
  "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Property%20%26%20Interiors/Bhagat%20Tarachand/Combined/SHA_1520-HDR.jpg",
];

const nissanVideos: PortfolioVideo[] = [
  {
    title: "Diwali",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20x%20Lakshya/DIWALI%20FINAL.mp4",
    poster: "/work/nissan/04.jpg",
  },
  {
    title: "Compilation",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20x%20Lakshya/COMPILATION%20FINAL%2015%20FEB.mp4",
    poster: "/work/nissan/05.jpg",
  },
  {
    title: "Sunset W Music",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20x%20Lakshya/SUNSET%20W%20MUSIC.mp4",
    poster: "/work/nissan/01.jpg",
  },
  {
    title: "Meeting Friends W Music",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20x%20Lakshya/MEETING%20FRIENDS%20W%20MUSIC.mp4",
    poster: "/work/nissan/03.jpg",
  },
  {
    title: "BTS Day 1",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20x%20Lakshya/BTS%20DAY%201.mp4",
    poster: "/work/nissan/06.jpg",
  },
  {
    title: "Onam Final",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20x%20Lakshya/ONAM%20FINAL.mp4",
    poster: "/work/nissan/02.jpg",
  },
];

const purpleFinanceVideos: PortfolioVideo[] = [
  {
    title: "About PFL",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Purple%20Finance/ABOUT%20PFL%20CHANGED%20FINAL.mp4",
    poster: "/work/posters/purple-finance.jpg",
  },
  {
    title: "Frontline Team",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Purple%20Finance/FRONTLINE%20TEAM.mp4",
    poster: "/work/posters/purple-finance-frontline.jpg",
  },
  {
    title: "Dipak Wagh",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Purple%20Finance/DIPAK%20WAGH%20CHANGED%20FINAL.mp4",
    poster: "/work/posters/purple-finance-dipak.jpg",
  },
  {
    title: "Employee Branding",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Purple%20Finance/EMPLOYEE%20BRANDING.mp4",
    poster: "/work/posters/purple-finance-employee.jpg",
  },
];

const picnicVideos: PortfolioVideo[] = [
  {
    title: "Aftermovie",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Picnic%202026%20by%20District/PTAT_AFTERMOVIE_3.mp4",
    poster: "/work/posters/picnic-district.jpg",
  },
  {
    title: "Picnic on the Day",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Picnic%202026%20by%20District/Ptat%20on%20day%20Reel%20final.mp4",
    poster: "/work/posters/picnic-district-reel-1.jpg",
  },
  {
    title: "Alcobev",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Picnic%202026%20by%20District/PTAT%20alcobev_3.mp4",
    poster: "/work/posters/picnic-district-reel-2.jpg",
  },
  {
    title: "DJ Reel",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Picnic%202026%20by%20District/PTAT%20dj%20reel.mp4",
    poster: "/work/posters/picnic-district-reel-3.jpg",
  },
];

const motionGraphicsVideos: PortfolioVideo[] = [
  {
    title: "Relaxo Website Launch Ad",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Motion%20Graphics/Relaxo%20New%20Website%20Launch-Final.mp4",
    poster: "/work/posters/motion-graphics.jpg",
  },
];

const sparxProductLaunchVideos: PortfolioVideo[] = [
  {
    title: "Sparx Product Launch",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx%20Product%20Launch/1.mp4",
    poster: "/work/posters/sparx-product-launch-1.jpg",
  },
  {
    title: "Sparx Launch Reel 2",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx%20Product%20Launch/2.mp4",
    poster: "/work/posters/sparx-product-launch-2.jpg",
  },
  {
    title: "Sparx Launch Reel 3",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx%20Product%20Launch/3.mp4",
    poster: "/work/posters/sparx-product-launch-3.jpg",
  },
  {
    title: "Sparx Launch Reel 4",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx%20Product%20Launch/4.mp4",
    poster: "/work/posters/sparx-product-launch-4.jpg",
  },
  {
    title: "Sparx Launch Reel 5",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx%20Product%20Launch/5.mp4",
    poster: "/work/posters/sparx-product-launch-5.jpg",
  },
  {
    title: "Sparx Launch Reel 6",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx%20Product%20Launch/6.mp4",
    poster: "/work/posters/sparx-product-launch-6.jpg",
  },
];

const armourVideos: PortfolioVideo[] = [
  {
    title: "Armour Reel",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Armour%20Clothing/ARAMOUR%20REEL.mp4",
    poster: "/work/posters/armour-clothing.jpg",
  },
  {
    title: "Armour Reel 2",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Armour%20Clothing/snapgram.io_f0ut23i5u3mk.mp4",
    poster: "/work/posters/armour-clothing-reel-1.jpg",
  },
  {
    title: "Armour Reel 3",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Armour%20Clothing/snapgram.io_90hedh0k4sss.mp4",
    poster: "/work/posters/armour-clothing-reel-2.jpg",
  },
  {
    title: "Armour Reel 4",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Armour%20Clothing/snapgram.io_3qcncfewo7qd.mp4",
    poster: "/work/posters/armour-clothing-reel-3.jpg",
  },
];

const sparxChunkyVideos: PortfolioVideo[] = [
  {
    title: "Apology",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx/Sparx%20x%20Chunky%20Pandey/Apology%20006.mp4",
  },
  {
    title: "GenZ Rev",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx/Sparx%20x%20Chunky%20Pandey/GenZ%20Rev%203.mp4",
  },
  {
    title: "BTS",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx/Sparx%20x%20Chunky%20Pandey/BTS%20FINAL%20opt1.mp4",
  },
  {
    title: "Jutsu",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx/Sparx%20x%20Chunky%20Pandey/Jutsu%202_1.mp4",
  },
];

const sparxRaghuVideos: PortfolioVideo[] = [
  {
    title: "Rapid Fire",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx/Sparx%20x%20Raghu%20Rajiv/Rapid%20Fire%20rev4.mp4",
  },
  {
    title: "Target Audience",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx/Sparx%20x%20Raghu%20Rajiv/TARGET%20AUDIENCE.mp4",
  },
  {
    title: "Shoe or Sanda",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx/Sparx%20x%20Raghu%20Rajiv/SHOE%20OR%20SANDA.mp4",
  },
  {
    title: "Sparx Recap",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx/Sparx%20x%20Raghu%20Rajiv/SPARX%20RECAP5.mp4",
  },
];

const fliteVideos: PortfolioVideo[] = [
  {
    title: "Teaser",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx/Flite%20x%20Ali%20Fazal%20%26%20Saniya%20Malhotra/Teaser.mp4",
  },
  {
    title: "Reveal",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx/Flite%20x%20Ali%20Fazal%20%26%20Saniya%20Malhotra/Reveal_9.mp4",
  },
  {
    title: "Reel 1",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx/Flite%20x%20Ali%20Fazal%20%26%20Saniya%20Malhotra/Reel%201.mp4",
  },
  {
    title: "Lights Camera Buckle",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx/Flite%20x%20Ali%20Fazal%20%26%20Saniya%20Malhotra/Lights%20Camera%20Buckle_7.mp4",
  },
  {
    title: "Diwali",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx/Flite%20x%20Ali%20Fazal%20%26%20Saniya%20Malhotra/Diwali-_2.mp4",
  },
  {
    title: "Eid",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx/Flite%20x%20Ali%20Fazal%20%26%20Saniya%20Malhotra/Eid-.mp4",
  },
  {
    title: "Reel 2 Happier",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Sparx/Flite%20x%20Ali%20Fazal%20%26%20Saniya%20Malhotra/Reel%202%20Happier.mp4",
  },
];

const nissanGraviteLaunchVideos: PortfolioVideo[] = [
  {
    title: "After Movie",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20Gravite%20Launch%20event/After%20Movie_1.mp4",
  },
  {
    title: "Udaipur",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20Gravite%20Launch%20event/Udaipur.mp4",
  },
  {
    title: "Entry",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20Gravite%20Launch%20event/Entry.mp4",
  },
  {
    title: "Montage",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20Gravite%20Launch%20event/Montage.mp4",
  },
  {
    title: "Mix 1",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20Gravite%20Launch%20event/Mix%201.mp4",
  },
  {
    title: "Mix 2",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Nissan%20Gravite%20Launch%20event/Mix%202.mp4",
  },
];

const beringAssets: PortfolioAsset[] = [
  {
    title: "Product 1",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/PRODUCT%201%20FINAL.mp4",
  },
  {
    title: "Video 2",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/VIDEO%202%20VERTICAL%20FINAL%20.mp4%20.mp4",
  },
  {
    title: "Video 4",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/VIDEO%204%20FINAL.mp4",
  },
  {
    title: "Video 5",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/VIDEO%205%20FINAL.mp4",
  },
  {
    type: "image",
    title: "Bering Watch 1",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/DSC00185A%20copy.jpg",
  },
  {
    type: "image",
    title: "Bering Watch 2",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/Copy%20of%20axadwsf_sgsg_254.jpg",
  },
  {
    type: "image",
    title: "Bering Watch 3",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/DSC00219.png",
  },
  {
    type: "image",
    title: "Bering Watch 4",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/DSC00370.png",
  },
  {
    title: "Male 2",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/MALE%202%20CHANGED.mp4",
  },
  {
    title: "Female 3",
    src: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/FEMALE%203%20FINAL.mp4",
  },
];

const photoWallLayouts = [
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[4/5]",
];

const sparxFliteProjects = [
  {
    slug: "flite",
    name: "Flite x Ali Fazal & Sanya Malhotra",
    image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/New%20Thumbnails/Ali%20%26%20Sanya.png",
    imageRatio: "aspect-[4/3] md:aspect-auto md:h-[340px]",
  },
  {
    slug: "sparx",
    name: "Sparx x Raghu Rajiv",
    image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/Screenshot%202026-10-15%20at%206.42.50%E2%80%AFPM.png",
    imageRatio: "aspect-[4/3] md:aspect-auto md:h-[340px]",
  },
  {
    slug: "afnan",
    name: "Sparx x Chunky Panday",
    image: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/Screenshot%202026-10-15%20at%206.46.33%E2%80%AFPM.png",
    imageRatio: "aspect-[4/3] md:aspect-auto md:h-[340px]",
  },
];

const portfolioVideoPosters: Record<string, string> = {
  flite: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/New%20Thumbnails/Ali%20%26%20Sanya.png",
  sparx: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/Screenshot%202026-10-15%20at%206.42.50%E2%80%AFPM.png",
  afnan: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/Screenshot%202026-10-15%20at%206.46.33%E2%80%AFPM.png",
  "nissan-gravite-launch": "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Thumbnails/6a8991bdcafcedc39a89628c_Nissan%20Gravite%20Image.webp",
  bering: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Bering%20Watches/DSC00219.png",
};

const localVideoPosters: Record<string, Array<string | undefined>> = {
  nissan: [
    "nissan-diwali.jpg",
    "nissan-compilation.jpg",
    "nissan-sunset.jpg",
    "nissan-meeting-friends.jpg",
    "nissan-bts-day-1.jpg",
    "nissan-onam.jpg",
  ].map((file) => `/work/posters/${file}`),
  afnan: [
    "sparx-chunky-apology.jpg",
    "sparx-chunky-genz-rev.jpg",
    "sparx-chunky-bts.jpg",
    "sparx-chunky-jutsu.jpg",
  ].map((file) => `/work/posters/${file}`),
  sparx: [
    "sparx-raghu-rapid-fire.jpg",
    "sparx-raghu-target-audience.jpg",
    "sparx-raghu-shoe-or-sanda.jpg",
    "sparx-raghu-recap.jpg",
  ].map((file) => `/work/posters/${file}`),
  flite: [
    "flite-teaser.jpg",
    "flite-reveal.jpg",
    "flite-reel-1.jpg",
    "flite-lights-camera-buckle.jpg",
    "flite-diwali.jpg",
    "flite-eid.jpg",
    "flite-reel-2-happier.jpg",
  ].map((file) => `/work/posters/${file}`),
  "nissan-gravite-launch": [
    "gravite-after-movie.jpg",
    "gravite-udaipur.jpg",
    "gravite-entry.jpg",
    "gravite-montage.jpg",
    "gravite-mix-1.jpg",
    "gravite-mix-2.jpg",
  ].map((file) => `/work/posters/${file}`),
  bering: [
    "bering-product-1.jpg",
    "bering-video-2.jpg",
    "bering-video-4.jpg",
    "bering-video-5.jpg",
    undefined,
    undefined,
    undefined,
    undefined,
    "bering-male-2.jpg",
    "bering-female-3.jpg",
  ].map((file) => file ? `/work/posters/${file}` : undefined),
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const isPropertyCollection = slug === "property-and-interiors";
  const isSparxFliteCollection = slug === "sparx-and-flite";
  const previousMenu = portfolioParents[slug];
  const photos = slug === "lakme"
    ? lakmePhotos
    : slug === "bagicha-wilderness"
      ? bagichaPhotos
      : slug === "bhagat-tarachand"
        ? bhagatPhotos
        : slug === "food-and-beverage"
          ? foodBeveragePhotos
        : null;
  const isNissanGraviteLaunch = slug === "nissan-gravite-launch";
  const isBering = slug === "bering";
  const isSparxChunky = slug === "afnan";
  const isSparxRaghu = slug === "sparx";
  const isFlite = slug === "flite";
  const isPurpleFinance = slug === "purple-finance";
  const isPicnic = slug === "picnic-2026-by-district";
  const isArmour = slug === "armour-clothing";
  const isMotionGraphics = slug === "motion-graphics";
  const isSparxProductLaunch = slug === "sparx-product-launch";
  const videos = slug === "nissan"
    ? nissanVideos
    : isNissanGraviteLaunch
      ? nissanGraviteLaunchVideos
      : isBering
        ? beringAssets
        : isPurpleFinance
          ? purpleFinanceVideos
        : isPicnic
          ? picnicVideos
        : isArmour
          ? armourVideos
        : isMotionGraphics
          ? motionGraphicsVideos
        : isSparxProductLaunch
          ? sparxProductLaunchVideos
        : isSparxChunky
          ? sparxChunkyVideos
          : isSparxRaghu
            ? sparxRaghuVideos
            : isFlite
              ? fliteVideos
            : null;
  const project = projects.find((p) => p.slug === slug) ?? projects[0];
  const videosWithPosters = videos?.map((asset, index) => (
    asset.type === "image"
      ? asset
      : { ...asset, poster: localVideoPosters[slug]?.[index] ?? asset.poster }
  ));

  return (
    <main className="min-h-screen bg-ink">
      <CustomCursor />
      <Navbar />

      <section className={`px-[5%] pt-40 pb-32 mx-auto ${isPropertyCollection ? "max-w-6xl" : isSparxFliteCollection ? "max-w-5xl" : photos ? "max-w-[1600px] px-[4%]" : videos ? "max-w-[1440px] px-[5%]" : "max-w-4xl"}`}>
        <Link href={previousMenu?.href ?? "/work"} className="inline-flex items-center gap-2 text-dim text-xs tracking-widest uppercase mb-10 hover:text-amber transition-colors">
          {previousMenu ? `← Back to ${previousMenu.label}` : "← Back to all work"}
        </Link>

        {isPropertyCollection || isSparxFliteCollection ? (
          <>
            <div className="font-mono text-xs tracking-[3px] uppercase text-amber mb-4">
              {isPropertyCollection ? "Property Photography & Video" : "Brand Campaign"}
            </div>
            <h1 className="font-display uppercase text-[clamp(36px,6vw,64px)] leading-[0.95] mb-16">
              {isPropertyCollection ? "Property and Interiors" : "Sparx & Flite"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
              {(isPropertyCollection ? propertyProjects : sparxFliteProjects).map((collectionProject, index) => (
                <Link
                  key={collectionProject.slug}
                  href={`/work/${collectionProject.slug}`}
                  className={`group block ${
                    isPropertyCollection
                      ? "md:col-span-6"
                      : ["md:col-span-5", "md:col-span-4", "md:col-span-3"][index]
                  }`}
                >
                  <div className={`relative mb-5 overflow-hidden ${isPropertyCollection ? "bg-transparent" : "bg-white/5"} ${collectionProject.imageRatio}`}>
                    <Image
                      src={collectionProject.image}
                      alt={collectionProject.name}
                      fill
                      sizes="(min-width: 768px) 45vw, 90vw"
                      className={`${isPropertyCollection ? "object-contain" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
                        isSparxFliteCollection && index === 0 ? "object-[center_55%]" : ""
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h2 className="w-fit text-paper text-xl sm:text-2xl font-semibold transition-colors duration-300 group-hover:text-amber">
                    {collectionProject.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-dim">
                    {isPropertyCollection ? "Interior, space, and property photos and videos" : "Celebrity campaigns, digital ads."}
                  </p>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="font-display uppercase text-[clamp(36px,6vw,64px)] leading-[0.95] mb-8">
              {project.slug === "lakme" ? "Lakmē Sun Expert" : project.name}
            </h1>
            <p className={`text-dim text-base max-w-lg ${photos || videos ? "mb-10" : "mb-16"}`}>{project.description}</p>

            {photos ? (
              slug === "bagicha-wilderness" ? (
                <BagichaPortfolio
                  photos={photos}
                  heroVideo={bagichaHeroVideo}
                  reels={bagichaReels}
                  label={project.name}
                />
              ) : (
                <PhotoWall
                  photos={photos}
                  thumbnails={slug === "food-and-beverage" ? foodBeverageThumbnails : undefined}
                  layouts={photoWallLayouts}
                  label={slug === "lakme" ? "Lakmē Sun Expert" : project.name}
                  rowGap={24}
                  instagramLinks={[
                    {
                      photo: "/work/lakme/14.webp",
                      href: "https://www.instagram.com/p/DeQ3qpfCIca/?img_index=2&vrfl=MWQ0ejF4d2U2bWk4",
                    },
                    {
                      photo: "/work/lakme/23.webp",
                      href: "https://www.instagram.com/p/DeJK6h9CLse/?img_index=3&psln=a3F0Z3hwbm92dG4y",
                    },
                    {
                      photo: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Lakme%20Sun%20Expert/Lakme-Fluid(model)297%20copy.jpg",
                      href: "https://www.instagram.com/p/DdN697vCL1f/?cplk=MTVyaG1scG1rZzBmYw==",
                    },
                    {
                      photo: "/work/lakme/04.webp",
                      href: "https://www.instagram.com/p/DdIxXFBiCdB/?img_index=3&dlrf=ZTJiODlhMW03MTEw",
                    },
                    {
                      photo: "/work/lakme/03.webp",
                      href: "https://www.instagram.com/p/DdGLzcYT-oG/?psln=cmx6dHU1Nmd1eGlq",
                    },
                    {
                      photo: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Lakme%20Sun%20Expert/Lakme-Tint-(Model)1159.jpg",
                      href: "https://www.instagram.com/p/DbF_LVilC5R/?srtk=ajhncGc0dzB3eDlm",
                    },
                    {
                      photo: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Lakme%20Sun%20Expert/Lakme-Gel-(Model)821.jpg",
                      href: "https://www.instagram.com/reel/DeLt_FJhN7l/?dlrf=MTU4MTM2ZzQwOTl6dQ==",
                    },
                    {
                      photo: "https://pub-bcc93bf2a87d49b686778d3ac2cfa837.r2.dev/Lakme%20Sun%20Expert/Lakme-tint-(product)1938%20copy.jpg",
                      href: "https://www.instagram.com/p/DeOS0yvlJo5/?xtok=MTVodHF4bmsxZmJnZg==",
                    },
                  ]}
                />
              )
            ) : videos ? (
              <div className={isSparxProductLaunch ? "mx-auto w-full max-w-[54rem]" : ""}>
                <VideoWall
                  videos={videosWithPosters ?? videos}
                  label={project.name}
                  defaultPoster={portfolioVideoPosters[slug]}
                  preloadVideos={isBering || isPurpleFinance || isPicnic || isArmour || isMotionGraphics || isSparxProductLaunch ? "none" : "metadata"}
                  layout={
                    isNissanGraviteLaunch
                      ? "launch-event"
                      : isBering
                        ? "mixed"
                        : isPurpleFinance || isPicnic
                          ? "landscape"
                        : isArmour
                          ? "portrait-centered-last"
                        : isMotionGraphics
                          ? "landscape-contained"
                        : isSparxChunky || isSparxRaghu || isFlite
                            ? "portrait-centered-last"
                          : "portrait"
                  }
                  hideCaptions
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
                <NeedsContent label={`CLIENT ASSET — ${project.name} full video/edit`} className="aspect-video lg:col-span-8" />
                <NeedsContent label={`CLIENT ASSET — ${project.name} photo 1`} className="aspect-[4/5] lg:col-span-4" />
                <NeedsContent label={`CLIENT ASSET — ${project.name} photo 2`} className="aspect-[4/5] lg:col-span-5" />
                <NeedsContent label={`CLIENT ASSET — ${project.name} photo 3`} className="aspect-[4/3] lg:col-span-7" />
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
