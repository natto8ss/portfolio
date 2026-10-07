const navigation = [
  { href: '#area02', label: 'ABOUT' },
  { href: '#area03', label: 'SKILL' },
  { href: '#area04', label: 'WORKS' },
  { href: '#area05', label: 'CONTACT' },
];

export function Header() {
  return (
    <header>
      <nav aria-label="メインナビゲーション">
        <ul id="nav">
          {navigation.map(item => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}
        </ul>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <p><small>Copyright &copy; {new Date().getFullYear()} YAMAMOTO ERINA. <br className="sp_br" />All Right Reserved.</small></p>
    </footer>
  );
}
