import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <>
      <div className="border-b-2 border-gray-900 mt-1">
        <div className="container mx-auto pb-3 flex items-center justify-between">
          <h1 className="text-2xl">Dashboard</h1>
          <Link href="/dash/create">
            <div className="p-2 cursor-pointer -translate-y-1 duration-200 hover flex items-center justify-center rounded-md bg-midnightLight">
              Create new link
            </div>
          </Link>
        </div>
      </div>
      <div className="container mx-auto">{props.children}</div>
    </>
  );
};

export default DashboardLayout;
