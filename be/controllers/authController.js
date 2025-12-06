const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Customer, Staff } = require("../models/User");

/* ======================================================
   REGISTER – CUSTOMER
====================================================== */
exports.register = async (req, res, next) => {
  try {
    const { email, password, name, phone, dob, gender } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        error: "Missing required fields"
      });
    }

    /* ✅ CHECK DUPLICATE ĐÚNG BẢNG */
    const existingCustomer = await Customer.findByEmail(email);
    if (existingCustomer) {
      return res.status(409).json({
        error: "Email already registered"
      });
    }

    /* ✅ HASH PASSWORD */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* ✅ CREATE CUSTOMER */
    const userId = await Customer.create({
      email,
      password_hash: hashedPassword,
      name,
      phone: phone || null,
      dob: dob || null,
      gender: gender || null
    });

    /* ✅ SIGN JWT */
    const token = jwt.sign(
      { userId, email, userType: "customer" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "7d" }
    );

    return res.status(201).json({
      message: "Customer registered successfully",
      token,
      user: {
        userId,
        email,
        name,
        phone,
        userType: "customer"
      }
    });

  } catch (error) {
    next(error);
  }
};

/* ======================================================
   LOGIN – CUSTOMER / STAFF
====================================================== */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required"
      });
    }

    /* ✅ FIND USER (CUSTOMER OR STAFF) */
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password"
      });
    }

    /* ✅ CHECK PASSWORD */
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid email or password"
      });
    }

    /* ✅ SIGN JWT */
    const token = jwt.sign(
      {
        userId: user.user_id,
        email: user.email,
        userType: user.userType,
        role: user.role || "customer"
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        userId: user.user_id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        userType: user.userType,
        role: user.role || "customer"
      }
    });

  } catch (error) {
    next(error);
  }
};

/* ======================================================
   GET PROFILE
====================================================== */
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(
      req.user.userId,
      req.user.userType
    );

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    return res.json({
      user: {
        userId: user.user_id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender,
        userType: req.user.userType,
        role: user.role,
        date_join: user.date_join || user.last_active
      }
    });

  } catch (error) {
    next(error);
  }
};

/* ======================================================
   UPDATE PROFILE
====================================================== */
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, phone, gender } = req.body;

    let updated;
    if (req.user.userType === "customer") {
      updated = await Customer.update(req.user.userId, {
        name,
        phone,
        gender
      });
    } else {
      updated = await Staff.update(req.user.userId, {
        name,
        phone,
        gender
      });
    }

    if (!updated) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    const user = await User.findById(
      req.user.userId,
      req.user.userType
    );

    return res.json({
      message: "Profile updated successfully",
      user: {
        userId: user.user_id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        gender: user.gender
      }
    });

  } catch (error) {
    next(error);
  }
};
