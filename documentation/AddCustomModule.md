# Add Custom Module

## 🔍 Description
For addition of custome modules in medusa js.
Modules are reusable code that can be used anywher in application.
Modules generally represent any feature of eccom.


## 📦 Files Changed / Created
- /modules/new-module/index.ts (A)
- /modules/new-module/service.ts (A)
- /modules/new-module/models (A)
- /medusa-config.ts (M)

## 🛠️ Steps
1.  First create a dir for module in modules dir. 
```
@/src/modules/new-module/
```
2. Create models that may needed in new module is created under models directory in separte file for each model.
```
@/src/modules/new-module/models/model1.ts
@/src/modules/new-module/models/model2.ts
...
@/src/modules/new-module/models/modeln.ts
```
3. Create a service that has business logic for that module.
By default medusa provides some basic crud operations.
If we need to add other functions and logic then we can specify functions in Service class.
That service class need to be inherit from MedusaService Class.
We need to pass model in parameter as an object.
After this we need to register this in index.ts.
Now it is accessible and we can use directly like xyzService.addxyz();(This method ,including crud operations, is automatically generated and directly provided by medusa js )

```
// src/modules/review/service.ts
import { MedusaService } from "@medusajs/framework/utils"
import { Review } from "./models/review"

class ReviewModuleService extends MedusaService({
  Review,
}) {}

export default ReviewModuleService
```

4. Create module in index.ts
```
import ReviewModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const REVIEW_MODULE = "review"
export default Module(REVIEW_MODULE, {
  service: ReviewModuleService,
})
```

5. configure this module

Configure this module in medusa-config.ts

```
  modules: [
    {
      resolve: "./src/modules/review",
    },
    // ... other modules
  ],
```

## 🧪 Testing Instructions
 TODO:
1. How to test it
2. Expected output

## 🙋‍♂️ Author / Contact
Name: Vizzv
Created At: 12:45 08-04-2025
Last Modified By : Vizzv
Last Modified At : 12:45 08-04-2025
