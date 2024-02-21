import { useState } from "react";

function App() {
  const [click, setClick] = useState(0);

  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center w-full h-screen">
        <div>{click}</div>
        <button
          className="btn btn-primary"
          onClick={() => setClick((prevState) => prevState + 1)}
        >
          Click
        </button>
      </div>
    </>
  );
}

export default App;
