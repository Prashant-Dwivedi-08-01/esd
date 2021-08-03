import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import Data from "../models/data.js"

export const registerUser = async (req, res) => {
    const { name, username, address, pincode, phone, meterNumber, password, confirmPassword } = req.body;

    try {

        const existingUser = await User.findOne({ username });
        if (existingUser)
            return res.status(404).json({
                status: "Failed",
                message: "Username Already Exits"
            });

        const existingMeter = await User.findOne({ meterNumber });
        if (existingMeter)
            return res.status(404).json({
                status: "Failed",
                message: "This Meter is Already Registered"
            });

        if (password !== confirmPassword)
            return res.status(404).json({
                status: "Failed",
                message: "Password and Confirm Password did not match"
            });

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = {
            name: name,
            username: username,
            address: address,
            pincode: pincode,
            phone: phone,
            meterNumber: meterNumber,
            password: hashedPassword
        }

        const result = await User.create(user); //Model.create() is a shortcut for saving one or more documents to the database. MyModel.create(docs) does new MyModel(doc).save() for every doc in docs.

        res.status(201).json({
            status: "Success",
            message: "User Created Successfully",
            userDetails: result
        }
        );

    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Something Went Wrong"
        });
        console.log(error);
    }

}

export const auth = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (!existingUser)
            return res.status(404).json({
                status: "Failed",
                message: "No Such User Exits"
            })

        const password_orgi = existingUser.password;
        const checkPassword = bcrypt.compare(password, password_orgi);

        if (!checkPassword)
            return res.status(401).json({
                status: "Failed",
                message: "Incorrect Password"
            })

        const secret_key = "esd";
        const token = jwt.sign(
            { username: existingUser.username, id: existingUser._id },
            secret_key,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            status: "Success",
            message: "Authentication Successful",
            token: token,
            secret_key: secret_key
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            message: "Something went wrong"
        })
    }
}

export const updateUser = async (req, res) => {
    const data = req.body;
    const username = req.userData.username;

    try {
        if ('meterNumber' in data)
            return res.status(404).json({
                status: "Failed",
                message: "You Cannot Update the Meter Number it has to be done form department",
            })
        else {
            const existingUser = await User.findOne({ username });
            const result = await User.findOneAndUpdate({ username }, { ...existingUser._doc, ...data }, { new: true });
            res.status(200).json({
                status: "Success",
                message: "Updates are done Successfully",
                updatedData: result
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            message: "Something went wrong"
        })
    }
}

export const checkBill = async (req, res) => {
    const { meterNumber } = req.params;
    try {
        const meter = await Data.findOne({ meterNumber });
        if (meter) {
            const user = await User.findOne({ meterNumber });
            const result = { ...meter._doc, name: user.name, pincode: user.pincode, phone: user.phone }
            res.status(200).json({
                status: "Success",
                message: "Bill Details Found Successfully",
                details: result
            })
        }
        else
            res.status(404).json({
                status: "Failed",
                message: "Either your Meter is not Registered or Department hasn't updated you bill. If you have registered, then please contact the department office.",
                details: meter
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            message: "Something went wrong"
        })
    }
}

export const payBill = async (req, res) => {
    const { meterNumber } = req.params;
    const { amount, month } = req.body;
    try {

        const username = req.userData.username;
        const user = await User.findOne({ meterNumber });

        //check authenticated user is same as meterNumber received from User
        const sameMeter = (username === user.username)
        if (!sameMeter) {
            return res.status(404).json({
                status: "Failed",
                message: "Your Meter Number is not same as Authenticated User's Meter. Check you meter number or authorization.",
            })
        }
        else {
            const meter = await Data.findOne({ meterNumber, month });
            if (meter) {
                if (meter.amount === Number(amount)) {
                    if(meter.status === 'Paid'){
                        res.status(401).json({
                            status: "Failed",
                            message: "Your Bill Is Already Paid",
                            details: meter
                        })
                    }
                    else{
                        const result = await Data.findOneAndUpdate({ meterNumber }, { ...meter._doc, status: 'Paid' }, { new: true });
                        res.status(200).json({
                            status: "Success",
                            message: "Bill Paid Successfully",
                            details: result
                        })
                    }
                }
                else {
                    res.status(401).json({
                        status: "Failed",
                        message: "Billing Amount Entered is Incorrect",
                        details: meter
                    })
                }
            }
            else {
                res.status(401).json({
                    status: "Failed",
                    message: "Either your meter number/ month is incorrect or your meter is not registered. Please Check!",
                    details: meter
                })
            }
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            message: "Something went wrong"
        })
    }
}

