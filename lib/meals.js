import { S3 } from '@aws-sdk/client-s3';
import fs from 'node:fs'

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const s3 = new S3({
    region: 'us-west-1'
});

const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // throw new Error('Loading meals failed');
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug); // this notation is used to prevent sql injectino attacks
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions); // sanitizes text?

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}` // could add some sort of random or unique element to ensure unique filenames

    // const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer();
    // stream.write(Buffer.from(bufferedImage), (error) => {
    //     if (error) {
    //         throw new Error('Saving image failed!');
    //     }
    // });

    s3.putObject({
        Bucket: 'vm-nextjs-demo-users-image',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
    })

    meal.image = fileName

    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title,
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,
            @slug
        )
    `).run(meal); // this notation of using @fieldName prevents from sql injections similarly to how the ? notation works

}