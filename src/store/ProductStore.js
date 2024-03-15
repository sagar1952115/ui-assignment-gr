// import { create } from "zustand";

// // Create a Zustand store
// const useProductStore = create((set) => ({
//   products: [],
//   paymentMethods: [],
//   totalAmount: 0,
//   setProducts: (products) => {
//     const totalAmount = products
//       .reduce((total, product) => total + product.price * product.quantity, 0)
//       .toFixed(3);
//     set({ products, totalAmount });
//   },
//   setPaymentMethods: (paymentMethods) => set({ paymentMethods }),
//   editQuantity: (productId, newQuantity) => {
//     set((state) => {
//       const updatedProducts = state.products.map((product) =>
//         product.id === productId
//           ? { ...product, quantity: newQuantity }
//           : product
//       );

//       const totalAmount = updatedProducts
//         .reduce((total, product) => total + product.price * product.quantity, 0)
//         .toFixed(3);

//       return {
//         products: updatedProducts,
//         totalAmount: totalAmount,
//       };
//     });
//   },
//   removeProduct: (productId) => {
//     set((state) => ({
//       products: state.products.filter((product) => product.id !== productId),
//       totalAmount: state.products.reduce(
//         (total, product) => total + product.price * product.quantity,
//         0
//       ),
//     }));
//   },
// }));

// useProductStore.subscribe(
//   (state) => {
//     sessionStorage.setItem("product", JSON.stringify(state));
//   }
//   // Specify which parts of the state to subscribe to
// );
// export default useProductStore;

import { create } from "zustand";

// Create a Zustand store
const useProductStore = create((set) => ({
  products: [],
  paymentMethods: [],
  totalAmount: 0,
  discount: 0, // Add discount field initialized to 0
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

      // Check if total amount is less than 100 and discount is applied
      if (totalAmount < 100 && updatedDiscount > 0) {
        updatedDiscount = 0; // Remove discount if total amount is less than 100
      }

      return {
        products: updatedProducts,
        totalAmount: totalAmount,
        discount: updatedDiscount, // Include discount in return object to keep it unchanged
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
      discount: state.discount, // Include discount in return object to keep it unchanged
    }));
  },
  setDiscount: (discount) => {
    set({ discount }); // Function to set discount
  },
}));

useProductStore.subscribe(
  (state) => {
    sessionStorage.setItem("product", JSON.stringify(state));
  }
  // Specify which parts of the state to subscribe to
);
export default useProductStore;
