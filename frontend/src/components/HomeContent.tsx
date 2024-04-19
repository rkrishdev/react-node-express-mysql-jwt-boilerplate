import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const inputText = useRef<null | HTMLElement>(null);
  const [count, setCount] = useState<number>(0);
  const [input, setInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.current) {
      inputText.current.innerText = input;
    }
  };
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <h1 className="text-center mb-10 font-bold font-sans text-3xl">
        Landing page
      </h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <div>
            <input
              className="border border-gray-500 outline-none rounded-md me-2 px-3 py-2"
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type something.."
              aria-label="Input element"
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>
        <div className="card flex flex-col justify-center items-center">
          <button
            className="mt-10 mb-5 w-fit btn"
            onClick={() => setCount((count) => count + 1)}
            aria-label="Count increment button"
          >
            count is {count}
          </button>
          <p className="mb-10">
            The input value is "<span ref={inputText}></span>"
          </p>
          <Link to={"/login"} className="btn mb-5">
            Login Page
          </Link>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
