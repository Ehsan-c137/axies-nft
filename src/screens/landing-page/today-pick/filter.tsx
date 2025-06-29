import { Button } from "@ui/button";

export default function Filter() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="outline" className="hidden md:flex">
          Category
        </Button>
        <Button variant="outline" className="md:hidden">
          Category
        </Button>
        <Button variant="outline" className="md:hidden">
          Category
        </Button>
      </div>
      <Button variant="outline">SORT</Button>
    </div>
  );
}
