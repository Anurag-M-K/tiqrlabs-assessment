import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PreviewImage from "./PreviewImage";
import { setEvents } from "../redux/features/eventsSlice";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import Spinner from "./Spinner";

function EventAddForm({ modalOpen, setModalOpen }) {
  const { loading } = useSelector((state) => state.alerts);
  const validate = Yup.object({
    title: Yup.string()
      .max(100, "Title must be 100 charecters or less")
      .required("Title is required"),
    description: Yup.string()
      .max(200, "Description must be 200 charecters or less")
      .required("Description is required"),
    date: Yup.date().required("Date is required"),
  });
  const { tokenData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      place: "",
      description: "",
      date: "",
      image: "",
    },
    validationSchema: Yup.object({
      image: Yup.mixed()
        .required("Required")
        .test(
          "FILE_SIZE",
          "Too big!",
          (value) => value && value.size < 1024 * 1024
        )
        .test(
          "FILE_TYPE",
          "Invalid!",
          (value) => value && ["image/png", "image/jpeg"].includes(value.type)
        ),
    }),
    onSubmit: async () => {
      const userToken = tokenData;
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const apiUrl = `http://localhost:8080/api/event/addevent`;
      const apiUrl2 = `http://localhost:8080/api/event/getallevents`;
      const { image } = formik.values;
      const formData = new FormData();
      try {
        formData.append("file", image);
        formData.append("upload_preset", "bdv2xd3z");
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/dmvxmurxw/image/upload`,
          formData
        );
        formik.values.img = res.data.url;
        dispatch(showLoading(true));
        const response = await axios.post(apiUrl, formik.values, config);
        const response2 = await axios.get(apiUrl2, config);
        dispatch(setEvents(response2?.data?.events));
        dispatch(hideLoading(false));
        setModalOpen(false);

        toast.success("Event aded successfully");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    },
  });
  return (

<>
    {loading ? 
      <div className="fixed inset-0 flex items-center justify-center z-50">
      <Spinner /> {/* Display the Spinner component */}
    </div>  : <>
    {modalOpen  ? (
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className="fixed blur-none  justify-center items-center flex  z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => setModalOpen(false)}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Add Your Events{" "}
              </h3>

              <form
                onSubmit={formik.handleSubmit}
                className="space-y-6"
                action="#"
              >
                <div>
                  <label
                    for="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    onChange={(e) =>
                      formik.setFieldValue("title", e.target.value)
                    }
                    type="title"
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="title"
                    required
                  />
                </div>
                <div>
                  <label
                    for="place"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Place{" "}
                  </label>
                  <input
                    onChange={(e) =>
                      formik.setFieldValue("place", e.target.value)
                    }
                    type="place"
                    name="place"
                    id="place"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="place"
                    required
                  />
                </div>
                <div>
                  <label
                    for="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your description
                  </label>
                  <input
                    onChange={(e) =>
                      formik.setFieldValue("description", e.target.value)
                    }
                    type="description"
                    name="description"
                    id="description"
                    placeholder="Description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    for="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Event Date
                  </label>
                  <input
                    onChange={(e) =>
                      formik.setFieldValue("date", e.target.value)
                    }
                    type="date"
                    name="date"
                    id="date"
                    placeholder="Date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label
                    for="file"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) =>
                      formik.setFieldValue("image", e.target.files[0])
                    }
                    id="file"
                    placeholder="Select an Image"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                  {formik.errors.image && (
                    <p className="text-red-600">{formik.errors.image}</p>
                  )}
                </div>

                <div className="w-full flex justify-center  text-center">
                  {formik.values.image && (
                    <PreviewImage file={formik.values.image} />
                  )}
                </div>
                {
                  loading ?    <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                 Saving...
                </button> : 
                
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                 Save 
                </button>
}
              
              </form>
              {/* Display the Spinner when loading is true */}
    
            </div>
          </div>
        </div>
      </div>
    ) : (
      ""
    )}
  </>}
    
                  </>
  );
}

export default EventAddForm;
