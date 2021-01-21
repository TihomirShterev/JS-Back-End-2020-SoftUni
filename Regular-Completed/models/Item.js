module.exports = mongoose => {
  const { Schema, model: Model } = mongoose;
  const { String, ObjectId, Date } = Schema.Types;

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
    duration: {
      type: String,
      required: true
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
// }, {timestamps: true}); // втори вариант вместо createdAt и/или updatedAt

  return Model("Item", itemSchema);
};
