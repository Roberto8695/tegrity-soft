import {
  createSocialCardResponse,
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_SIZE,
} from "@/lib/social-card";

export const alt = SOCIAL_IMAGE_ALT;
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialCardResponse();
}
