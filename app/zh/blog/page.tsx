import BlogExperience from "./BlogExperience";
import { chineseMetadata } from "../metadata";

export const metadata = chineseMetadata("/blog");

export default function ChineseBlogPage() {
  return <BlogExperience />;
}
