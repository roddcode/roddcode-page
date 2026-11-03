import { ogImage } from "../render";

export const dynamic = "force-static";

export function GET() {
  return ogImage("en");
}
