// __test__/components/CartComponents.test.tsx
import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Importaciones de los componentes
import CartButton from "../../src/components/CartComponents/CartButton";
import CartItems from "../../src/components/CartComponents/CartItems";
import CartFooter from "../../src/components/CartComponents/CartFooter";
import { CartContextType, GroupedCartItem } from "../../src/Types/types";
import * as cartContext from "../../src/utils/cartContext";

// Mock de los hooks y contexto
const mockCartContext: CartContextType = {
   cartItems: [],
   addToCart: vi.fn(),
   removeItem: vi.fn(),
   cartCount: 3,
   isLoading: false,
};

// Mock del hook useCart
vi.mock("../../src/utils/cartContext", () => ({
   useCart: () => mockCartContext,
}));

// Mock de next/image
vi.mock("next/image", () => ({
   default: ({ src, alt }: { src: string; alt: string }) => (
      <div data-testid='mock-image' role='img' aria-label={alt}>
         {src}
      </div>
   ),
}));

// Mock de next/link
vi.mock("next/link", () => ({
   default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

const mockCartItems: GroupedCartItem[] = [
   {
      id: "1",
      brand: "Apple",
      name: "iPhone 12",
      image: "/mock-image.jpg",
      selectedStorage: "128GB",
      selectedColor: "Black",
      basePrice: 799,
      amount: 1,
      totalItem: 799,
   },
   {
      id: "2",
      brand: "Samsung",
      name: "Galaxy S21",
      image: "/mock-image-2.jpg",
      selectedStorage: "256GB",
      selectedColor: "Blue",
      basePrice: 899,
      amount: 2,
      totalItem: 1798,
   },
];

describe("CartButton", () => {
   beforeEach(() => {
      cleanup();
   });

   it("muestra el contador cuando hay items", () => {
      const { container } = render(<CartButton />);
      const counter = container.querySelector(".text-sm");
      expect(counter?.textContent).toBe("3");
   });

   it("no muestra el contador cuando está vacío", () => {
      const emptyContext = { ...mockCartContext, cartCount: 0 };
      vi.spyOn(cartContext, "useCart").mockImplementation(() => emptyContext);
      const { container } = render(<CartButton />);
      const counter = container.querySelector(".text-sm");
      expect(counter).toBeNull();
   });
});

describe("CartItems", () => {
   const onRemoveMock = vi.fn();

   beforeEach(() => {
      cleanup();
      onRemoveMock.mockClear();
   });

   it("renderiza correctamente los items del carrito", () => {
      const { container } = render(<CartItems items={mockCartItems} onRemove={onRemoveMock} />);

      const items = container.querySelectorAll("h2");
      expect(items[0]?.textContent?.trim()).toBe(`Apple iPhone 12`);
      expect(items[1]?.textContent?.trim()).toBe(`Samsung Galaxy S21`);
   });

   it("llama a onRemove con los parámetros correctos", async () => {
      const user = userEvent.setup();
      const { container } = render(<CartItems items={mockCartItems} onRemove={onRemoveMock} />);

      const removeButtons = container.querySelectorAll("button");
      await user.click(removeButtons[0]);

      expect(onRemoveMock).toHaveBeenCalledWith("1", "128GB", "Black");
   });

   it("muestra el precio total por item correctamente", () => {
      const { container } = render(<CartItems items={mockCartItems} onRemove={onRemoveMock} />);

      const priceElements = container.querySelectorAll("p.text-sm");
      const firstItemPrice = Array.from(priceElements).find((el) => el.textContent?.includes("799 € x 1 = 799€"));
      const secondItemPrice = Array.from(priceElements).find((el) => el.textContent?.includes("899 € x 2 = 1798€"));

      expect(firstItemPrice).toBeDefined();
      expect(secondItemPrice).toBeDefined();
   });
});

describe("CartFooter", () => {
   beforeEach(() => {
      cleanup();
   });

   it("muestra el total correctamente", () => {
      const { container } = render(<CartFooter total={2597} />);

      const totalElements = container.querySelectorAll(".md\\:font-semibold");
      const totalPrice = Array.from(totalElements).find((el) => el.textContent?.includes("2597.00 EUR"));

      expect(totalPrice).toBeDefined();
   });

   it("tiene los enlaces correctos", () => {
      const { container } = render(<CartFooter total={2597} />);

      const links = container.querySelectorAll("a");
      expect(links[0].getAttribute("href")).toBe("/");
   });

   it("tiene el botón de pagar", () => {
      const { container } = render(<CartFooter total={2597} />);

      const payButton = container.querySelector("button");
      expect(payButton?.textContent?.trim()).toBe("PAGAR");
   });
});
