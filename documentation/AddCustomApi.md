# Add Custom Api

## 🔍 Description
For creation of custom rest end points.

## 📦 Files Changed / Created
List of files 
- @/src/api/admin/routeName/route.ts (A)

*(A = Added, M = Modified, D = Deleted)*

## 🛠️ Steps

Add all step number wise and detailed .
1. Create a file called route.ts in respective dir.Sppose we need a route for review then create a route.ts in review dir.
2. implement GET,POSAT,PUT,PATCH,DELETE function as need .No nedd to implement all functions.

```
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import  {XYZ_MODULE}  from "../../../modules/xyz"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    // Implemet get function
}


export async function POST(req: MedusaRequest, res: MedusaResponse) {
    // Implement post function
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
   //Implement DELETE function
}
```

## 🧪 Testing Instructions
 TODO:
1. How to test it
2. Expected output

## 🙋‍♂️ Author / Contact
Name: VIZZV
Created At: 9:45 09-04-2025
Last Modified By : VIZZV
Last Modified At : 9:45 09-04-2025
