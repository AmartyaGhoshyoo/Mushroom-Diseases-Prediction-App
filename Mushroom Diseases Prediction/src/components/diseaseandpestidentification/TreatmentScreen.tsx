import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './navigation/types'; // Adjust the import path as needed

const TreatmentScreen: React.FC = () => {
  // Use useRoute to access the route object
  const route = useRoute<RouteProp<RootStackParamList, 'Treatment'>>();
  const { disease } = route.params;

  // Define the treatments object with explicit types
  const treatments: Record<string, string> = {
    'Bacterial blotch': `
1. Bacterial Blotch of Mushroom

Common Names: Bacterial blotch, Brown blotch
Causal organism: Pseudomonas fluorescens, P. tolaasii

Symptoms:
- Formation of small irregular spots on mushroom cap. Spots are pale yellow initially, later expanding to golden yellow or rich chocolate brown.
- The spots may become wet and sunken.
- Typically, spotting is observed at or near the edge of mushroom caps - at the contact points between two mushroom caps.
- If very dry conditions occur after blotch has developed, infected caps may crack.

Predisposition Factors:
- Presence of disease is probable if the surface of the mushroom does not dry after watering, irrespective of the season.
- Blotches usually appear in the early button stage but can reappear on mushrooms of any age, refrigerated conditions, or on over-wrapper mushrooms with watertight film.
- Casing and air-borne dust are the primary means of introducing the blotch pathogen into a mushroom house.
- Once the disease occurs, blotch-causing bacteria are spread by splash-dispersal during watering, upon tools used by pickers and trashers, and by mushroom flies and nematodes.

Treatment:
Cultural Control:
- Effective pasteurization of compost and casing soil by steam/air mixture or short-wave irradiation method.
- Maintenance of hygiene in the mushroom house, as the disease can be spread through compost, casing, water splash, equipment, pickers, insects, and mites.
- After watering, the surface of the casing soil must dry again. Temperature should be raised a few degrees after irrigation. Additional ventilation and air circulation after watering can ensure the quick drying of mushrooms.
- Maintenance of temperature and humidity inside the mushroom house. Temperature above 20°C and relative humidity of >85% should be avoided.

Chemical Treatment:
- Adding Sodium hypochlorite (150 ppm) chlorine to water used in irrigating the crop will control blotch, provided that the caps of the mushrooms are dry after irrigation.
- Application of Terramycin (9 mg per square foot), Streptomycin (200 ppm), oxytetracycline (300 ppm), Kasugamycin, and Kanamycin has been found effective in managing the disease.
    `,
    'Coweb': `
2. Cobweb

Causal organism: Cladobotryum dendroides
Common Name: Cobweb, Mildew, Soft decay, Hypomyces mildew disease, Dactylium disease

Symptoms:
- Patches of cottony white web-like mycelium initially appear on the substrate (Casing soil), which then spreads to mushroom covering the stipe, pileus, and gills, eventually resulting in decomposition of the entire fruit body.
- As infection develops, the white cottony mycelium becomes pigmented, turning into a pink cover.
- In severe attacks, dense white mould develops over casing, and mushrooms change from a fluffy cobweb to a dense mat of mycelium.
- When the Cobweb colony is well established on mushrooms and casing, it develops a powdery, granular surface due to the production of masses of dry spores.
- Sometimes, brown or pinkish-brown cap spotting can appear, which is usually not associated with the disease.
- The affected mushroom turns brown, rots, and coloured fluids exude, emitting a bitter foul smell.

Predisposition Factors:
- The disease causes great damage to mushroom houses with high humidity. High relative humidity and temperature encourage the disease.
- Younger mushrooms are more susceptible than fully developed ones.
- The pathogen is introduced into the crop by soil contamination, spores, mycelium on crop debris, or by farm workers.
- Spores are easily spread by air movement, workers' hands, tools, clothing, and by water splash.

Prevention:
- Maintenance of proper sanitation in the mushroom house.
- Thorough disinfection of casing soil with live steam or sterilization of casing mixture at 50°C for 4 hours effectively eliminates the pathogen.
- Regular cleaning, removal of cut mushroom stems, and young half-dead mushrooms after each break, and controlling temperature and humidity help in controlling the disease.
- Proper monitoring and identification of web and cap spotting early.

Treatment:
Salt Application:
- The patches of disease must first be covered with damp tissue, and fans should be switched off to prevent the dissemination of spores.
- Salt should be applied to the edges of the tissue first to prevent the escape of spores.
- Once the edges are sealed, more salt should be applied to completely cover the tissue and underlying patch of Cobweb.
- Switching off the fans before salting and watering can localize the spread during these procedures.

Chemical Treatment:
- Annual disinfection of mushroom houses and surrounding areas with 2% Bordeaux mixture or with 5% Formalin solution at 0.5-1.0 l/m² or fumigation with 2.0-2.5 l Formalin and 0.5-1.0 kg chlorinated lime/100 m³ for controlling the disease.
- Judicious applications of Benzimidazole fungicides should be made.
- Chlorothalonil should be included in the fungicide application program.
- A single application of Prochloraz (Sporgon 50WP) at 1.5g a.i./m² of bed 9 days after casing slows down cobweb growth in the substrate.
    `,
    'Dry Bubble': `
3. Dry Bubble

Causal organism: Verticillium fungicola
Common Name: Verticillium disease, brown spot, fungus spot, dry bubble, La mole

Symptoms:
- Symptoms of dry bubble disease depend on the stage of mushroom development at which the infection occurs.
- At an early stage

- Whitish mycelial growth is initially noticed on the casing soil, which has a tendency to turn greyish-yellow.
- If infection takes place in an early stage, the mushroom acquires the shape of a bubble or a small, shapeless mass of mushroom tissue of up to 2 cm in diameter.
- If these are left to grow, much larger distorted bubbles are formed.
- The bubbles are characteristically creamy/grey and dry.
- Occasionally, as the diseased tissue ages, a few small brown drops of liquid may form, similar to wet bubble disease.
- At a later stage, 
- When affected at later stage, crooked and deformed mushrooms with distorted stipes and tilted caps can be seen.
- If the mushroom is infected when the pin begins to develop, the stem of the mushroom splits.
- Cap spotting appears, which is first greyish, turning brown as it ages.
- Severe deformation of the cap with little pustules or lumps appears on the cap, which is barely recognizable as a mushroom.

Predisposition Factors:
- Most serious disease; if left uncontrolled, it can totally destroy a crop in 2-3 weeks.
- It is carried onto the farm by infected casing soil.
- Spread is carried out by infected equipment, hands, and clothing.
- Phorid, mites, and sciarid flies are also known to transmit this disease from infected to healthy mushrooms.
- The optimum temperature for disease development is 20-24°C.
- High humidity, lack of proper air circulation, delayed picking, and temperature above 16°C favour its development and spread.
- Airborne dust is also a major source of primary infection and may enter houses through exhaust vents.
- If infection occurs early, it causes more severe malformation of fruit bodies.

Prevention:
- Maintenance of hygiene in the mushroom house. As the dust particles carry the pathogen, utmost care should be taken while cleaning the mushroom house.
- Use of sterilized casing soil, proper disposal of spent compost, and proper hygiene and sanitation are essential to avoid primary infection.
- Strict monitoring of the appearance of symptoms.
- Prevention of contamination of casing during delivery, storage, application, and on the mushroom beds.
- Prevention of entry of flies and mites into the mushroom house.
- Disinfected foot dips at the entrance of every house should be kept.

Cultural Control:
- If symptoms are severe, avoid watering crops between flushes.
- Salt treatment: The infected areas should be clearly marked and covered with salt. The salted area should extend centimetres beyond the diseased area.
- Physical removal of diseased material should be considered in extreme circumstances if pieces of the bubble are too large to be covered with salt.
- Heat treatment of the infected casing layer at 63°C for one hour completely prevents spore germination.

Chemical Control:
- For protective measures, use Zineb-80 at 0.1 - 1.2% before and between the flushes to control the disease.
- Three sprays with Dithane Z-78 at 0.25 or 0.50% or Hexathane at 0.30% given at the time of casing, at pinhead formation, and after flushes of the crop can control the disease.
- Apply chlorothalonil as a drench at casing or mix into casing material to reduce disease incidence.
- The disease can be controlled by spraying with Carbendazim, Benomyl, or Thiophanate Methyl at 100, 150, and 200g/100 m², respectively, in 100-150 litres of water immediately after casing.
- Cased beds can also be treated with 0.5% Formalin or 100g Carbendazim, 150g Benomyl, or 200g Thiophanate Methyl in 100-150 litres of water per m² of bed.
    `,
    'Wet bubble': `
4. Wet Bubble

Causal Organism: Mycogyne perniciosa
Common Names: Wet bubble, La mole, white mould, bubble, Mycogone disease

Symptoms:
- Development of large undifferentiated and irregular masses of tissue that do not resemble mushrooms. The masses are white and fluffy but become brown as they age and decay.
- Small amber to dark brown drops of liquid develop on the surface of the undifferentiated tissue, especially in conditions of very high relative humidity.
- In dry conditions, the distorted masses remain dry in appearance and are very similar to that of dry bubble.
- In some cases, small fluffy foul-smelling white patches of mycelium may occur on the surface of the casing.

Predisposition Factors:
- Spread occurs primarily through casing soil and other agencies, like spent compost, contaminated containers, and infected trash.
- The infection can be airborne, waterborne, or may be mechanically carried by mites and flies (sciarid and phorid flies).

Prevention:
- Proper sterilization or pasteurization of casing soil (aerated steam at 54.4°C for 15 minutes) as contaminated casing material is the primary source of the pathogen.
- Maintenance of proper hygiene in the mushroom house to prevent the spread of the pathogen through water, air, casing soil, pickers' hands, insects (like flies and mites).

Treatment:
- The infected area should be clearly marked. The infected mushroom should be carefully uprooted using gloves, wrapped, and disposed of away from the mushroom house.
- Covering affected mushrooms with a cup, alcohol, or salt is an alternative to removing them. As water is one of the most important methods of spread, this should be done only after all diseased mushrooms have been removed.
- Check the areas regularly to make sure there has been no regrowth nearby.

Chemical Treatment:
- Casing material should be treated with 1% Formalin 2-3 days before its application, followed by an immediate spray of Carbendazim, Benomyl, Chlorothalonil, Tebuconazole, or Prochloraz Manganese complex @ 0.1% after casing application.
- Alternatively, a spray of 0.8% Formalin onto the casing surface, immediately after casing, can be effective. However, this concentration can be injurious if used at a later stage in crop development.
- Fumigate empty rooms with 2% Formalin.
    `,
    'Green Mold': `
5. Green Mold

Causal organism: Trichoderma sp.
Common names: Trichoderma spot, Trichoderma blotch, Trichoderma mildew, green mould

Symptoms:
- Green mold symptoms can infect compost, casing soil, substrate, spawn bottle/bag, and mushroom bags.
- A dense pure white growth of mold mycelium appears on the casing surface or on compost, which can be mistaken for mushroom mycelium.
- Later, the mycelium changes to green patches.
- The infected area becomes damp, brown, or black, may crack, distort, and gives off an unpleasant smell.

Predisposition Factors:
- Compost with a short texture and high moisture content from improper pasteurization and conditioning of compost.
- Frequent use of formalin also tends to promote the development of green moulds.
- Dust particles, contaminated clothing, vectors (e.g., mites, mice, and sciarid flies), airborne infection, infected spawn, surface spawning, contamination of compost by handling and machinery, and equipment at the mushroom farm are primary sources of infection.

Prevention:
- Use contamination-free spawn and equipment.
- Proper pasteurization of bedding materials and conditioning of compost.
- Maintain proper hygiene on the farm.
- Spraying of 10% neem leaf extract on the pasteurized paddy straw before spawning.

Treatment:
Cultural Control:
- Scoop out green mold patches in the initial stage and spray the area with garlic extracts.

Chemical Control:
- Sprinkle agricultural lime powder over the infected area to check its growth.
- Localized application of 2% Formalin with a cotton swab.
- Sprays of Dithane Z-78 (0.2%) are recommended for the control of green mould.
- Weekly sprays of Bavistin (0.1%), Zineb dust, or Calcium hypochlorite (15%) are effective in controlling the disease.
    `,
    'Inky cap': `
6. Inky Caps

Causal organism: Copernicus spp.
Inky caps are fungi that are weed mushrooms. They appear on mushroom beds before mushroom fruiting. The presence of Inky caps indicates a high content of nitrogen in the compost. Also, their presence indicates low-quality substrate.

Symptoms:
- Inky caps are clearly visible individual weed mushrooms that appear in the compost during spawn run or newly cased beds and outside manure piles during fermentation.
- They are slender, bell-shaped mushrooms with long sturdy stems covered with scales and grow in clusters in beds.
- The caps are initially cream-colored, later turning bluish-dark black mass, usually covered with scales.
- Several days after appearance, they decay and form a blackish slimy mass due to autodigestion.
- This fungus sometimes grows in clusters in beds and has a long sturdy stem.

Predisposition Factors:
- The infection generally comes through unpasteurized or partially pasteurized compost or casing soil or air.
- Ink caps appear if the compost contains too much nitrogen, so if too much chicken manure is used, or if the peak heating period is too short.
- Ink caps can also develop if insufficient gypsum is added to the compost or if peak heating has taken place at too low a temperature or if the compost is too wet and poor in texture.

Control:
- Proper pasteurization of substrate and casing soil. Avoid excessive watering.
- Remove ink caps manually as soon as they appear to avoid their further spread.
- Use of good-quality raw material.
- Avoid using an excess amount of nitrogen sources, e.g., urea or poultry manure in composting.
    `,
  };

  // Ensure the disease is a valid key in the treatments object
  const treatmentText = treatments[disease] || 'No treatment information available.';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Treatment for {disease}</Text>
      <Text style={styles.treatmentText}>{treatmentText}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  treatmentText: {
    fontSize: 16,
    lineHeight: 24, // Improve readability with line height
  },
});

export default TreatmentScreen;