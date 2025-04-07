// // src/api/routes/admin/reviews/update-review.ts
// import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

// export async function GET (req: MedusaRequest, res: MedusaResponse) {
//     console.log("==========")
//     const review_obj = [
//       {id: "123", title: "test", description: "test", user_id: "123" },
//       {id: "123", title: "test", description: "test", user_id: "123" },
//       {id: "123", title: "test", description: "test", user_id: "123" }  
//     ]
//     console.log(review_obj,"--------------")
// //   const { id } = req.params
// //   const { title, description, user_id } = req.body
  
// //   const reviewService = req.scope.resolve("reviewModuleService")
  
// //   const updatedReview = await reviewService.update(id, {
// //     title,
// //     description,
// //     user_id,
// //   })
  
//   return res.json({reviews: review_obj })
// }



// // src/api/routes/admin/reviews/update-review.ts
// import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

// export async function GET (req: MedusaRequest, res: MedusaResponse) {
//     console.log("==========")
//     const review_obj = {
//       id: "123", title: "test", description: "test", user_id: "123" 
//     }
//     console.log(review_obj,"--------------")
// //   const { id } = req.params
// //   const { title, description, user_id } = req.body
  
// //   const reviewService = req.scope.resolve("reviewModuleService")
  
// //   const updatedReview = await reviewService.update(id, {
// //     title,
// //     description,
// //     user_id,
// //   })
  
//   return res.json(review_obj )
// }

// src/api/routes/admin/reviews/update-review.ts
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import  {REVIEW_MODULE}  from "../../../modules/review"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    // Resolve the review module service
    console.log("review_module")
    const reviewModuleService = req.scope.resolve(REVIEW_MODULE)
    
    console.log("review_module_service",await reviewModuleService)
    // Fetch reviews from the database
    const reviews = await reviewModuleService.listReviews({}, {
      take: 10, // Limit to 10 reviews
      order: { created_at: "DESC" } // Order by creation date
    })
    console.info("Reviews fetched from database:", reviews)
    console.log("Reviews fetched from database:", reviews.length)
    
    // Return the reviews as JSON response
    return res.json({ 
      reviews,
      count: reviews.length
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return res.status(500).json({
      message: "An error occurred while fetching reviews",
      error: error.message
    })
  }
}


export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    // Resolve the review module service
    console.log("review_module")
    console.log("Request body:", req.body)
    const reviewModuleService = req.scope.resolve(REVIEW_MODULE)
    
    console.log("review_module_service",await reviewModuleService)
    // Post reviews from the database
    const reviews = await reviewModuleService.createReviews(req.body)
    console.info("reviews",reviews)

    return res.status(201).json({
      status: "success",
      reviews,
      count: reviews.length,
      message: "Reviews created successfully"
    })


    // Return the reviews as JSON response
  } catch (error) {
    console.error("Error Posting reviews:", error)
    return res.status(500).json({
      message: "An error occurred while fetching reviews",
      error: error.message
    })
  }
}