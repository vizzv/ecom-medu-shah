// import { defineRouteConfig } from "@medusajs/admin-sdk"
// import { TagSolid } from "@medusajs/icons"
// import {
//   Container,
//   Heading,
//   Table,
//   Text
// } from "@medusajs/ui"
// import { useQuery } from "@tanstack/react-query"
// import { sdk } from "../../../admin/lib/sdk"
// import { Plus } from "@medusajs/icons"
// import { IconButton } from "@medusajs/ui"

// const ReviewsPage = () => {
//   const { data, isLoading } = useQuery({
//     queryKey: ["reviews"],
//     queryFn: async () => {
//       // Replace with your actual API endpoint
//       const response = await sdk.client.fetch( "/admin/reviews")
//       return response
//     },
//   })

//   return (
//     <Container className="divide-y p-0">
//       <div className="flex items-center justify-between px-6 py-4">
//         <Heading level="h2">Product Reviews</Heading>
//         <IconButton className="flex items-center gap-x-3 p-2 h-auto w-auto border border-white " variant="secondary">
//         <Text>Add Review</Text>
//         <Plus />
//         </IconButton>
        
//       </div>
//       <Table>
//         <Table.Header>
//           <Table.Row>
//             <Table.HeaderCell>Title</Table.HeaderCell>
//             <Table.HeaderCell>Description</Table.HeaderCell>
//             <Table.HeaderCell>User</Table.HeaderCell>
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>
//           {isLoading ? (
//             <Table.Row>
//               <Table.Cell colSpan={3}>
//                 <Text>Loading reviews...</Text>
//               </Table.Cell>
//             </Table.Row>
//           ) : data?.reviews?.length ? (
//             data.reviews.map((review) => (
//               <Table.Row key={review.id}>
//                 <Table.Cell>{review.title}</Table.Cell>
//                 <Table.Cell>{review.description}</Table.Cell>
//                 <Table.Cell>{review.user_id}</Table.Cell>
//               </Table.Row>
//             ))
//           ) : (
//             <Table.Row>
//               <Table.Cell colSpan={3}>
//                 <Text>No reviews found</Text>
//               </Table.Cell>
//             </Table.Row>
//           )}
//         </Table.Body>
//       </Table>
//     </Container>
//   )
// }

// export const config = defineRouteConfig({
//   label: "Reviews",
//   icon: TagSolid,
// })

// export default ReviewsPage


// export default function ReviewsPage() {
//   return (
//     <div>
//       <h1>Reviews Page</h1>
//     </div>
//   )
// }




import { defineRouteConfig } from "@medusajs/admin-sdk"
import { TagSolid } from "@medusajs/icons"
import { 
  Container, 
  Heading, 
  Table, 
  Text, 
  IconButton, 
  FocusModal,
  Input,
  Textarea,
  Button,
  toast,
  Toaster
} from "@medusajs/ui"
import { useQuery } from "@tanstack/react-query"
import { sdk } from "../../../admin/lib/sdk"
import { Plus } from "@medusajs/icons"
// import { IconButton } from "@medusajs/ui"
import { useState } from "react"


const ReviewsPage = () => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [userId, setUserId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data, isLoading ,refetch} = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      // Replace with your actual API endpoint
      const response = await sdk.client.fetch( "/admin/reviews")
      return response
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await sdk.client.fetch("/admin/reviews", {
        method: "POST",
        body: {
          title,
          description,
          user_id: userId
        }
      })
      console.log(response,"-=+++++")
      if (response.status === "success") {
        debugger
        // Review created successfully
        console.log("Review created successfully")
        toast.info(response.status, {
          description: response.message,
        })
      } else {
        // Handle error
        console.error("Failed to create review")
      }
      
      // Reset form and close modal
      setTitle("")
      setDescription("")
      setUserId("")
      setOpen(false)
      
      // Refetch reviews to update the list
      refetch()

    } catch (error) {
      console.error("Error creating review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <Container className="divide-y p-0">
      <Toaster />
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Product Reviews</Heading>

        <FocusModal open={open} onOpenChange={setOpen}>
          <FocusModal.Trigger asChild>
            <IconButton 
              className="flex items-center gap-x-3 p-2 h-auto w-auto border border-white" 
              variant="secondary"
            >
              <Text>Add Review</Text>
              <Plus />
            </IconButton>
          </FocusModal.Trigger>
          
          <FocusModal.Content>
            <FocusModal.Header>
              <Heading>Add New Review</Heading>
            </FocusModal.Header>
            <FocusModal.Body>
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 p-4">
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="title">Title</label>
                  <Input 
                    id="title"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Review title"
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="description">Description</label>
                  <Textarea 
                    id="description"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Review description"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="userId">User ID</label>
                  <Input 
                    id="userId"
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)} 
                    placeholder="User ID"
                    required
                  />
                </div>
                
                <div className="flex justify-end gap-x-2 mt-4">
                  <Button 
                    variant="secondary" 
                    type="button" 
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Save Review
                  </Button>
                </div>
              </form>
            </FocusModal.Body>
          </FocusModal.Content>
        </FocusModal>


        {/* <IconButton className="flex items-center gap-x-3 p-2 h-auto w-auto border border-white " variant="secondary">
        <Text>Add Review</Text>
        <Plus />
        </IconButton> */}
        
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>User</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Row>
              <Table.Cell colSpan={3}>
                <Text>Loading reviews...</Text>
              </Table.Cell>
            </Table.Row>
          ) : data?.reviews?.length ? (
            data.reviews.map((review) => (
              <Table.Row key={review.id}>
                <Table.Cell>{review.title}</Table.Cell>
                <Table.Cell>{review.description}</Table.Cell>
                <Table.Cell>{review.user_id}</Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={3}>
                <Text>No reviews found</Text>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Reviews",
  icon: TagSolid,
})

export default ReviewsPage


// export default function ReviewsPage() {
//   return (
//     <div>
//       <h1>Reviews Page</h1>
//     </div>
//   )
// }

