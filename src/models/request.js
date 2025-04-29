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
            values: ["interested", "ignore", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`,
        },
        
    }
}, { timestamps: true })

connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

connectionRequestSchema.pre("save", function (next) {
    const ConnectionRequest = this;
    if(ConnectionRequest.fromUserId.equals(ConnectionRequest.toUserId))
        throw new Error("cannot sent a connection request to yourself.");
    next(); // never miss the calling next();
})

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);