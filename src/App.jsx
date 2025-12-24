import confetti from "canvas-confetti";
import { useState } from "react";
import pdfToText from "react-pdftotext";

function App() {
  const [myText1, setMyTexts1] = useState([]);
  const [myText2, setMyTexts2] = useState([]);
  const [match, setMatch] = useState([]);
  const handleFileChange1 = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    try {
      const text = await pdfToText(file);
      const result = text.match(/\d{7}/g);
      setMyTexts1(result);
    } catch (error) {
      console.error("Failed to read PDF:", error);
    }
  };
  const handleFileChange2 = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    try {
      const text = await pdfToText(file);
      const result = text.match(/\d{7}/g);
      setMyTexts2(result);
    } catch (error) {
      console.error("Failed to read PDF:", error);
    }
  };
  const fn = () => {
    console.log(myText1, myText2);

    const match = myText1.filter((num) => myText2.includes(num));
    console.log(match);

    setMatch(match);
    if (match.length > 0) {
      confetti();
    }
  };

  return (
    <div className=" container mx-auto px-10 mt-20">
      <h1 className="text-3xl font-semibold mb-10 text-center">
        Price bond winning checker
      </h1>
      <div className="flex justify-between">
        <div>
          <p className="mb-5 text-xl font-medium">Your pdf file</p>
          <input
            type="file"
            accept="application/pdf"
            className="file-input"
            onChange={handleFileChange1}
          />
        </div>
        <div>
          <p className="mb-5 text-xl font-medium">Result pdf file</p>
          <input
            type="file"
            accept="application/pdf"
            className="file-input"
            onChange={handleFileChange2}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          <button className="btn btn-primary" onClick={() => fn()}>
            click
          </button>
        </div>
      </div>
      {match.length === 0 ? (
        <p>No match found</p>
      ) : (
        match.map((r, i) => (
          <p key={r} className="font-medium">
            {i + 1}. Your wining numbers{" "}
            <span className="text-green-400">{r}</span>
          </p>
        ))
      )}
    </div>
  );
}

export default App;
