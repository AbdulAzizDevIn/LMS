import ReactQuill from "react-quill";

const RichTeEditor = ({ input, setInput }) => {
  const handleChange = (content) => {
    setInput({ ...input, description: content });
  };
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={input.description}
        onChange={handleChange}
      />
    </div>
  );
};

export default RichTeEditor;
