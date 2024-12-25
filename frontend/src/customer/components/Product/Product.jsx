/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Dialog, Disclosure, Menu } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import ProductCard from "./ProductCard";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Pagination,
  Radio,
  RadioGroup,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { filters, singleFilter } from "./filtersData";
import sortOptions from "./sortData";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../../state/product/action";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Product() {
  const { search } = useLocation();

  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products.products);

  console.log("products", products);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const decodedQueryString = decodeURIComponent(search);
  const searchParams = new URLSearchParams(decodedQueryString);

  const colorValue = searchParams.get("color");
  const sizesValue = searchParams.get("sizes"); // If it's not working try sizesValue = searchParams.get("sizes");
  const priceValue = searchParams.get("price");
  const discountValue = searchParams.get("discount");
  const sortValue = searchParams.get("sort"); // sort is not working currently
  const pageNumberValue = searchParams.get("page");
  const stockValue = searchParams.get("stock");
  const handleCheckboxFilterChange = (value, sectionId) => {
    const searchParams = new URLSearchParams(search);
    let filterValue = searchParams.getAll(sectionId);

    if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
      filterValue = filterValue[0].split(",").filter((item) => item !== value);
      if (filterValue.length === 0) {
        searchParams.delete(sectionId);
      }
    } else {
      filterValue = [...filterValue, value];
    }
    if (filterValue.length > 0) {
      searchParams.set(sectionId, filterValue.join(","));
    }
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handlePaginationChange = (e, value) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", value);

    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    const [minPrice, maxPrice] =
      priceValue === null ? [0, 10000] : priceValue.split("-").map(Number);

    const data = {
      category: param.levelThree,
      color: colorValue || [],
      sizes: sizesValue || [],
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 0,
      minDiscount: discountValue || 0,
      sort: sortValue || "price_low_to_high",
      pageNumber: pageNumberValue || 1,
      stock: stockValue,
      pageSize: 12,
    };

    dispatch(findProducts(data));

    // console.log("param.levelOne", param.levelOne);
    // console.log("param.levelTwo", param.levelTwo);
    // console.log("param.levelThree", param.levelThree);
  }, [
    param.levelThree,
    colorValue,
    sizesValue,
    priceValue,
    discountValue,
    sortValue,
    pageNumberValue,
    stockValue,
  ]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <Dialog.Backdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <Dialog.Panel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    key={section._id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <Disclosure.Button className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              onChange={() =>
                                handleCheckboxFilterChange(
                                  option.value,
                                  section._id
                                )
                              }
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-mobile-${section._id}-${optionIdx}`}
                              name={`${section._id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section._id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </Disclosure>
                ))}
                {singleFilter.map((section) => (
                  <Disclosure
                    key={section._id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <FormControl className="w-full">
                      <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <FormLabel id="demo-radio-buttons-group-label">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                          </FormLabel>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="h-5 w-5 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                            />
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            {section.options.map((option, optionIdx) => (
                              <FormControlLabel
                                onChange={(e) =>
                                  handleRadioFilterChange(e, section._id)
                                }
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                              />
                            ))}
                          </RadioGroup>
                        </div>
                      </Disclosure.Panel>
                    </FormControl>
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>

        <main className="mx-auto w-full px-6 sm:px-8 lg:px-10">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </Menu.Button>
                </div>

                <Menu.Items
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                          )}
                        >
                          {option.name}
                        </a>
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}

              <form className="hidden lg:block">
                <div className="flex justify-between items-center text-xl font-bold tracking-tight text-gray-900 opacity-60 pb-5">
                  <h1>Filters</h1>
                  <FilterListIcon />
                </div>
                {filters.map((section) => (
                  <Disclosure
                    key={section._id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="h-5 w-5 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              onChange={() =>
                                handleCheckboxFilterChange(
                                  option.value,
                                  section._id
                                )
                              }
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-${section._id}-${optionIdx}`}
                              name={`${section._id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section._id}-${optionIdx}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Disclosure.Panel>
                  </Disclosure>
                ))}
                {singleFilter.map((section) => (
                  <Disclosure
                    key={section._id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <FormControl className="w-full">
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <FormLabel
                            id="demo-radio-buttons-group-label"
                            className="font-medium !text-gray-900"
                          >
                            {section.name}
                          </FormLabel>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="h-5 w-5 group-data-[open]:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                            />
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                          >
                            {section.options.map((option, optionIdx) => (
                              <FormControlLabel
                                onChange={(e) =>
                                  handleRadioFilterChange(e, section._id)
                                }
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                              />
                            ))}
                          </RadioGroup>
                        </div>
                      </Disclosure.Panel>
                    </FormControl>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-4 w-full">
                <div className="flex flex-wrap justify-center bg-white py-5">
                  {products?.content?.length > 0 &&
                    products?.content?.map((item, index) => (
                      <ProductCard key={"productCard" + index} product={item} />
                    ))}
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="px-4 py-5 flex justify-center">
              <Pagination
                count={products?.totalPages}
                onChange={handlePaginationChange}
                color="secondary"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
