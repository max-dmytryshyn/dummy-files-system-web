type VirtualElement = {
  getBoundingClientRect: () => DOMRect;
  contextElement?: Element;
};

export default VirtualElement;
