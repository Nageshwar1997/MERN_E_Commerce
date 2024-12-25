export const navigationData = {
  categories: [
    {
      _id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          _id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", _id: "top", href: `{women/clothing/tops}` },
            { name: "Dresses", _id: "women_dress", href: "#" },
            { name: "Women Jeans", _id: "women_jeans" },
            { name: "Lengha Choli", _id: "lengha_choli" },
            { name: "Sweaters", _id: "sweater" },
            { name: "T-Shirts", _id: "t-shirt" },
            { name: "Jackets", _id: "jacket" },
            { name: "Gouns", _id: "gouns" },
            { name: "Sarees", _id: "saree" },
            { name: "Kurtas", _id: "kurtas" },
          ],
        },
        {
          _id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", _id: "watch" },
            { name: "Wallets", _id: "wallet" },
            { name: "Bags", _id: "bag" },
            { name: "Sunglasses", _id: "sunglasse" },
            { name: "Hats", _id: "hat" },
            { name: "Belts", _id: "belt" },
          ],
        },
        {
          _id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", _id: "#" },
            { name: "My Way", _id: "#" },
            { name: "Re-Arranged", _id: "#" },
            { name: "Counterfeit", _id: "#" },
            { name: "Significant Other", _id: "#" },
          ],
        },
      ],
    },
    {
      _id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          _id: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          _id: "#",
          imageSrc:
            "https://tailwindui.com/plus/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          _id: "clothing",
          name: "Clothing",
          items: [
            { name: "Mens Kurtas", _id: "mens_kurta" },
            { name: "Shirt", _id: "shirt" },
            { name: "Men Jeans", _id: "men_jeans" },
            { name: "Sweaters", _id: "#" },
            { name: "T-Shirts", _id: "t-shirt" },
            { name: "Jackets", _id: "#" },
            { name: "Activewear", _id: "#" },
          ],
        },
        {
          _id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", _id: "#" },
            { name: "Wallets", _id: "#" },
            { name: "Bags", _id: "#" },
            { name: "Sunglasses", _id: "#" },
            { name: "Hats", _id: "#" },
            { name: "Belts", _id: "#" },
          ],
        },
        {
          _id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", _id: "#" },
            { name: "Counterfeit", _id: "#" },
            { name: "Full Nelson", _id: "#" },
            { name: "My Way", _id: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { id: "company", name: "Company", href: "#" },
    { id: "stores", name: "Stores", href: "#" },
  ],
};
