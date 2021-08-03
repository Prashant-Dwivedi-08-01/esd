import jwt from "jsonwebtoken";

import User from "../models/user.js";
import Data from "../models/data.js"
import Officer from "../models/officer.js"


export const officerAuth = async (req, res) => {
    const { officer_id, password } = req.body;

    try {

        const existingOfficer = await Officer.findOne({ officer_id });

        if (!existingOfficer)
            return res.status(404).json({
                status: "Failed",
                message: "No Such Officer_Id exits"
            })

        const password_orig = existingOfficer.password;
        const checkPassword = (password_orig === password);

        if (!checkPassword)
            return res.status(401).json({
                status: "Failed",
                message: "Incorrect Pasword"
            })

        const secret_key = `officer-${existingOfficer.officer_id}`
        const token = jwt.sign(
            { officer_id: officer_id },
            secret_key,
            { expiresIn: '1h' }
        )

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

export const insertBill = async (req, res) => {

    const rate = 3 // 3 Rd. Per Unit
    const { meterNumber, billingUnit, status } = req.body;
    const newBill = {
        meterNumber: meterNumber,
        billingUnit: billingUnit,
        amount: Number(billingUnit) * rate,
        status: status
    }

    try {
        const existingMeter = await User.findOne({ meterNumber });
        if (!existingMeter)
            return res.status(404).json({
                status: "Failed",
                message: "No such meter is registered by any user"
            })

        const result = await Data.create(newBill);
        res.status(200).json({
            status: "Success",
            message: "Bill inserted successfull",
            record: result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            message: "Something went wrong"
        })
    }

}

export const checkAllBill = async (req, res) => {
    const query = req.body;

    try {

        const result = await Data.find(query);
        if (!result.length)
            return res.status(404).json({
                status: "Failed",
                message: "Your Query Parameters Does not Match any Data. Check your query"
            })
        else
            res.status(200).json({
                status: "Success",
                message: "All records are fethced successfully",
                records: result
            })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            message: "Something went wrong"
        })
    }
}

export const updateBill = async (req, res) => {
    const data = req.body;

    if (!('meterNumber' in data))
        return res.status(404).json({
            status: "Failed",
            message: "Please Provide the Meter Name"
        })
    else {

        try {
            const meterNumber = data.meterNumber;
            const isMeter = await Data.findOne({ meterNumber });
            if (!isMeter)
                return res.status(404).json({
                    status: "Failed",
                    message: "No such meter exits"
                })

            else {
                const updatedBill = {};
                if ('billingUnit' in data) {
                    updatedBill.amount = Number(data.billingUnit) * 3;// 3 is present rate per unit
                }
                const result = await Data.findOneAndUpdate({ meterNumber }, { ...updatedBill, ...data }, { new: true });
                res.status(200).json({
                    status: "Success",
                    message: "Updated Successfully",
                    details: result
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
}

export const deleteBill = async (req, res) => {
    const { meterNumber } = req.params;
    try {
        const result = await Data.findOneAndDelete({ meterNumber });
        if (result)
            res.status(200).json({
                status: "Success",
                message: "Data Deleted Successfull",
                deleted_record: result
            })
        else
            res.status(404).json({
                status: "Failed",
                message: "No Such Meter Found"
            })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            message: "Something went wrong"
        })
    }
}

