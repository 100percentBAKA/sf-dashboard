const FileUpload = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <div className="text-[20px] font-semibold my-6 text-center">Add Book</div>

      <form action="POST">
        {/* File category */}
        <div className="flex-col space-y-2 mb-10">
          <label htmlFor="category" className="text-[18px] font-semibold">
            Select Category
          </label>
          <select className="select w-full" id="category">
            <option disabled>Select Category</option>
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
            <option disabled>Select Sub Category</option>
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
            <option disabled>Select Sub to Sub Category</option>
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
            Enter Book Name
          </label>
          <input
            type="text"
            placeholder="Enter File Name"
            className="input w-full"
          />
        </div>

        {/* File Type */}
        {/* <div className="flex-col space-y-2 mb-10">
          <label htmlFor="category" className="text-[18px] font-semibold">
            Select Book Type
          </label>
          <select className="select w-full" id="category">
            <option disabled>Select Book Type</option>
            <option values="category-1">Text</option>
            <option values="category-2">PDF</option>
          </select>
        </div> */}

        {/* Image Upload */}
        <div className="flex-col space-y-2 mb-10">
          <label htmlFor="imageUpload" className="text-[18px] font-semibold">
            Upload Image
          </label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className="input w-full"
          />
          <p className="text-sm text-gray-500">
            {/* Supported formats: JPG, PNG, GIF. Max size: 5MB */}
            Supported formats: JPG, PNG, GIF
          </p>
        </div>

        {/* File Upload */}
        <div className="flex-col space-y-2 mb-10">
          <label htmlFor="fileUpload" className="text-[18px] font-semibold">
            Upload Book
          </label>
          <input
            type="file"
            id="fileUpload"
            accept=".pdf,.doc,.docx,.txt"
            className="input w-full"
          />
          <p className="text-sm text-gray-500">
            {/* Supported formats: PDF, DOC, DOCX, TXT. Max size: 10MB */}
            Supported formats: PDF, DOC, DOCX, TXT
          </p>
        </div>

        <button className="btn btn-primary w-full">Submit</button>
      </form>
    </div>
  );
};

export default FileUpload;
