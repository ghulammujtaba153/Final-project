import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/userSchema.js';


const JWT_SECRET = process.env.JWT_SECRET || "ddd";

export const registerUser = async (req, res) => {
    const {
        profile,
        firstName,
        lastName,
        gender,
        email,
        password,
        role,
        dateOfBirth,
        contactNumber,
        postalAddress,
        permanentAddress
    } = req.body;
    console.log(req.body)
    // Validate required fields
    if (!firstName || !lastName || !email || !password || !dateOfBirth || !contactNumber || !postalAddress || !permanentAddress) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        console.log(existingUser)
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            profile,
            firstName,
            lastName,
            gender,
            email,
            password: hashedPassword,
            role,
            dateOfBirth,
            contactNumber,
            postalAddress,
            permanentAddress
        });

        // Save the new user
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with success
        res.status(201).json({
            message: 'User registered successfully.',
            token,
            user: {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                gender: newUser.gender,
                email: newUser.email,
                role: newUser.role,
                dateOfBirth: newUser.dateOfBirth,
                contactNumber: newUser.contactNumber,
                postalAddress: newUser.postalAddress,
                permanentAddress: newUser.permanentAddress
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({                                         
            message: 'Login successful.',
            token,
            user: { _id: user._id, profile: user.profile, firstName: user.firstName, lastName: user.lastName, gender: user.gender, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


//     const { id } = req.params;
//     console.log(id);

//     try {
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }
//         // console.log(user)

//         res.status(200).json({
//             message: 'User data retrieved successfully.',
//             user
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };


////////socke 
export const user = async (req, res) => {  // Function renamed to avoid confusion with variable name
    const { id } = req.params;
    console.log(id);

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }


        res.status(200).json({
            message: 'User data retrieved successfully.',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const updateUser = async (req, res) => {
    const { userId } = req.params; 
    const { firstName, lastName, gender, email, password, dateOfBirth, contactNumber, postalAddress, permanentAddress, profile } = req.body;
  
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Update user details
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.gender = gender || user.gender;
      user.email = email || user.email;
      user.dateOfBirth = dateOfBirth || user.dateOfBirth;
      user.contactNumber = contactNumber || user.contactNumber;
      user.postalAddress = postalAddress || user.postalAddress;
      user.permanentAddress = permanentAddress || user.permanentAddress;
  
      // Only update password if provided
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
  
      // Update profile picture URL if provided
      if (profile) {
        user.profile = profile;
      }
  
      await user.save();
  
      res.status(200).json({
        message: 'User updated successfully.',
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          email: user.email,
          dateOfBirth: user.dateOfBirth,
          contactNumber: user.contactNumber,
          postalAddress: user.postalAddress,
          permanentAddress: user.permanentAddress,
          profile: user.profile,
        },
      });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };