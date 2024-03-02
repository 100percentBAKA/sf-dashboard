const FileUpload = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <div className="text-[20px] font-semibold my-6 text-center">
        Add Excel File
      </div>

      <form action="POST">
        {/* File category */}
        <div className="flex-col space-y-2 mb-10">
          <label htmlFor="category" className="text-[18px] font-semibold">
            Select Category
          </label>
          <select className="select w-full" id="category">
            <option disabled selected>
              Select Category
            </option>
            <option values="category-1">Category 1</option>
            <option values="category-2">Category 2</option>
            <option values="category-3">Category 3</option>
            <option values="category-4">Category 4</option>
            <option values="category-5">Category 5</option>
          </select>
        </div>

        {/* File sub category */}
        <div className="flex-col space-y-2 mb-10">
          <label htmlFor="category" className="text-[18px] font-semibold">
            Select Sub Category
          </label>
          <select className="select w-full" id="category">
            <option disabled selected>
              Select Sub Category
            </option>
            <option values="category-1">Category 1</option>
            <option values="category-2">Category 2</option>
            <option values="category-3">Category 3</option>
            <option values="category-4">Category 4</option>
            <option values="category-5">Category 5</option>
          </select>
        </div>

        {/* File sub to sub category */}
        <div className="flex-col space-y-2 mb-10">
          <label htmlFor="category" className="text-[18px] font-semibold">
            Select Sub to Sub Category
          </label>
          <select className="select w-full" id="category">
            <option disabled selected>
              Select Sub to Sub Category
            </option>
            <option values="category-1">Category 1</option>
            <option values="category-2">Category 2</option>
            <option values="category-3">Category 3</option>
            <option values="category-4">Category 4</option>
            <option values="category-5">Category 5</option>
          </select>
        </div>

        {/* File name */}
        <div className="flex-col space-y-2 mb-10">
          <label htmlFor="" className="text-[18px] font-semibold">
            Enter File Name
          </label>
          <input
            type="text"
            placeholder="Enter File Name"
            className="input w-full"
          />
        </div>

        {/* File Upload */}
        <div className="flex-col space-y-2 mb-10">
          <label htmlFor="fileUpload" className="text-[18px] font-semibold">
            Upload File
          </label>
          <input
            type="file"
            id="fileUpload"
            accept=".pdf,.doc,.docx,.txt"
            className="input w-full"
          />
          <p className="text-sm text-gray-500">Supported formats: XLSX</p>
        </div>

        <button className="btn btn-primary w-full">Submit</button>
      </form>
    </div>
  );
};

export default FileUpload;
