import User from "../../models/UserModel";
const Validations = require("../../Validations");

class UserController {
  // Add New User to database
  async addUser(request, response) {
    const result = Validations.addUser(request.body);

    if (result.error) {
      let error = result.error.details[0];
      response.status(422).json({
        success: false,
        error: { field: error.path[0], message: error.message },
      });
    } else if (await User.emailExists(result.value.email)) {
      response.status(409).json({
        success: false,
        error: { field: "email", message: "Email already registered!" },
      });
    } else {
      try {
        // save the new user in db
        let newUser = new User(result.value);
        let user = await newUser.save();
        response
          .status(201)
          .json({ success: true, message: "Sign up successful!", user: user });
      } catch (error) {
        response.status(500).json({ success: false, error: error.message });
      }
    }
  }
  // Return All Users from Database
  async getAllUsers(request, response) {
    try {
      let dbUsers = await User.find();
      let users = await dbUsers.map((dbUser) => ({
        _id: dbUser._id,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        email: dbUser.email,
        createdAt: dbUser.createdAt,
      }));
      response.status(200).json({ success: true, users: users });
    } catch (error) {
      response.status(500).json({ success: false, error: error.message });
    }
  }
  //Update Single User
  async updateUserDetails(request, response) {
    const result = Validations.updateUserDetails(request.body);
    if (result.error) {
      let error = result.error.details[0];
      response.status(422).json({
        success: false,
        error: { field: error.path[0], message: error.message },
      });
    } else {
      const { firstName, lastName, email, userType } = result.value;

      try {
        let userEmail = await User.emailExists(email);
        if (userEmail) {
          if (userEmail._id.toString() !== request.authUser._id.toString()) {
            response.status(409).json({
              success: false,
              error: {
                field: "email",
                message: "Email already registered !",
              },
            });
            return;
          }
        }
        let updatedUser = await User.findOneAndUpdate(
          { _id: request.authUser._id },
          { firstName, lastName, email, userType },
          { new: true }
        );

        response.status(200).json({
          success: true,
          message: "Details updated successfully !",
          updatedUser: updatedUser,
        });
      } catch (error) {
        response.status(500).json({ success: false, error: error.message });
      }
    }
  }
  //Delete User
  async deleteuser(request, response) {
    if (request) {
      try {
        let deletedUser = await User.findOneAndDelete({
          _id: request.params.userId,
        });
        if (!deletedUser) {
          response
            .status(404)
            .json({ success: false, error: "User not found !" });
        } else {
          // remove the deleted trip from user's trips array
          response.status(200).json({
            success: true,
            message: `${deletedUser.email} deleted successfully !`,
            deletedUser: deletedUser,
          });
        }
      } catch (error) {
        response.status(500).json({ success: false, error: error.message });
      }
    } else {
      response.status(403).json({ success: false, error: "You cannot User" });
    }
  }
}

const userController = new UserController();
export default userController;
