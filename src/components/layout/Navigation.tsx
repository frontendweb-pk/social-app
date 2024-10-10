import NavItem from "./NavItem";

export default function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavItem href="/">Home</NavItem>
        </li>
        <li>
          <NavItem href="/post">Post</NavItem>
        </li>
      </ul>
    </nav>
  );
}
