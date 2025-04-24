// import bcrypt from "bcrypt";


// import {
//   IUser,
//   IUserRepository,
//   IUserWithoutPassword,
// } from "../../interfaces/userInterface";
// import db from "../../config/firebasedb/db";

// const userCollection = db.collection("users");

// export class FirebaseUserRepository implements IUserRepository {
//   async findAll(): Promise<IUserWithoutPassword[]> {
//     const snapshot = await userCollection.get();
//     return snapshot.docs.map((doc: { data: () => any; id: any; }) => {
//       const data = doc.data();
//       return {
//         id: doc.id,
//         name: data.name,
//         email: data.email,
//         role: data.role,
//       };
//     });
//   }

//   async findById(userId: string): Promise<IUserWithoutPassword | null> {
//     const doc = await userCollection.doc(userId).get();
//     if (!doc.exists) return null;
//     const data = doc.data()!;
//     return {
//       id: doc.id,
//       name: data.name,
//       email: data.email,
//       role: data.role,
//     };
//   }

//   async findByEmail(email: string): Promise<IUser | null> {
//     const snapshot = await userCollection.where("email", "==", email).limit(1).get();
//     if (snapshot.empty) return null;

//     const doc = snapshot.docs[0];
//     const data = doc.data();
//     return {
//       id: doc.id,
//       name: data.name,
//       email: data.email,
//       password: data.password,
//       role: data.role,
//     };
//   }

//   async create(user: Omit<IUser, "id">): Promise<IUserWithoutPassword> {
//     const hashedPassword = await bcrypt.hash(user.password, 10);
//     const userData = {
//       name: user.name,
//       email: user.email,
//       password: hashedPassword,
//       role: user.role,
//     };
//     const docRef = await userCollection.add(userData);
//     return {
//       id: docRef.id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     };
//   }
// }
