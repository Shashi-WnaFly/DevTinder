const mongoose = require("mongoose");


const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["Interested", "Ignore", "Accepted", "Rejected"],
            message: `{VALUE} is incorrect status type`,
        },
    }
})

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);