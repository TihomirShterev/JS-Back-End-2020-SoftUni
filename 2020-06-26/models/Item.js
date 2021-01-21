module.exports = mongoose => {
  const { Schema, model: Model } = mongoose;
  const { String, ObjectId, Date, Boolean } = Schema.Types;

  const itemSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      maxlength: 50
    },
    imageUrl: {
      type: String,
      required: true
    },
    isChecked: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      required: true
    },
    creatorId: {
      type: ObjectId,
      required: true
    },
    peopleWhoIncremented: [
      {
        type: ObjectId,
        ref: "User"
      }
    ]
  });

  return Model("Item", itemSchema);
};
