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
      // maxLength: 50 // ??
    },
    imageUrl: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    }/*,
    createdAt: {
      type: String, // || Date, // ??
      required: true
    }*/,
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
