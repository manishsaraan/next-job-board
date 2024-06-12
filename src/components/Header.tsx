type HeaderProp = {
  children: React.ReactNode;
};
export default function Header({ children }: HeaderProp) {
  return <header className="header">{children}</header>;
}

export function HeaderTop({ children }: { children: React.ReactNode }) {
  return <div className="header__top">{children}</div>;
}
