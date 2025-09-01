import React, { useState, useEffect } from 'react';

// --- SVG Icons (Self-contained components) ---
const DumbbellIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6.5 A2.5 2.5 0 0 1 12 1.5 A2.5 2.5 0 0 1 12 6.5 z M12 17.5 A2.5 2.5 0 0 1 12 22.5 A2.5 2.5 0 0 1 12 17.5 z M5 9.5 A2.5 2.5 0 0 0 5 14.5 A2.5 2.5 0 0 0 5 9.5 z M19 9.5 A2.5 2.5 0 0 0 19 14.5 A2.5 2.5 0 0 0 19 9.5 z M3 12 L21 12" /></svg>);
const SearchIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const ZapIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>);
const HeartIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>);

// --- Data for the App ---
const maleWorkouts = { Monday: { day: "Chest Day", exercises: [{ name: "Barbell Bench Press", sets: "4x10" }, { name: "Incline Dumbbell Press", sets: "3x12" }, { name: "Decline Machine Press", sets: "3x15" }, { name: "Cable Crossovers", sets: "3x15" }, { name: "Push-ups", sets: "3xFailure" },] }, Tuesday: { day: "Back Day", exercises: [{ name: "Deadlifts", sets: "4x8" }, { name: "Pull-ups", sets: "4xFailure" }, { name: "Bent Over Rows", sets: "3x10" }, { name: "Lat Pulldowns", sets: "3x12" }, { name: "Seated Cable Rows", sets: "3x12" },] }, Wednesday: { day: "Leg Day", exercises: [{ name: "Squats", sets: "4x10" }, { name: "Leg Press", sets: "3x12" }, { name: "Romanian Deadlifts", sets: "3x12" }, { name: "Leg Curls", sets: "3x15" }, { name: "Calf Raises", sets: "4x20" },] }, Thursday: { day: "Shoulder Day", exercises: [{ name: "Overhead Press", sets: "4x10" }, { name: "Lateral Raises", sets: "3x15" }, { name: "Front Raises", sets: "3x15" }, { name: "Bent Over Dumbbell Raises", sets: "3x15" }, { name: "Shrugs", sets: "4x12" },] }, Friday: { day: "Arm Day (Biceps & Triceps)", exercises: [{ name: "Barbell Curls", sets: "3x12" }, { name: "Skull Crushers", sets: "3x12" }, { name: "Dumbbell Hammer Curls", sets: "3x15" }, { name: "Tricep Pushdowns", sets: "3x15" }, { name: "Preacher Curls", sets: "3x12" },] }, Saturday: { day: "Full Body & Core", exercises: [{ name: "Clean and Press", sets: "3x10" }, { name: "Kettlebell Swings", sets: "4x15" }, { name: "Plank", sets: "3x60s" }, { name: "Hanging Leg Raises", sets: "3x15" }, { name: "Russian Twists", sets: "3x20" },] }, Sunday: { day: "Rest Day", exercises: [] }, };
const femaleWorkouts = { Monday: { day: "Glutes & Hamstrings", exercises: [{ name: "Hip Thrusts", sets: "4x12" }, { name: "Romanian Deadlifts", sets: "3x15" }, { name: "Good Mornings", sets: "3x15" }, { name: "Glute Kickbacks", sets: "3x20 per leg" }, { name: "Hamstring Curls", sets: "3x15" },] }, Tuesday: { day: "Upper Body (Push)", exercises: [{ name: "Dumbbell Bench Press", sets: "4x12" }, { name: "Overhead Press", sets: "3x12" }, { name: "Incline Push-ups", sets: "3xFailure" }, { name: "Lateral Raises", sets: "3x15" }, { name: "Tricep Dips", sets: "3x15" },] }, Wednesday: { day: "Quads & Calves", exercises: [{ name: "Goblet Squats", sets: "4x12" }, { name: "Leg Press", sets: "3x15" }, { name: "Bulgarian Split Squats", sets: "3x12 per leg" }, { name: "Leg Extensions", sets: "3x15" }, { name: "Calf Raises", sets: "4x20" },] }, Thursday: { day: "Upper Body (Pull)", exercises: [{ name: "Assisted Pull-ups", sets: "4xFailure" }, { name: "Single Arm Dumbbell Rows", sets: "3x12 per arm" }, { name: "Lat Pulldowns", sets: "3x15" }, { name: "Face Pulls", sets: "3x20" }, { name: "Bicep Curls", sets: "3x15" },] }, Friday: { day: "Full Body HIIT & Core", exercises: [{ name: "Kettlebell Swings", sets: "4x20" }, { name: "Battle Ropes", sets: "4x30s" }, { name: "Plank", sets: "3x60s" }, { name: "Bicycle Crunches", sets: "3x20" }, { name: "Mountain Climbers", sets: "3x45s" },] }, Saturday: { day: "Active Recovery & Mobility", exercises: [{ name: "Yoga or Stretching", sets: "30-45 min" }, { name: "Foam Rolling", sets: "15 min" }, { name: "Light Cardio (Walk/Bike)", sets: "30 min" },] }, Sunday: { day: "Rest Day", exercises: [] }, };
const dietPlans = { veg: { title: "Vegetarian Power Plan", meals: [{ name: "Breakfast", items: "Oatmeal with fruits, nuts, and a scoop of plant-based protein." }, { name: "Morning Snack", items: "Greek yogurt with berries or an apple with peanut butter." }, { name: "Lunch", items: "Quinoa bowl with chickpeas, mixed vegetables, and a lemon-tahini dressing." }, { name: "Afternoon Snack", items: "Handful of almonds and a banana." }, { name: "Dinner", items: "Lentil soup with a side of brown rice and a large green salad." },] }, nonVeg: { title: "Lean Muscle Plan", meals: [{ name: "Breakfast", items: "Scrambled eggs (3-4) with spinach and a slice of whole-wheat toast." }, { name: "Morning Snack", items: "Whey protein shake and a handful of walnuts." }, { name: "Lunch", items: "Grilled chicken breast (150g) with roasted sweet potatoes and broccoli." }, { name: "Afternoon Snack", items: "Cottage cheese with pineapple chunks." }, { name: "Dinner", items: "Baked salmon (150g) with asparagus and a side of quinoa." },] }, };
const motivationalQuotes = [ "The only bad workout is the one that didn't happen.", "Strive for progress, not perfection.", "Your body can stand almost anything. It’s your mind that you have to convince.", "Success isn’t always about greatness. It’s about consistency. Consistent hard work gains success.", "The pain you feel today will be the strength you feel tomorrow."];
const foodData = [
    // Proteins
    { name: 'Chicken Breast', calories: 165, protein: 31, fat: 3.6 }, { name: 'Salmon', calories: 208, protein: 20, fat: 13 }, { name: 'Egg', calories: 155, protein: 13, fat: 11 }, { name: 'Tuna', calories: 184, protein: 40, fat: 1.5 }, { name: 'Lean Beef', calories: 250, protein: 26, fat: 15 }, { name: 'Greek Yogurt', calories: 59, protein: 10, fat: 0.4 }, { name: 'Cottage Cheese', calories: 98, protein: 11, fat: 4.3 }, { name: 'Whey Protein', calories: 375, protein: 80, fat: 2.5 }, { name: 'Tofu', calories: 76, protein: 8, fat: 5 }, { name: 'Lentils', calories: 116, protein: 9, fat: 0.4 }, { name: 'Chickpeas', calories: 364, protein: 19, fat: 6 },
    // Carbs
    { name: 'Oats', calories: 389, protein: 16.9, fat: 6.9 }, { name: 'Brown Rice', calories: 111, protein: 2.6, fat: 0.9 }, { name: 'White Rice', calories: 130, protein: 2.7, fat: 0.3 }, { name: 'Quinoa', calories: 120, protein: 4.1, fat: 1.9 }, { name: 'Sweet Potato', calories: 86, protein: 1.6, fat: 0.1 }, { name: 'Potato', calories: 77, protein: 2, fat: 0.1 }, { name: 'Whole Wheat Bread', calories: 247, protein: 13, fat: 3.4 }, { name: 'Pasta', calories: 131, protein: 5, fat: 1.1 },
    // Fats
    { name: 'Almonds', calories: 579, protein: 21, fat: 49 }, { name: 'Walnuts', calories: 654, protein: 15, fat: 65 }, { name: 'Peanut Butter', calories: 588, protein: 25, fat: 50 }, { name: 'Avocado', calories: 160, protein: 2, fat: 15 }, { name: 'Olive Oil', calories: 884, protein: 0, fat: 100 }, { name: 'Chia Seeds', calories: 486, protein: 17, fat: 31 }, { name: 'Flax Seeds', calories: 534, protein: 18, fat: 42 },
    // Fruits
    { name: 'Apple', calories: 52, protein: 0.3, fat: 0.2 }, { name: 'Banana', calories: 89, protein: 1.1, fat: 0.3 }, { name: 'Blueberries', calories: 57, protein: 0.7, fat: 0.3 }, { name: 'Strawberries', calories: 32, protein: 0.7, fat: 0.3 }, { name: 'Orange', calories: 47, protein: 0.9, fat: 0.1 },
    // Vegetables
    { name: 'Broccoli', calories: 55, protein: 3.7, fat: 0.6 }, { name: 'Spinach', calories: 23, protein: 2.9, fat: 0.4 }, { name: 'Kale', calories: 49, protein: 4.3, fat: 0.9 }, { name: 'Bell Pepper', calories: 31, protein: 1, fat: 0.3 }, { name: 'Carrots', calories: 41, protein: 0.9, fat: 0.2 }, { name: 'Cucumber', calories: 15, protein: 0.7, fat: 0.1 },
];

