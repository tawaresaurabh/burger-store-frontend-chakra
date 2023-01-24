import * as Yup from "yup";


export const productFormSchema = Yup.object().shape({
    name: Yup.string()
        .required("*Name is required"),
    imageUrl: Yup.string()
        .required("*Image URL is required"),
    price: Yup.number()
        .required("*Price is required"),
    description: Yup.string(),

});
