# Add Custom Tab in Admin Panel

## 🔍 Description
If we need to add other tabs rather than provided one , this is the way we can add that.


## 📦 Files Changed / Created
List of files 
- @/src/admin/routes/tabName/page.tsx(A)

*(A = Added, M = Modified, D = Deleted)*

## 🛠️ Steps

1. Add page.tsx and define ui as next js in page.tsx.
2. Need to export configuration in page.tsx as below example

``` typescript
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { TagSolid } from "@medusajs/icons"
import { sdk } from "../../../admin/lib/sdk"

// Need to define configuration
// Tag Icon is imported from medusa icon library
export const config = defineRouteConfig({
  label: "TabLabel",
  icon: TagIcon,
})

export default NewTab = ()=>{
    return <div>New Tab</div>
}

```

## 🧪 Testing Instructions
 TODO:
1. How to test it
2. Expected output

## 🙋‍♂️ Author / Contact
Name: Vizzv
Created At: 09:30 09-04-2025
Last Modified By : Vizzv
Last Modified At : 09:30 09-04-2025
