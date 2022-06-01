import userSchema from "../model/user.model";

const useronboarding = (req, res, next) => {
    try {
        let { name, email, password } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        else {
            const isExisting = await userSchema.findOne({ email });
            const findName = await userSchema.findOne({ name })
            if (isExisting && findName) {
                return res.json('Already existing');
            } else {
                try {
                    const hashing = await bcrypt.hash(password, 10);
                    const otpGenerated = generateOTP();
                    const otpHashing = await bcrypt.hash(otpGenerated, 10);
                    const user = new userSchema({
                        email: email,
                        password: hashing,
                        otp: otpHashing
                    });
                    await user.save();
                    await sendEmail({
                        user: email,
                        code: otpGenerated
                    });
                    return res.status(200).json({
                        message: "Check your mail for your otp",
                        isSuccess: true
                    })
                } catch (error) {
                    res.status(400).json({
                        error: error,
                        isSuccess: false
                    })
                }
            }
        }
    } catch (error) {
        res.status(400).send({
            error: error,
            isSuccess: false,
        })
    }
};
