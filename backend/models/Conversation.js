const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
	{
		participants: [
			{
				participantId: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					refPath: 'participants.participantType',
				},
				participantType: {
					type: String,
					required: true,
					enum: ['Business', 'Creator'],
				},
			},
		],
		messages: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Message",
				default: [],
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
