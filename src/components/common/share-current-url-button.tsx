import { toast } from "sonner";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Button } from "@ui/button";
import ShareIcon from "@icons/share-icon";

export default function ShareCurrentUrlBut() {
  const { copy } = useCopyToClipboard();

  const handleShare = () => {
    copy(window.location.href).then(() => toast("address copied"));
  };

  return (
    <Button
      onClick={handleShare}
      variant="contained"
      className="rounded-full w-10 h-10 bg-[var(--card)] text-[var(--card-foreground)]"
    >
      <ShareIcon />
    </Button>
  );
}
