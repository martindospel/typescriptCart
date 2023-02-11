import Header from "../components/Header";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import ItemsList from "../components/ItemList";
import { useState } from "react";

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false);
  const pageContent = viewCart ? <Cart /> : <ItemsList />;

  const content = (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {pageContent}
      {/* <Footer viewCart={viewCart} /> */}
    </>
  );

  return content;
}

export default App;
