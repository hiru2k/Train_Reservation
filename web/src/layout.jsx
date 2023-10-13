import NavbarComponent from "./components/common/navbar";

export default function Layout({ children }) {
  return (
    <>
      <NavbarComponent />
      <main>{children}</main>
    </>
  );
}
