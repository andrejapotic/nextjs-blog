'use server'

import z from "zod";
import { postSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { revalidatePath, updateTag } from "next/cache";

export async function createBlogAction(values: z.infer<typeof postSchema>) {

    try {
        const parsed = postSchema.safeParse(values)
        if (!parsed.success)
            throw new Error("Invalid input")

        const token = await getToken();

        const imageUrl = await fetchMutation(api.posts.generateImageUploadUrl, {}, { token });

        const uploadResult = await fetch(imageUrl, {
            method: "POST",
            headers: {
                "Content-Type": parsed.data.image.type,
            },
            body: parsed.data.image,
        })

        if (!uploadResult.ok) {
            throw new Error("Image upload failed");
        }

        const { storageId } = await uploadResult.json();

        await fetchMutation(api.posts.createPost, {
            title: parsed.data.title,
            body: parsed.data.content,
            imageStorageId: storageId,
        }, {
            token
        })

       
    } catch {
        return {
            error: "Failed to create post. Please try again."
        }
    }


    updateTag('blog');
    return redirect("/blog");
}