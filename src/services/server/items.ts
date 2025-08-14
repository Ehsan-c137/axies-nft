import { BASE_URL } from "../config";
import { logger } from "@/utils/logger";

export async function getItemDetail(slug: string) {
  try {
    const response = await fetch(`${BASE_URL}/items/${slug}`);
    return response.json();
  } catch (error) {
    logger.log(error);
    return null;
  }
}
