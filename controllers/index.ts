import asyncHandler from "express-async-handler";

// get ROOT folder and display it in the dashboard 

const index = asyncHandler(async (req, res) => {
    res.json({
        status: 200,
        folder: {
            name: "root",
            files: [],
            folders: [],
        }
    })
});


export default index;