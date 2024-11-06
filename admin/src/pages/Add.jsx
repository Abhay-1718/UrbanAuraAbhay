import { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  // State variables for image uploads and product details
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState(""); // Product name
  const [description, setDescription] = useState(""); // Product description
  const [price, setPrice] = useState(""); // Product price
  const [category, setCategory] = useState("Men"); // Product category
  const [subcategory, setSubCategory] = useState("Topwear"); // Product subcategory
  const [bestseller, setBestseller] = useState(false); // Bestseller flag
  const [sizes, setSizes] = useState([]); // Selected product sizes

  // Function to handle form submission
  const onsubmitHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const formData = new FormData(); // Create a FormData object to send data

      // Append product details to the formData
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subcategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes)); // Convert sizes array to JSON string

      // Append images if they are selected
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      // Send the formData to the backend API
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } } // Include authorization token in headers
      );

      // Handle success response
      if (response.data.success) {
        toast.success(response.data.message); // Display success message

        // Reset form fields after successful submission
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message); // Display error message
      }
    } catch (error) {
      console.log(error); // Log any errors to the console
      toast.error(error.message); // Display error message
    }
  };

  return (
    <form
      onSubmit={onsubmitHandler} // Call onsubmitHandler when form is submitted
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload image</p>
        <div className="flex gap-2">
          {/* File upload inputs for images */}
          {Array.from({ length: 4 }).map((_, index) => (
            <label key={index} htmlFor={`image${index + 1}`}>
              <img
                className="w-20"
                src={
                  !eval(`image${index + 1}`)
                    ? assets.upload_area
                    : URL.createObjectURL(eval(`image${index + 1}`))
                }
                alt=""
              />
              <input
                onChange={(e) => eval(`setImage${index + 1}`)(e.target.files[0])} // Dynamically set the image state
                type="file"
                id={`image${index + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)} // Update product name on input change
          value={name} // Controlled input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)} // Update product description
          value={description} // Controlled textarea
          placeholder="Write content here"
          required
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2 ">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)} // Update category on selection change
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub Category</p>
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setSubCategory(e.target.value)} // Update subcategory on selection change
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)} // Update price on input change
            value={price} // Controlled input
            className="w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="25"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {/* Size selection buttons */}
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-pink-200" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)} // Toggle bestseller status
          checked={bestseller} // Controlled checkbox
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <button className="w-28 py-3 mt-4 bg-black text-white " type="submit">
        Add
      </button>
    </form>
  );
};

export default Add;
