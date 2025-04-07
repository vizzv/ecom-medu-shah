import { model } from "@medusajs/framework/utils"

export const Review = model.define("review", {
    id: model.id().primaryKey(),
    title: model.text(),
    description: model.text(),
    user_id: model.text(),
})
export default Review