// --- App Components ---
const Section = ({ id, children, className = '' }) => (
    <section id={id} className={`py-20 ${className}`}>
        <div className="container mx-auto px-6">
            {children}
        </div>
    </section>
);

const Header = () => (
    <header className="bg-gray-900/80 backdrop-blur-sm text-white sticky top-0 z-50 shadow-lg shadow-black/20">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#home" className="flex items-center gap-2">
                <DumbbellIcon className="h-8 w-8 text-red-500" />
                <h1 className="text-2xl font-bold tracking-wider">GymFlex</h1>
            </a>
            <div className="hidden md:flex items-center space-x-8 font-semibold">
                <a href="#routines" className="hover:text-red-500 transition-colors">Workouts</a>
                <a href="#diets" className="hover:text-red-500 transition-colors">Diet Plans</a>
                <a href="#nutrition" className="hover:text-red-500 transition-colors">Nutrition</a>
                <a href="#bmi" className="hover:text-red-500 transition-colors">BMI Calculator</a>
            </div>
        </nav>
    </header>
);

const HeroSection = () => (
    <section id="home" className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-center bg-[url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-fixed">
        <div className="bg-black/70 p-10 rounded-xl">
            <h2 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">FORGE YOUR LEGACY</h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">Stop wishing, start doing. Unleash your inner beast and build the body you deserve.</p>
            <a href="#routines" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg uppercase tracking-wider transition-transform transform hover:scale-105">View Workouts</a>
        </div>
    </section>
);

const WorkoutRoutines = () => {
    const [gender, setGender] = useState('male');
    const [day, setDay] = useState('Monday');
    const workouts = gender === 'male' ? maleWorkouts : femaleWorkouts;

    return (
        <Section id="routines" className="bg-gray-900 text-white">
            <h2 className="text-4xl font-bold text-center mb-12">Weekly Workout Routines</h2>
            <div className="flex justify-center mb-8 bg-gray-800 rounded-full p-1 max-w-xs mx-auto">
                <button onClick={() => setGender('male')} className={`w-1/2 py-2 rounded-full font-semibold transition ${gender === 'male' ? 'bg-red-600' : ''}`}>Male</button>
                <button onClick={() => setGender('female')} className={`w-1/2 py-2 rounded-full font-semibold transition ${gender === 'female' ? 'bg-red-600' : ''}`}>Female</button>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex md:flex-col justify-start md:justify-start overflow-x-auto md:overflow-visible pb-4 md:pb-0 md:w-1/4">
                    {Object.keys(workouts).map(d => (
                        <button key={d} onClick={() => setDay(d)} className={`text-left p-3 w-full rounded-lg whitespace-nowrap mr-2 md:mr-0 mb-2 transition ${day === d ? 'bg-red-600' : 'bg-gray-800 hover:bg-gray-700'}`}>
                            {d}
                        </button>
                    ))}
                </div>
                <div className="md:w-3/4 bg-gray-800 p-8 rounded-xl shadow-lg">
                    <h3 className="text-3xl font-bold text-red-500 mb-4">{workouts[day].day}</h3>
                    {workouts[day].exercises.length > 0 ? (
                        <ul className="space-y-4">
                            {workouts[day].exercises.map(ex => (
                                <li key={ex.name} className="flex justify-between items-center bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors">
                                    <span className="font-semibold">{ex.name}</span>
                                    <span className="text-gray-300 bg-gray-600 px-3 py-1 rounded-full text-sm">{ex.sets}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                         <div className="text-center py-10 flex flex-col items-center gap-4">
                            <HeartIcon className="w-12 h-12 text-red-500" />
                            <p className="text-xl">Time to recover and grow stronger. Enjoy your rest!</p>
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
};

const DietPlans = () => {
    const [plan, setPlan] = useState('veg');
    const currentPlan = dietPlans[plan];
    return (
        <Section id="diets" className="bg-gray-800 text-white">
            <h2 className="text-4xl font-bold text-center mb-12">Fuel Your Body Right</h2>
             <div className="flex justify-center mb-8 bg-gray-700 rounded-full p-1 max-w-xs mx-auto">
                <button onClick={() => setPlan('veg')} className={`w-1/2 py-2 rounded-full font-semibold transition ${plan === 'veg' ? 'bg-red-600' : ''}`}>Veg</button>
                <button onClick={() => setPlan('nonVeg')} className={`w-1/2 py-2 rounded-full font-semibold transition ${plan === 'nonVeg' ? 'bg-red-600' : ''}`}>Non-Veg</button>
            </div>
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold text-center text-red-500 mb-6">{currentPlan.title}</h3>
                <div className="space-y-6">
                    {currentPlan.meals.map(meal => (
                        <div key={meal.name} className="border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
                            <h4 className="text-xl font-semibold mb-2">{meal.name}</h4>
                            <p className="text-gray-300">{meal.items}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

const NutritionSearch = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 1) {
            const filtered = foodData.filter(f => f.name.toLowerCase().includes(value.toLowerCase()));
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
        setResult(null);
        setError('');
    };
    
    const handleSearch = (foodName) => {
        const foodItem = foodData.find(f => f.name.toLowerCase() === foodName.toLowerCase());
        if (foodItem) {
            setResult(foodItem);
            setError('');
            setQuery(foodItem.name);
            setSuggestions([]);
        } else {
            setResult(null);
            setError(`Sorry, nutrition info for "${foodName}" is not available.`);
        }
    };
    
    return (
        <Section id="nutrition" className="bg-gray-900 text-white">
            <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Know Your Food</h2>
                <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Search for a food to find its nutritional values per 100g.</p>
                <div className="relative max-w-lg mx-auto">
                    <div className="flex">
                        <input 
                            type="text" 
                            value={query}
                            onChange={handleInputChange}
                            placeholder="e.g., Chicken Breast"
                            className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 focus:outline-none text-white p-3 rounded-l-lg"
                        />
                        <button onClick={() => handleSearch(query)} className="bg-red-600 hover:bg-red-700 p-3 rounded-r-lg">
                            <SearchIcon className="h-6 w-6" />
                        </button>
                    </div>
                    {suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-gray-800 border border-gray-700 rounded-b-lg mt-1 text-left">
                           {suggestions.map(s => (
                                <li key={s.name} onClick={() => handleSearch(s.name)} className="p-3 hover:bg-red-600 cursor-pointer">{s.name}</li>
                           ))}
                        </ul>
                    )}
                </div>
                 <div className="mt-8 min-h-[150px]">
                    {error && <p className="text-yellow-400 mt-4">{error}</p>}
                    {result && (
                        <div className="bg-gray-800 p-8 rounded-xl max-w-md mx-auto animate-fade-in">
                            <h3 className="text-2xl font-bold mb-4">{result.name} (per 100g)</h3>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div><p className="text-3xl font-bold text-red-500">{result.calories}</p><p className="text-gray-400">Calories</p></div>
                                <div><p className="text-3xl font-bold text-red-500">{result.protein}g</p><p className="text-gray-400">Protein</p></div>
                                <div><p className="text-3xl font-bold text-red-500">{result.fat}g</p><p className="text-gray-400">Fat</p></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
};

const BmiCalculator = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [bmiStatus, setBmiStatus] = useState('');

    const calculateBmi = () => {
        if (height > 0 && weight > 0) {
            const heightInMeters = height / 100;
            const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
            setBmi(bmiValue);

            if (bmiValue < 18.5) setBmiStatus('Underweight');
            else if (bmiValue < 24.9) setBmiStatus('Normal weight');
            else if (bmiValue < 29.9) setBmiStatus('Overweight');
            else setBmiStatus('Obesity');
        } else {
            setBmi(null);
            setBmiStatus('');
        }
    };
    
    return (
        <Section id="bmi" className="bg-gray-800 text-white">
            <h2 className="text-4xl font-bold text-center mb-12">BMI Calculator</h2>
            <div className="bg-gray-900 p-8 rounded-xl shadow-lg max-w-md mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                    <p className="text-gray-400 text-center">Enter your weight and height to calculate your Body Mass Index.</p>
                </div>
                <div>
                    <label className="font-semibold mb-2 block">Height (cm)</label>
                    <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g., 180" className="w-full bg-gray-800 border-2 border-gray-700 p-2 rounded-lg"/>
                </div>
                 <div>
                    <label className="font-semibold mb-2 block">Weight (kg)</label>
                    <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g., 75" className="w-full bg-gray-800 border-2 border-gray-700 p-2 rounded-lg"/>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <button onClick={calculateBmi} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg">Calculate</button>
                </div>
                {bmi && (
                    <div className="col-span-1 md:col-span-2 text-center bg-gray-800 p-4 rounded-lg">
                        <p className="text-lg">Your BMI is</p>
                        <p className="text-5xl font-bold text-red-500 my-2">{bmi}</p>
                        <p className="text-lg font-semibold">{bmiStatus}</p>
                    </div>
                )}
            </div>
        </Section>
    );
};

const QuoteSection = () => {
    const [quote, setQuote] = useState('');
    useEffect(() => {
        setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
    }, []);

    return (
        <Section className="bg-gray-900 text-white text-center">
            <div className="max-w-3xl mx-auto">
                <ZapIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-2xl italic text-gray-300">"{quote}"</p>
            </div>
        </Section>
    )
};

const Footer = () => (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-6">
        <div className="container mx-auto px-6 text-center">
             <p>&copy; {new Date().getFullYear()} GymFlex. All Rights Reserved.</p>
             <p className="text-sm">Built to make you stronger.</p>
        </div>
    </footer>
);

export default function App() {
    return (
        <div className="bg-gray-900 font-sans">
            <Header />
            <main>
                <HeroSection />
                <WorkoutRoutines />
                <DietPlans />
                <NutritionSearch />
                <BmiCalculator />
                <QuoteSection />
            </main>
            <Footer />
        </div>
    )
}

