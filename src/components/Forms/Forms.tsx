import { useState } from "react";
import useOurForm from "../../hooks/useOurForm";
import { number, object, string } from "yup";
import { convertSchema } from "@sodaru/yup-to-json-schema";

const Forms = () => {
  const [isCitizen, setIsCitizen] = useState(true);
  // const Schema = z.object({
  //   ...(!isCitizen
  //     ? {
  //         id: z.string().min(5).max(15),
  //       }
  //     : null),
  //   name: nameValidation,
  //   email: emailValidation,
  //   age: z.coerce
  //     .number()
  //     .gte(18, "age should be 18 or upove")
  //     .lte(100, "your age must be less than 100"),
  // });

  let userSchema = object({
    name: string().min(3).required(),
    age: number().required().positive().integer(),
    email: string().email(),
  });

  const jsonSchema = convertSchema(userSchema);

  console.log("jsonSchema", jsonSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useOurForm(userSchema);
  console.log("errors", errors);
  const onSubmit = (data: any) => {
    console.log("onSubmit data", data);
  };
  return (
    <>
      <button
        onClick={() => setIsCitizen((old) => !old)}
        style={{ marginBlockEnd: 50 }}
      >
        {isCitizen ? "Citizen" : "Foriegner"}
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isCitizen ? (
          <input
            type="text"
            {...register("id")}
            placeholder="id"
            style={{
              display: "block",
              width: 200,
              height: 40,
              marginBlockEnd: 10,
            }}
          />
        ) : null}
        {errors?.id?.message ? <p>{errors?.id?.message as string}</p> : ""}
        <input
          type="text"
          {...register("name")}
          placeholder="name"
          style={{
            display: "block",
            width: 200,
            height: 40,
            marginBlockEnd: 10,
          }}
        />
        <input
          type="text"
          {...register("email")}
          placeholder="email"
          style={{
            display: "block",
            width: 200,
            height: 40,
            marginBlockEnd: 10,
          }}
        />
        <input
          type="text"
          {...register("age")}
          placeholder="age"
          style={{
            display: "block",
            width: 200,
            height: 40,
            marginBlockEnd: 10,
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Forms;
