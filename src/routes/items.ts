// import { Router, Request,Response } from "express";import {db} from "../config/firebasedb/db";

// export default function testfirestoreRoutes(): Router { 
//  const router = Router();  
//    router.get('/read', async (req: Request, res: Response) => {    
//    try {      
//    const itemsRef = db.collection('Customers');     
//     const snapshot = await itemsRef.get();      
//     const Customers: any[] = [];        
//     snapshot.forEach(doc => {       
//      Customers.push({          
//      id: doc.id,          
//      data: doc.data()
//      });      
//       });        
//       res.status(200).json(Customers);    
//       } catch (error) {    
//         console.error("Error reading documents: ", error);     
//          res.status(500).send("Error reading documents");    }  });
//   return router;
//   }

