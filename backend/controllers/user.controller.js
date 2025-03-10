import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try{

       const loggedInUserId = req.user._id;

       const allUsers = await User.find().select("-password") //({ _id: { $ne: loggedInUserId } });

       return res.status(200).json(allUsers);

    }catch(error){
        console.log("Error in getUsersForSidebar", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
