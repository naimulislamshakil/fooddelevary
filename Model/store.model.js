const mongoose = require('mongoose');

const storeSchma = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'This field is require.'],
			unique: [true, 'Name shout be unique.'],
			trim: true,
			minLength: [5, 'Name shout be at least 5 letter.'],
			maxLength: [20, 'Name is too large.'],
		},
		location: {
			type: String,
			required: [true, 'This field is require.'],
			enum: {
				values: [
					'Dhaka',
					'Chittagong',
					'Sylhet',
					"Cox's Bazar",
					'Rajshahi',
					'Khulna',
					'Comilla',
					'Barisal',
					'Rangpur',
					'Pirojpur',
					'Chandpur',
					'Bhola',
				],
				message: 'Location Is not correct.',
			},
		},
		place: {
			type: String,
			required: [true, 'This field is require.'],
		},
		tag: [String],
		category: {
			type: String,
			required: [true, 'This field is require.'],
			enum: {
				values: ['Rich', 'Fish', 'Vagetable', 'Biryani', 'Chicken', 'Soup'],
				message:
					"Category value can't be {VALUE}, must be Rich/Fish/Vagetable/Biryani/Chicken/Soup",
			},
		},
		imgUrl: {
			type: String,
			required: [true, 'This field is require.'],
		},
		status: {
			type: String,
			enum: {
				values: ['InActive', 'Active'],
				message: "Status can't be {VALUE}.",
			},
			default: 'Active',
		},
		product: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'Product',
			},
		],
		manager: {
			name: String,
			id: {
				type: mongoose.Types.ObjectId,
				ref: 'User',
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports.Store = mongoose.model('Store', storeSchma);
