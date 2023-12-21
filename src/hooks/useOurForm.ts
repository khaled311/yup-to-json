import { yupResolver } from "@hookform/resolvers/yup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import * as yup from "yup";

const useOurForm = (
  schema: z.ZodObject<any> | yup.ObjectSchema<any>,
  validationMode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all"
) => {
  const form = useForm({
    mode: validationMode || "onBlur",
    resolver:
      schema instanceof z.ZodObject === true
        ? zodResolver(schema)
        : yupResolver(schema),
  });

  return form;
};

export default useOurForm;
