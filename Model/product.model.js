const mongoose = require('mongoose');
const validator = require('validator');

const productSchma = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'This field is require.'],
			unique: [true, 'Name shout be unique.'],
			trim: true,
			minLength: [5, 'Name shout be at least 5 letter.'],
			maxLength: [50, 'Name is too large.'],
		},
		quantity: {
			type: Number,
			required: [true, 'This field is require.'],
			min: [0, "Quantity can't be Negative."],
			validate: {
				validator: (value) => {
					const isInteger = Number.isInteger(value);
					if (isInteger) {
						return true;
					} else {
						return false;
					}
				},
				message: 'Quantity must be an Integer.',
			},
		},
		unit: {
			type: String,
			required: [true, 'This field is require.'],
			enum: {
				values: ['pcs', 'plate'],
				message: "Product unit value can't be {VALUE}, must be pcs/plate.",
			},
		},
		description: {
			type: String,
			required: [true, 'This field is require.'],
		},
		price: {
			type: Number,
			required: [true, 'This field is require.'],
			min: [0, "Price can't be negative."],
		},
		store: String,
		location: String,
		place: String,
		img: {
			type: String,
			required: [true, 'This field is require.'],
			validate: {
				validator: (value) => {
					const isUrl = validator.isURL(value);
					if (isUrl) {
						return true;
					} else {
						return false;
					}
				},
				message: 'Plase Provide a valid Url.',
			},
		},
		category: {
			type: String,
			required: [true, 'This field is require.'],
			enum: {
				values: ['Rich', 'Fish', 'Vagetable', 'Biryani', 'Chicken', 'Soup'],
				message:
					"Category value can't be {VALUE}, must be Rich/Fish/Vagetable/Biryani/Chicken/Soup",
			},
		},
		status: {
			type: String,
			enum: {
				values: ['In-Stock', 'Out-Of-Stock'],
				message: "Status can't be {VALUE}.",
			},
			default: 'In-Stock',
		},
		store: {
			id: {
				type: mongoose.Types.ObjectId,
				ref: 'Store',
				required: true,
			},
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model('Product', productSchma);
module.exports = Product;
