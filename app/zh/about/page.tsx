import AboutExperience from "./AboutExperience";
import { chineseMetadata } from "../metadata";

export const metadata = chineseMetadata("/about");

export default function ChineseAboutPage() {
  return <AboutExperience />;
}
