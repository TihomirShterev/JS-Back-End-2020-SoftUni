module.exports = mongoose => {
  const { Schema, model: Model } = mongoose;
  const { String, ObjectId, Number } = Schema.Types;
  // const { String, ObjectId, Date, Number } = Schema.Types;

  const itemSchema = new Schema({
    hotel: {
      type: String,
      required: true,
      unique: true
    },
    city: {
      type: String,
      required: true
      // maxlength: 50
    },
    imgUrl: {
      type: String,
      required: true
    },
    freeRooms: {
      type: Number,
      required: true
    } /*,
    createdAt: {
      type: Date,
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
    ] /*,
    owner: {
      type: String
      // required: true
    }*/
  });
  // }, {timestamps: true}); // втори вариант вместо createdAt и/или updatedAt

  return Model("Item", itemSchema);
};
