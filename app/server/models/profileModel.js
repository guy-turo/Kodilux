const mongoose = require("mongoose")

const schema = mongoose.Schema

const ProfileSchema = new schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    gender: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    profilePicture: { type: String },
    headLine: { type: String },
    summary: { type: String },
    skills: [],
    experience: [{
        company: String,
        title: String,
        startDate: Date,
        endDate: Date,
        description: String,
    }],
    education: [{
        institution: String,
        degree: String,
        fieldOfStudy: String,
        graduationDate: String,
    }],
    certifications: [String],
    awards: [String],
    portfolioLinks: [String],

}, { timeStamp: true })

const ProfileModel = new mongoose.Model("Profile", ProfileSchema)

module.exports = { ProfileModel }