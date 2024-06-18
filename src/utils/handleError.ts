import toast from "react-hot-toast";

export default function handleError(error: unknown) {
  let message;
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }
  toast.error(message);
}
