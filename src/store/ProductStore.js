import { create } from "zustand";

const useProductStore = create((set) => ({
  products: [],
  paymentMethods: [],
  totalAmount: 0,
  discount: 0,
  setProducts: (products) => {
    const totalAmount = products
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(3);
    set({ products, totalAmount });
  },
  setPaymentMethods: (paymentMethods) => set({ paymentMethods }),
  editQuantity: (productId, newQuantity) => {
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      );

      const totalAmount = updatedProducts
        .reduce((total, product) => total + product.price * product.quantity, 0)
        .toFixed(3);

      let updatedDiscount = state.discount;

      if (totalAmount < 100 && updatedDiscount > 0) {
        updatedDiscount = 0;
      }

      return {
        products: updatedProducts,
        totalAmount: totalAmount,
        discount: updatedDiscount,
      };
    });
  },
  removeProduct: (productId) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
      totalAmount: state.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      ),
      discount: state.discount,
    }));
  },
  setDiscount: (discount) => {
    set({ discount });
  },
}));

useProductStore.subscribe((state) => {
  sessionStorage.setItem("product", JSON.stringify(state));
});
export default useProductStore;
