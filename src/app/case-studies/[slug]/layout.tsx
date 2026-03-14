export function generateStaticParams() {
  return [{ slug: "helping-small-business-transact" }];
}

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
