import Link from 'next/link'
import classes from './page.module.css'
import MealsGrid from '@/components/meals/MealsGrid'

import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';
import MealsLoadingPage from './loading-out';

async function Meals() {
    const meals = await getMeals();

    return <MealsGrid meals={meals}/>
}

export default async function MealsPage() {

    return (
        <>
        <header className={classes.header}>
            <h1>
                Delicious meals, created{' '}
                <span className={classes.highlight}>by you</span>
            </h1>
            <p>
                Choose your favorite recipe and cook it yourself. It is easy and fun!
            </p>
            <p className={classes.cta}>
                <Link href="/meals/share">
                    Share Your Favorite Recipe
                </Link>
            </p>
            {/* CTA -> Call to action */}
        </header>
        <main>
            {/* <Suspense fallback={<MealsLoadingPage />}>
                {<Meals />}
            </Suspense> */}
            <Suspense fallback={<p className={classes.loading}>Loading meals...</p>}>
                <Meals />
            </Suspense>
        </main>
        </>
    )
}