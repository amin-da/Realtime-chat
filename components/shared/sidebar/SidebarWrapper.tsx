import DesktopNav from "./nav/DesktopNav";
import MobileNav from "./nav/MobileNav";

type Props = React.PropsWithChildren<{}>;

const SidebarWrapper = ({ children }: Props) => {
  return (
    <div className="h-full w-full p-4 flex flex-col lg:flex-row gap-4">
      <DesktopNav />
      <MobileNav />
      <main className="lg:h-full w-full h-[calc(100%-80px)] flex gap-4">
        {children}
      </main>
    </div>
  );
};

export default SidebarWrapper;
