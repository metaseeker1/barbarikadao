// Minimal web shim for async-storage to satisfy MetaMask SDK
export default {
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
  clear: async () => {},
};