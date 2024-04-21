import SidebarWrapper from "@/components/shared/sidebar/SidebarWrapper";

type Props = React.PropsWithChildren<{}>;

export default function Layout({ children }: Props) {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}
