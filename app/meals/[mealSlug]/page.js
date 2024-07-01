export default function MealDetailsPage({params}) {
  return (
    <div>
      <h1>Meal Details Page</h1>
      <p>{params.mealSlug}</p>
    </div>
  );
};