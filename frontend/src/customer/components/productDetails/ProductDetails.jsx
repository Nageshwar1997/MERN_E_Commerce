import { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
import ProductReviewCard from "./ProductReviewCard";
import { mens_kurtas } from "../../../data/mens/kurtas";
import HomeSectionCarouselCard from "../homeSectionCarouselCard/HomeSectionCarouselCard";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../state/product/action";
import { addItemToCart } from "../../../state/cart/action";

const dummyProduct = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const product = useSelector((store) => store.products?.product?.product);
  console.log("product", product);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]?.name || "S");

  console.log("selectedSize", selectedSize);
  const handleAddToCart = () => {
    const data = { productId: params.productId, size: selectedSize };
    dispatch(addItemToCart(data));
    navigate("/cart");
  };

  useEffect(() => {
    dispatch(findProductById(params.productId));
  }, [params.productId]);

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {dummyProduct.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900 hover:text-indigo-600 transition duration-200"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={pathname}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600 transition duration-200"
              >
                {product?.title}
              </a>
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem] shadow-lg transition-transform transform hover:scale-105">
              <img
                alt={product?.title}
                src={product?.imageUrl}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-wrap space-x-5 justify-center mt-4">
              {new Array(5).fill(product?.imageUrl).map((imgUrl, i) => (
                <div
                  key={i}
                  className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] shadow-sm transition-transform transform hover:scale-105"
                >
                  <img
                    alt={"image.alt"}
                    src={imgUrl}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Product info */}
          <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl font-semibold uppercase text-gray-900">
                {product?.brand}
              </h1>
              <h2 className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1 capitalize">
                {product?.title}
              </h2>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6">
                <p className="font-semibold">₹{product?.discountedPrice}</p>
                <p className="font-semibold line-through opacity-50">
                  ₹{product?.price}
                </p>
                <p className="text-green-600 font-semibold">
                  {product?.discountPercent}% OFF
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating name="read-only" value={5.5} readOnly />
                  <p className="opacity-50 text-sm">56540 Ratings</p>
                  <p className="text-sm ml-3 font-medium text-indigo-600 hover:text-indigo-500 transition duration-200">
                    3870 Reviews
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                <div className="mt-10">
  <div className="flex items-center justify-between">
    <h3 className="text-sm font-medium text-gray-900">Size</h3>
  </div>

  <fieldset aria-label="Choose a size" className="mt-4">
    <RadioGroup
      value={selectedSize}
      onChange={setSelectedSize} // No need for e.target.value, directly update state
      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
    >
      {product?.sizes?.map((size) => (
        <RadioGroup.Option
          key={size.name}
          value={size.name}
          disabled={!size.quantity}
          className={({ active, checked }) =>
            classNames(
              size.quantity > 0
                ? "cursor-pointer bg-white text-gray-900 shadow-sm hover:bg-gray-50 transition duration-200"
                : "cursor-not-allowed bg-gray-50 text-gray-200",
              active ? "ring-2 ring-indigo-500" : "",
              checked ? "border-indigo-500" : "border-gray-400",
              "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase focus:outline-none sm:flex-1 sm:py-6"
            )
          }
        >
          <span>{size.name}</span>

          {size.quantity > 0 ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-focus:border-indigo-500 group-checked:border-indigo-500"
            />
          ) : (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-400"
            >
              <svg
                stroke="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full stroke-2 text-gray-400"
              >
                <line
                  x1={0}
                  x2={100}
                  y1={100}
                  y2={0}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </span>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  </fieldset>
</div>


                <Button
                  onClick={handleAddToCart}
                  variant="contained"
                  sx={{
                    px: "2rem",
                    py: "1rem",
                    my: "1rem",
                    bgcolor: "#9155fd",
                    "&:hover": { bgcolor: "#7a42f5" },
                  }}
                  type="submit"
                >
                  Add To Cart
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>
                <div className="mt-4">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    {dummyProduct.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">
                    {dummyProduct.details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Rating & Reviews */}
        <section>
          <h1 className="font-semibold text-lg pb-4">
            Recent Reviews & Ratings
          </h1>
          <div className="border p-5">
            <Grid container spacing={7}>
              <Grid item xs={12} md={7}>
                <h2 className="text-lg font-semibold pb-1 mb-4">Reviews</h2>
                <div className="space-y-5">
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <ProductReviewCard key={index} />
                    ))}
                </div>
              </Grid>
              <Grid item xs={12} md={5}>
                <h2 className="text-lg font-semibold pb-1 mb-4">Ratings</h2>
                <div className="flex items-center space-x-3 mb-4">
                  <Rating readOnly value={4.6} precision={0.5} />
                  <p className="opacity-60">594,890 Ratings</p>
                </div>
                <Box className="mt-5 space-y-0.5">
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2.5}>
                      <p>Excellent</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={50}
                        color="success"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2.5}>
                      <p className="min-w-40">Very Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{
                          bgcolor: "#d0d0d0",
                          borderRadius: 4,
                          height: 7,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "#29bc2c",
                          },
                        }}
                        variant="determinate"
                        value={40}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2.5}>
                      <p>Good</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{
                          bgcolor: "#d0d0d0",
                          borderRadius: 4,
                          height: 7,
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "#ea9e06",
                          },
                        }}
                        variant="determinate"
                        value={30}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2.5}>
                      <p>Average</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={20}
                        color="warning"
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2.5}>
                      <p>Poor</p>
                    </Grid>
                    <Grid item xs={7}>
                      <LinearProgress
                        sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }}
                        variant="determinate"
                        value={10}
                        color="error"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </section>

        {/* Similar Products */}
        <section className="py-10">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
            Similar Products:
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mens_kurtas.slice(0, 20).map((item, index) => (
              <HomeSectionCarouselCard key={index} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
