import useCart from "../hooks/useCart";

type PropsType = {
  viewCart: boolean;
};

const Footer = ({ viewCart }: PropsType) => {
  const { itemsToDisplay, priceToDisplay } = useCart();

  const year: number = new Date().getFullYear();

  const content = viewCart ? (
    <p>Shopping cart &copy; {year}</p>
  ) : (
    <>
      <p>Items: {itemsToDisplay}</p>
      <p>Cart price: {priceToDisplay}</p>
      <p>Cart &copy; {year}</p>
    </>
  );
  return <footer className="footer">{content}</footer>;
};

export default Footer;
