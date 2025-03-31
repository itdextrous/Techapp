import { pixelSizeHorizontal } from "./customStyles";

const renderersProps:any = {
    ul: {
      style: {
        paddingLeft: pixelSizeHorizontal(10), // Adjust the padding for list items
      },
    },
    'ul[circle]': {
      style: {
        paddingLeft: pixelSizeHorizontal(10), // Adjust the padding for circle list items
      },
    },
  };

  export default renderersProps;