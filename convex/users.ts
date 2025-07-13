import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser=mutation({
    args:{
        name:v.string(),
        email:v.string(),
        pictureURL:v.string()
    },
    handler:async(ctx, args)=> {
        //Check if User already exists
        const user = await ctx.db.query('users')
        .filter((q) => q.eq(q.field('email'),args.email)) 
        .collect()

        if(!user[0]?.email){
            const userData = {
                name:args.name,
                email:args.email,
                pictureURL:args.pictureURL,
                credits: 5
            }
            //If User does not exist create an account in the database
            const result = await ctx.db.insert('users', userData)

            return userData
        }

        return user[0]
    }
})