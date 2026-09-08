import type { Metadata } from "next";
import AboutExperience from "./AboutExperience";

export const metadata: Metadata = {
  title: "About Marrant | Leather Bag Manufacturing Partner",
  description: "Meet Marrant, a transparent OEM / ODM leather bag manufacturing partner for global brands."
};

export default function AboutPage() {
  return <AboutExperience />;
}
