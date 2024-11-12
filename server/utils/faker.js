import { faker } from "@faker-js/faker";
import User from "../models/userModel.js";
import Recipe from "../models/recipeModel.js";
import UserPost from "../models/userPostModel.js";

const generateUsers = (num) => {
  const users = [];
  for (let i = 0; i < num; i++) {
    const user = new User({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      isFake: true,
    });
    users.push(user);
  }
  return users;
};

const generateRecipes = (num) => {
  const recipes = [];

  for (let i = 0; i < num; i++) {
    const numImages = faker.number.int({ min: 1, max: 3 });
    const images = Array.from({ length: numImages }, () =>
      faker.image.urlPicsumPhotos({ width: 300, height: 200 })
    );

    const recipe = new Recipe({
      title: faker.lorem.words(3),
      ingredients: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      instructions: [faker.lorem.sentence(), faker.lorem.sentence()],
      images: images,
      category: faker.commerce.department(),
      calories: faker.number.int({ min: 100, max: 1000 }), // Updated here
      prepTime: `${faker.number.int({ min: 5, max: 60 })} mins`, // Updated here
      isFake: true,
    });
    recipes.push(recipe);
  }
  return recipes;
};

const generatePosts = async (users, recipes) => {
  const posts = [];

  for (let user of users) {
    for (let i = 0; i < 3; i++) {
      const username = faker.internet.username().replace(/\./g, "_");
      const post = new UserPost({
        userId: user._id,
        recipeId:
          recipes[faker.number.int({ min: 0, max: recipes.length - 1 })]._id,
        likes: { [username]: true },
        isFake: true,
        comments: [
          {
            userId: user._id,
            text: faker.lorem.sentence(),
            timestamp: new Date(),
          },
          {
            userId: user._id,
            text: faker.lorem.sentence(),
            timestamp: new Date(),
          },
        ],
      });
      posts.push(post);
    }
  }

  await UserPost.insertMany(posts);
};

const seedUsers = async () => {
  const users = generateUsers(20);
  await User.insertMany(users);
};

const seedRecipes = async () => {
  const recipes = generateRecipes(20);
  await Recipe.insertMany(recipes);
};

export const seedDatabase = async () => {
  await seedUsers();
  const users = await User.find();

  await seedRecipes();
  const recipes = await Recipe.find();

  await generatePosts(users, recipes);

  console.log("Database seeded with mock data");
};

//
export const deleteFakeData = async () => {
  try {
    // Delete fake users
    await User.deleteMany({ isFake: true });
    console.log("Fake users deleted.");

    // Delete fake recipes
    await Recipe.deleteMany({ isFake: true });
    console.log("Fake recipes deleted.");

    // Delete fake posts
    await UserPost.deleteMany({ isFake: true });
    console.log("Fake posts deleted.");
  } catch (error) {
    console.error("Error deleting fake data:", error);
  }
};
