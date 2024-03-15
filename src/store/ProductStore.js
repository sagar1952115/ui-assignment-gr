import { create } from "zustand";

// Create a Zustand store
const useProductStore = create((set) => ({
  products: [],
  paymentMethods: [],
  totalAmount: 0,
  setProducts: (products) => {
    const totalAmount = products
      .reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(3);
    set({ products, totalAmount });
  },
  setPaymentMethods: (paymentMethods) => set({ paymentMethods }),
  editQuantity: (productId, newQuantity) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? { ...product, quantity: newQuantity }
          : product
      ),
      totalAmount: state.products
        .reduce((total, product) => total + product.price * product.quantity, 0)
        .toFixed(3),
    }));
  },
  removeProduct: (productId) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
      totalAmount: state.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      ),
    }));
  },
}));

useProductStore.subscribe(
  (state) => {
    sessionStorage.setItem("product", JSON.stringify(state));
  }
  // Specify which parts of the state to subscribe to
);
export default useProductStore;
