import passages from './foodwise-passages.json' with {type:'json'};
import {inLanguage} from './foodwise-helpers.mjs';
import {foodwisePartOne} from './foodwise-part-one.mjs';
import {foodwiseFoods} from './foodwise-foods.mjs';
import {foodwisePractice} from './foodwise-practice.mjs';
export const foodwiseTitle={en:'Foodwise: Understanding What We Eat and How It Affects Us',pt:'Foodwise: compreender o que comemos e como isso nos afeta'};
export const foodwiseSources={
 diet:['WHO · Healthy diet','https://www.who.int/news-room/fact-sheets/detail/healthy-diet'],
 digestion:['NIDDK · Your digestive system','https://www.niddk.nih.gov/health-information/digestive-diseases/digestive-system-how-it-works'],
 b12:['NIH ODS · Vitamin B12','https://ods.od.nih.gov/factsheets/VitaminB12-Consumer/'],
 celiac:['NIDDK · Eating with coeliac disease','https://www.niddk.nih.gov/health-information/digestive-diseases/celiac-disease/eating-diet-nutrition'],
 diabetes:['NIDDK · Type 1 diabetes','https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes/type-1-diabetes'],
 infants:['CDC · Foods to avoid for infants','https://www.cdc.gov/infant-toddler-nutrition/foods-and-drinks/foods-and-drinks-to-avoid-or-limit.html'],
 milk:['CDC · Raw milk','https://www.cdc.gov/food-safety/foods/raw-milk.html'],
 soy:['NCCIH · Soy','https://www.nccih.nih.gov/health/soy'],
 supplements:['NIH ODS · Dietary supplements','https://ods.od.nih.gov/factsheets/WYNTK-Consumer/'],
 ph:['MedlinePlus · Acidosis','https://medlineplus.gov/ency/article/001181.htm'],
 tobacco:['WHO · Tobacco','https://www.who.int/news-room/fact-sheets/detail/tobacco'],
 caffeine:['FDA · Caffeine','https://www.fda.gov/consumers/consumer-updates/spilling-beans-how-much-caffeine-too-much'],
 water:['CDC · Water safety outdoors','https://www.cdc.gov/drinking-water/prevention/water-treatment-hiking-camping-traveling.html'],
 microwave:['FDA · Microwave ovens','https://www.fda.gov/radiation-emitting-products/resources-you-radiation-emitting-products/microwave-ovens'],
 safety:['CDC · Safer food choices','https://www.cdc.gov/food-safety/foods/safer-food-choices.html']
};
export const foodwiseLessons=[...foodwisePartOne,...foodwiseFoods,...foodwisePractice].map(raw=>{
 const {id,references=[],section,...teaching}=raw;
 const source=passages.find(p=>p.id===id);
 if(!source)throw Error('Missing Foodwise passage '+id);
 return {...source,references,section,speaker:'Wendy E. Cook',lecture:section?`Chapter 19 · ${section}`:source.chapter?`Chapter ${source.chapter}`:id===0?'Preface and Introduction':'Chapters 2–20 · synthesis',en:inLanguage(teaching,'en'),pt:inLanguage(teaching,'pt')};
});
