import { toast } from "sonner";

export function useCopyToClipboard() {
  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    try {
      const res = await navigator.clipboard.writeText(text);
      return res;
    } catch (error) {
      console.warn(error);
      toast("something went wrong | connot copy");
      return false;
    }
  };

  return { copy };
}
