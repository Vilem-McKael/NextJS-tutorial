'use server';

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text) {
    return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) { 
    // 'use server'; // ensures that this function is executed on the server and not in the client, so prevents default as well

    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email')
    }

    if (
        isInvalidText(meal.title) || 
        isInvalidText(meal.summary) || 
        isInvalidText(meal.instructions) || 
        isInvalidText(meal.creator) || 
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0
    ) {
        // throw new Error('Invalud Input');
        return {
            message: 'Invalid input.'
        };
    }

    await saveMeal(meal);
    revalidatePath('/meals')
    redirect('/meals')
}