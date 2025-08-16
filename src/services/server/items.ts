import { logger } from "@/utils/logger";

const URL =
  "https://raw.githubusercontent.com/Ehsan-c137/axies-nft/main/src/mocks/items.json";

export async function getItemDetail(slug: string) {
  try {
    const response = await fetch(URL);
    const allProducts = await response.json();

    const itemDetail = allProducts.find(
      (item: { slug: string }) => item.slug === slug,
    );

    return itemDetail;
  } catch (error) {
    logger.log(error);
    return null;
  }
}

export async function getAllItems() {
  try {
    const response = await fetch(URL);
    return response.json();
  } catch (error) {
    logger.log(error);
    return null;
  }
}
