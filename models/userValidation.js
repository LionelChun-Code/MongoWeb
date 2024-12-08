const userValidation = {
  $jsonSchema: {
    bsonType: "object",
    required: ["username", "email", "password", "avatar", "role", "isActivated", "createdAt", "updatedAt"],
    properties: {
      username: {
        bsonType: "string",
        minLength: 2,
        maxLength: 40,
        description: "Username, must be a string between 2 and 40 characters."
      },
      email: {
        bsonType: "string",
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        description: "Valid email address, must be unique."
      },
      password: {
        bsonType: "string",
        minLength: 60,
        maxLength: 60,
        description: "User password, must be a string of length 60 characters."
      },
      avatar: {
        bsonType: "string",
        description: "Filename of the user's photo, must be a string. Default is 'default-avatar.png'."
      },
      role: {
        bsonType: "string",
        enum: ["admin", "user", "moderator", "guest"],
        description: "User role. Can be 'admin', 'user', 'moderator', or 'guest'. Default is 'user'."
      },
      isActivated: {
        bsonType: "bool",
        description: "Whether the account is activated. Default is false."
      },
      createdAt: {
        bsonType: "date",
        description: "ISO date when the record was created."
      },
      updatedAt: {
        bsonType: "date",
        description: "ISO date when the record was last updated."
      }
    }
  },
  indexes: [
    {
      key: { email: 1 },
      unique: true
    }
  ]
};

module.exports = userValidation;
