import { PrimaryLayout } from "@/layout/primary-layout";
import { PageLayout } from "@/layout/page-layout";
import NotFoundContainer from "@/components/common/errors/404";

export const metadata = {
  title: "404 Page Not Found!",
};

export default function NotFound() {
  return (
    <PrimaryLayout>
      <PageLayout>
        <NotFoundContainer />
      </PageLayout>
    </PrimaryLayout>
  );
}
